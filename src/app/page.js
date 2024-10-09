
"use client";
import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SaveCard from './components/SaveCard';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <Elements stripe={stripePromise}>
          <SaveCard />
        </Elements>
      </div>
    </div>
  );
}
