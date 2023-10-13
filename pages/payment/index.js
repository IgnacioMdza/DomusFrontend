import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import Link from "next/link";
import CheckoutForm from "@/components/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function App() {
  const [clientSecret, setClientSecret] = React.useState("");
  const amount = 500

  useEffect(() => {
    fetch("http://localhost:8080/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        amount, 
        description: 'Pago personalizado',
        billing_details: {
          address: {
            country: 'MX'
          }
        },
      reservationId: '651614867fcef96c1e4bbbd1'}),
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
    <main className="mt-[90px] bg-[#FF7068]">
      <section className='max-w-[1024px] mx-auto px-[24px] flex flex-col gap-[24px] place-content-center items-center min-h-[calc(100vh-90px)]'>
        <div className='w-full lg:w-3/5 flex flex-col bg-[#F8F8F8] p-[24px] rounded-xl shadow-xl border-1 border-white'>
          <div className='flex justify-between items-center'>
            <h1 className='text-[32px] font-[Raleway] font-semibold text-[#FF7068]'>Reserva</h1>
            <Link href="/" className='text-[16px] text-white bg-[#FF7068] px-[12px] py-[6px] rounded-full border border-[#FF7068] hover:shadow-md hover:scale-[102%] hover:bg-[#F2F2F2] transition hover:text-[#FF7068]'>Regresar</Link>
          </div>
          <p>Del 29 Sep 2023 al 01 Sep 2023</p>
          <div className='flex flex-col gap-[4px] rounded-lg lg:p-[8px]'>
            <div className='flex justify-between lg:text-[14px] w-full'>
              <p>Noches agendadas</p>
              <p>3 x $200.00 : $600.00</p>
            </div>
            <div className='flex justify-between lg:text-[14px] w-full'>
              <p>Tarifa Domus</p>
              <p>$300.00</p>
            </div>
            <div className='flex justify-between lg:text-[14px] w-full'>
              <p>Impuestos</p>
              <p>$300.00</p>
            </div>
            <div className='flex justify-between text-[16px] lg:text-[20px] w-full font-semibold border-t border-[#2B2E4A]'>
              <p>TOTAL</p>
              <p>$1200.00 MXN</p>
            </div>
          </div>
        </div>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </section>
    </main>
  );
}