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

const createPaymentIntent = async (customerId, paymentMethodId, amount, user_id) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount, 
    currency: 'usd', 
    customer: customerId,
    payment_method: paymentMethodId,
    confirm: true, 
    automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    metadata: {
      user_id,
     
    },
  });
  return paymentIntent;
};

export async function POST(request) {
  try {
    const { paymentMethodId, user_id, user_email, pm_customer_id, amount } = await request.json();

    let customerId = pm_customer_id;

   
    if (!pm_customer_id) {
      const customer = await createStripeCustomer(user_email, user_id);
      customerId = customer.id;
    }

    
    const paymentIntentResponse = await createPaymentIntent(customerId, paymentMethodId, amount, user_id);

    return NextResponse.json({
      message: 'Payment processed successfully',
      paymentIntentId: paymentIntentResponse.id,
      customerId,
      paymentMethodDetails: paymentIntentResponse, // You can adjust what details you want to return
    });

  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
