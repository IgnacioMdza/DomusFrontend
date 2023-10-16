import React from "react";
import { useEffect } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      
      return;
    }
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/profiles/${props.clientId}`,
        payment_method_data: {
          billing_details: {
            address : {
              country : 'MX'
            },
          }
        },
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
    fields  : {
        billingDetails : {
          address : {
              country : 'never'
          },
        }
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className='w-full lg:w-3/5 bg-[#F8F8F8] p-[24px] rounded-xl shadow-xl border-1 border-white'>
      {/* <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      /> */}
      <h1 className='mb-[12px] text-[32px] font-[Raleway] font-semibold text-[#2B2E4A]'>Pago</h1>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit" className='bg-[#2B2E4A] font-bold border-[2px] border-[#2B2E4A] text-white p-[10px] w-full mt-[24px] rounded-full hover:scale-[101%] transition hover:bg-white hover:text-[#2B2E4A] hover:shadow-lg mb-1'>
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pagar reserva"}
        </span>
      </button>
      {message && <div id="payment-message" className='text-[16px] w-full text-center mt-[12px]'>{message}</div>}
    </form>
  );
}