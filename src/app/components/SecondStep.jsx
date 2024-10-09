import React, { useState, useEffect } from "react";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const SecondStep = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (router.query && router.query.id) {
      setId(router.query.id);
    }
  }, [router.query]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

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
          amount: parsedAmount,
        }),
      });

      const result = await response.json();
      setIsLoading(false);
      toast.success("Payment Successful!");
      setAmount("");
     
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
          <div className="flex gap-2 my-8 items-center">
            <label htmlFor="amount">Amount:</label>
            <input
              type="text"
              id="amount"
              className="p-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

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

export default SecondStep;
