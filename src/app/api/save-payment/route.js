import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createStripeCustomer = async (user_email, user_id) => {
  const customer = await stripe.customers.create({
    email: user_email,
    metadata: {
      user_id: user_id,
    },
  });
  return customer;
};

const setupIntent = async (customerId, paymentMethodId,user_id,card_action) => {
  const setupIntent = await stripe.setupIntents.create({
    customer: customerId,
    payment_method: paymentMethodId,
    confirm: true,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: 'never',
    },
    metadata: {
      user_id: user_id, 
      card_action:card_action
     
    },
  });
  return setupIntent;
};

export async function POST(request) {
  try {
    const { paymentMethodId, user_id, user_email, pm_customer_id, card_action } = await request.json();

    let customerId = pm_customer_id;

   
    if (!pm_customer_id) {
      const customer = await createStripeCustomer(user_email, user_id, card_action);
      customerId = customer.id;
    }

   
    const setupIntentResponse = await setupIntent(customerId, paymentMethodId, user_id, card_action);

   
    const paymentMethod = await stripe.paymentMethods.retrieve(setupIntentResponse.payment_method);

 
await stripe.paymentMethods.attach(paymentMethod.id, { customer: customerId });


const updatedPaymentMethod = await stripe.paymentMethods.update(paymentMethod.id, {
  metadata: {
    user_id,
    card_action,
  },
});

    
  

    return NextResponse.json({
      message: 'Payment method saved successfully',
      paymentIntentId: setupIntentResponse.id,
      customerId,
      paymentMethodDetails: updatedPaymentMethod, 
    });

  } catch (error) {
    console.error("Error handling payment:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

