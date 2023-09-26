import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect } from "react";

import CheckoutForm from "@/components/CheckoutForm";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function App() {
  const [clientSecret, setClientSecret] = React.useState("");
  const amount = 500

  useEffect(() => {
    
    fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        amount, 
        description: 'Pago personalizado',
        billing_details: {
          address: {
            country: 'MX' // País del cliente
          }
        }}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <main className="h-[calc(100vh-90px)] mt-[90px] bg-[#FF7068]">
      <section className='max-w-[1024px] mx-auto p-[24px] flex place-content-center items-center h-full'>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </section>
    </main>
  );
}