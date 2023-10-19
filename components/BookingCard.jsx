import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const imageLoader = ({ src, width, quality }) => {
  return `${src}`;
};

export default function BookingCard2({
  reservationId,
  usertype,
  cardUserName,
  cardUserId,
  startDate,
  finishDate,
  status,
  cost,
  cardUserImage,
}) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  let statusColor = "#1F2937";
  let statusText = status;
  let borderStyle = "";
  let bitacoraButtonColor = "#FF7068";
  let bitacoraButtonHover = "#ff8c86";
  let bitacoraButtonDisplay = "block";
  let paymentButtonDisplay = "hidden";
  let pendingButtonsDisplay = "hidden";

  switch (usertype) {
    case "host":
      bitacoraButtonHover = "#55576e";
      bitacoraButtonColor = "#2B2E4A";
      break;
  }
  let nameText = cardUserName;

  switch (statusText) {
    case "concluded":
      statusText = "Terminada";
      break;

    case "current":
      statusText = "En curso";
      statusColor = "#31BB00";
      borderStyle = `border-4 border-[#31BB00]`;
      break;

    case "paid":
      statusText = "Pagada";
      statusColor = "#00B2FF";
      break;

    case "accepted":
      bitacoraButtonDisplay = "hidden";
      if (usertype === "client") {
        statusText = "Aceptada";
        statusColor = "#E91E63";
        borderStyle = `border-4 border-[#E91E63]`;
        paymentButtonDisplay = "block";
      } else {
        statusColor = "#FF9900";
        statusText = "Aceptada [Esperando pago]";
      }
      break;

    case "pending":
      bitacoraButtonDisplay = "hidden";
      if (usertype === "client") {
        statusText = "Pendiente";
        statusColor = "#FF9900";
      } else {
        statusColor = "#E91E63";
        borderStyle = "border-4 border-[#E91E63]";
        statusText = "Pendiente [Tienes una nueva solicitud]";
        pendingButtonsDisplay = "block";
      }
      break;

    case "refused":
      statusText = "Rechazada";
      bitacoraButtonDisplay = "hidden";
      statusColor = "#FF0000";
      break;
  }

  function changeStatus(newStatus) {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/reservations/${reservationId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.success) {
          toast.success("Estatus actualizado", { autoClose: 2000 });
          setTimeout(() => router.reload(), 2000);
        } else {
          toast.error("Error al actualizar el estatus");
        }
      });
  }

  function goToProfile(profileId) {
    window.location.replace(`/profiles/${profileId}`);
  }
  return (
    <main
      className={`${borderStyle} block md:flex md:gap-8 lg:block p-5 rounded-[10px] w-[95%] m-auto bg-white hover:scale-[102%] hover:shadow-xl`}
    >
      {/* <div
        id="DO NOT ERASE - NO BORRAR ESTE DIV"
        className="text-[#31BB00] text-[#00B2FF] text-[#E91E63] text-[#FF9900] text-[#FF0000] hover:bg-[#55576e] hover:bg-[#ff8c86] hover:bg-[#ed4a82] max-h-[819px] max-h-[872px]"
      ></div> */}
      <Image
        loader={imageLoader}
        alt="Profile Picture"
        src={cardUserImage}
        width={140}
        height={110}
        className="object-cover hidden md:inline lg:hidden"
      />
      <div className="text-left w-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between">
            <button onClick={(e) => goToProfile(cardUserId)}>
              <p className="hover:underline text-[24px] font-[Raleway] inline-block">
                {nameText}
              </p>
            </button>
            <p className="text-[24px] font-semibold text-right inline-block">
              ${cost}
            </p>
          </div>
          <p className="text-[14px] font-light">Ent: {startDate}</p>
          <p className="text-[14px] font-light">Sal: {finishDate}</p>
          <div className="flex justify-between items-end mb-3">
            <p className={`text-[${statusColor}] text-[16px] font-bold`}>
              {statusText}
            </p>

            <Link
              href={`/payment/${reservationId}`}
              className={`${paymentButtonDisplay}`}
            >
              <button
                className={`${paymentButtonDisplay} text-[14px] font-semibold text-white bg-[#E91E63] rounded-[5px] h-[35px] w-[100px] hover:bg-[#ed4a82]`}
              >
                Ir al pago
              </button>
            </Link>
            <Link
              href={`/bookingblog/${reservationId}`}
              className={`${bitacoraButtonDisplay}`}
            >
              <button
                className={`${bitacoraButtonDisplay} text-[14px] font-semibold text-white bg-[${bitacoraButtonColor}] rounded-[5px] h-[35px] w-[100px] hover:bg-[${bitacoraButtonHover}]`}
              >
                Bitácora
              </button>
            </Link>
          </div>
        </div>

        <div className={`${pendingButtonsDisplay} flex justify-around gap-2`}>
          <button
            onClick={(e) => goToProfile(cardUserId)}
            className="bg-[#2B2E4A] rounded-[5px] text-white font-semibold w-[100px] h-[35px] text-[14px] hover:bg-[#55576e]"
          >
            Ver Cliente
          </button>
          <button
            onClick={(e) => changeStatus("refused")}
            className="bg-[#2B2E4A] rounded-[5px] text-white font-semibold w-[100px] h-[35px] text-[14px] hover:bg-[#55576e]"
          >
            Rechazar
          </button>
          <button
            onClick={(e) => changeStatus("accepted")}
            className="bg-[#E91E63] rounded-[5px] text-white font-semibold w-[100px] h-[35px] text-[14px] hover:bg-[#ed4a82]"
          >
            Aceptar
          </button>
        </div>
      </div>
    </main>
  );
}
