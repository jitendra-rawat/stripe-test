
"use client";
import React from 'react';
import SaveCard from './components/SaveCard';
import StripeProvider from './components/StripeProvider';




export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
      <StripeProvider>

  
          <SaveCard />
          </StripeProvider>
     
      </div>
    </div>
  );
}
