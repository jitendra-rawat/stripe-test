import React, { useState, useEffect } from "react";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ThirdStep = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch("/api/make-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethodId: "pm_1Q7u1pKk6Okw8G5kTCGxhfVv",
          user_id: "123456789",
          user_email: "test@gmail.com",
          pm_customer_id: "cus_Qzsn3VS3IFk2sJ",
          amount: 5000,
        }),
      });

      const result = await response.json();
      setIsLoading(false);
      toast.success("Payment Successful!");
    } catch (err) {
      console.error("Error processing payment:", err);
      toast.error("Payment Failed!");
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center p-4">
        <form onSubmit={handleSubmit} className="">
          <Button
            type="submit"
            text={isLoading ? "Processing..." : "Pay Now"}
            disabled={isLoading}
          />
        </form>
      </div>
    </>
  );
};

export default ThirdStep;
