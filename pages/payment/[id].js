import React from "react";
// import fetch from "node-fetch";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import Link from "next/link";
import CheckoutForm from "@/components/CheckoutForm";
import { useRouter } from "next/router";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function App(props) {
  const [clientSecret, setClientSecret] = useState("");
  const [client, setClient] = useState(null)
  const router = useRouter()
  const bookingData = props.reservation.data
  const urlFetch = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    if(token && JSON.parse(atob(token.split(".")[1])).userType === 'client'){
        const tokenInfo = JSON.parse(atob(token.split(".")[1]));
        setClient(tokenInfo)
    } else {
      router.push('/')
    };
  },[router])

  useEffect(() => {
    if(client && client.id === bookingData.client){
      fetch(`${urlFetch}/payment/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: bookingData.cost.total, 
          description: 'Pago personalizado',
          billing_details: {
            address: {
              country: 'MX'
            }
          },
        reservationId: bookingData._id, 
        clientId: client?.id, 
        hostId: bookingData.host}),
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [client, bookingData, urlFetch]);

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
        {clientSecret &&
          <div className='w-full lg:w-3/5 flex flex-col bg-[#F8F8F8] p-[24px] rounded-xl shadow-xl border-1 border-white'>
            <div className='flex justify-between items-center'>
              <h1 className='text-[32px] font-[Raleway] font-semibold text-[#FF7068]'>Reserva</h1>
              <Link href={`/profiles/${client?.id}`} className='text-[16px] text-white bg-[#FF7068] px-[12px] py-[6px] rounded-full border border-[#FF7068] hover:shadow-md hover:scale-[102%] hover:bg-[#F2F2F2] transition hover:text-[#FF7068]'>Regresar</Link>
            </div>
            <p>Del {new Date(bookingData.startDate).toDateString()} al {new Date(bookingData.finishDate).toDateString()}</p>
            <div className='flex flex-col gap-[4px] rounded-lg lg:p-[8px]'>
              <div className='flex justify-between lg:text-[14px] w-full'>
                <p>Noches agendadas</p>
                <p>{bookingData.cost.nights} x ${bookingData.cost.costPerNight} : ${bookingData.cost.nights * bookingData.cost.costPerNight}</p>
              </div>
              <div className='flex justify-between lg:text-[14px] w-full'>
                <p>Tarifa Domus</p>
                <p>${bookingData.cost.domusFee}</p>
              </div>
              <div className='flex justify-between lg:text-[14px] w-full'>
                <p>Impuestos</p>
                <p>${bookingData.cost.taxes}</p>
              </div>
              <div className='flex justify-between text-[16px] lg:text-[20px] w-full font-semibold border-t border-[#2B2E4A]'>
                <p>TOTAL</p>
                <p>${bookingData.cost.total} MXN</p>
              </div>
            </div>
          </div>
        }
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm clientId={client?.id}/>
          </Elements>
        )}
      </section>
    </main>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  const response = await fetch(`http://localhost:8080/reservations/${id}`);
  if (response.status === 200) {
      const reservation = await response.json();
      if(reservation.data.status != 'accepted') {
          return {
              notFound: true, 
          };
      } else {
          return {
              props: {
                  reservation,
              },
          };
      }
  } else {
      return {
          notFound: true, 
      };
  }
}