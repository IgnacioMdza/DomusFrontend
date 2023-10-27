import { Rating } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function WriteReview({
  receiverName,
  senderId,
  receiverId,
  serviceId,
  reservationId,
}) {
  const router = useRouter();
  const [rateValue, setRateValue] = useState(0);
  const [reviewText, setReviewText] = useState("");

  function uploadComment() {
    if (!rateValue || !reviewText) {
      toast.error("Ingresa correctamente los datos");
      return false;
    }
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const token = localStorage.getItem("token");
    const dataObject = {
      sender: senderId,
      receiver: receiverId,
      service: serviceId,
      comment: reviewText,
      rate: rateValue,
      reservation: reservationId,
    };
    fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      body: JSON.stringify(dataObject),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.success) {
          toast.success("Reseña creada con éxito", { autoClose: 2000 });
          setTimeout(() => router.reload(), 2000);
        } else {
          toast.error("Error al subir la reseña");
        }
      });
  }

  return (
    <main className="rounded-[20px] bg-white p-[20px] flex flex-col text-center w-full sm:w-[460px] gap-3 min-h-[300px] max-h-[300px]">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <p className="text-[#1F2937] text-[20px] font-medium">
        {`Califica a ${receiverName} y escríbele una reseña!`}
      </p>
      <div className="flex justify-center">
        <Rating
          name="simple-controlled"
          value={rateValue}
          onChange={(event, newValue) => {
            setRateValue(newValue);
          }}
          precision={0.5}
          size="large"
        />
      </div>
      <textarea
        className="bg-[#f2f2f2] px-4 py-2 mb-3 text-[14px] rounded-[12px] resize-none"
        placeholder={`Utiliza este espacio para escribir una reseña sobre ${receiverName}...\n¿Cual fue tu experiencia con esta reserva?\n¿Existió buena comunicación?\n¿Volverías a tomar una reserva con ${receiverName}?`}
        name=""
        value={reviewText}
        id=""
        cols="4"
        rows="4"
        onChange={(e) => setReviewText(e.target.value)}
      ></textarea>
      <button
        className="text-white bg-[#FF7068] rounded-[12px] h-[40px] text-[14px] font-bold hover:scale-[102%]"
        onClick={uploadComment}
      >
        Subir Comentario
      </button>
    </main>
  );
}
