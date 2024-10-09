
"use client";
import React from 'react';
import StripeProvider from '../components/StripeProvider';
import SaveCardNew from '../components/SaveCardNew';





export default function NewPage() {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
      <StripeProvider>

  
          <SaveCardNew />
          </StripeProvider>
     
      </div>
    </div>
  );
}
