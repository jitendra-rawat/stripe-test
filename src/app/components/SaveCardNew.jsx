import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button from './Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const SaveCardNew = () => {

  const stripe = useStripe();
  const elements = useElements();
  const router=useRouter()
 const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe or Elements not loaded");
      return;
    }

    setIsLoading(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error("Card Element not found");
      setIsLoading(false);
      return;
    }

  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error("Error creating payment method:", error);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/save-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          user_id: "123456789", 
          user_email: "test@gmail.com", 
          card_action: "new_card",
          pm_customer_id: 'cus_Qzsn3VS3IFk2sJ',
         
        }),
      });

      const result = await response.json();

      setIsLoading(false);
      
      if (response.ok) {
        
        
        toast.success("Card Added Successful !")
        cardElement.clear();
      
        setTimeout(() =>  router.push(`/third-page`), 1000);

      
      } else {
        console.error('Payment error:', result.error);
       toast.error("Card not added !")
      }
    } catch (err) {
      console.error('Error processing payment:', err);
      setIsLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#828282',
        '::placeholder': {
          color: '#828282',
        },
        fontFamily: 'inherit',
      },
    },
  };



  return (
    <>
    <ToastContainer />
   
      <form onSubmit={handleSubmit} className='w-full'>
 
    
     
        <div className={`p-3 border border-gray-300 rounded-md bg-white mb-4 `}>
          <CardElement options={cardElementOptions} className="focus:outline-none" />
        </div>
          <Button 
            type="submit" 
            text={isLoading ? 'Adding...' : 'Add Card'} 
            disabled={!stripe || isLoading} 
          />


     
       
      </form>
    </>
  );
};

export default SaveCardNew;
