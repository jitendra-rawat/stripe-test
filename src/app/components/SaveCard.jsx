import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button from './Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SaveCard = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [isCardAdded, setIsCardAdded] = useState(false); 
  const [paymentSuccess, setPaymentSuccess] = useState(null); 
  const [amount, setAmount] = useState(''); 

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
      const response = await fetch('/api/make-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          user_id: "123456789", 
          user_email: "test@gmail.com", 
          card_action: "new_card",
          pm_customer_id: null,
          amount: amount,
        }),
      });

      const result = await response.json();
      setIsLoading(false);
      
      if (response.ok) {
        console.log('Payment successful:', result);
        toast.success("Payment Successful !")
        cardElement.clear();
        setIsCardAdded(false); 
        setAmount(''); 
      } else {
        console.error('Payment error:', result.error);
       toast.error("Payment Failed")
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

  const handleAddCardClick = () => {
    setIsCardAdded(true);
  };

  return (
    <>
    <ToastContainer />
   
      <form onSubmit={handleSubmit} className='w-full'>
 
        <div className="mb-4">
         
       
          {!isCardAdded && (
            <>
        
             <label htmlFor="amount" className="block text-gray-700 mb-1">Amount:</label>
          <input 
            type="number" 
            id="amount" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="Enter amount" 
            className="p-2 border border-gray-300 rounded-md w-full"
            min="0.01" 
            step="0.01" 
            required
          />
              </>
        )}

        </div>

     
        <div className={`p-3 border border-gray-300 rounded-md bg-white mb-4 ${isCardAdded ? 'hidden' : ''}`}>
          <CardElement options={cardElementOptions} className="focus:outline-none" />
        </div>

        {!isCardAdded && (
          <Button 
            text='Enter Payment' 
            onClick={handleAddCardClick} 
          />
        )}

     
        {isCardAdded && (
          <Button 
            type="submit" 
            text={isLoading ? 'Paying...' : 'Pay Now'} 
            disabled={!stripe || isLoading} 
          />
        )}

     
       
      </form>
    </>
  );
};

export default SaveCard;
