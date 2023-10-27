import Link from "next/link";
import Head from "next/head";
import BookingBlogDropdownMenu from "@/components/BookingBlogDropdownMenu";
import BookingBlogNavMenu from "@/components/BookingBlogNavMenu";
import { messagesData } from "@/data/messagesData";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Chat() {
  const [user, setUser] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [reload, setReload] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const urlFetch = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    if (token) {
      const tokenInfo = JSON.parse(atob(token.split(".")[1]));
      console.log(tokenInfo);
      setUser(tokenInfo);
    } else {
      router.push("/404");
    }
  }, [router]);

  useEffect(() => {
    const reservationId = router.query.id;
    if (user && reservationId) {
      fetch(`${urlFetch}/reservations/all/${reservationId}?find=comunication`)
        .then((resp) => resp.json())
        .then((resp) => {
          if (
            (user.id === resp.data.client._id ||
              user.id === resp.data.host._id) &&
            (resp.data.status === "paid" ||
              resp.data.status === "current" ||
              resp.data.status === "concluded")
          ) {
            setReservation(resp.data);
          } else {
            router.push("/404");
          }
        });
    }
  }, [router, user, urlFetch, reload]);

  const onSubmit = (data) => {
    fetch(`${urlFetch}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: user.id,
        message: data.textMessage,
        reservation: reservation._id,
        date: new Date(),
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          toast.success("Mensaje enviado", { autoClose: 200 });
          reset();
          //router.push(`http://localhost:3000/bookingblog/chat/${reservation._id}`)
          setReload(reload + 1);
        } else {
          toast.error("Error al enviar mensaje");
        }
      })
      .catch(() => {
        alert("falló el fetch");
      });
  };

  return (
    <main className="h-screen">
      <Head>
        <title>{`Bitácora - Communicación`}</title>
      </Head>
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
      {reservation && user && (
        <>
          <section className="flex flex-col items-center">
            <div className="max-w-[1024px] mt-[90px] w-full px-[24px] lg:px-0">
              <Link
                href={`/bookingblog/${reservation?._id}`}
                className="text-[32px] md:text-[48px] font-[raleway] text-[#E91E63] font-bold py-[12px] inline-block"
              >
                Bitácora
              </Link>
            </div>
            <BookingBlogNavMenu />
            <BookingBlogDropdownMenu />
          </section>
          <section className="max-w-[1024px] mx-auto lg:py-[12px] h-[calc(100%-224px)] md:h-[calc(100%-248px)] lg:h-[calc(100%-256px)]">
            <div className="bg-white h-full lg:rounded-xl p-[12px] md:p-[16px] flex flex-col gap-[16px]">
              <div className="h-4/5 bg-[#F2F2F2] rounded-md md:rounded-xl p-[12px] md:p-[16px] overflow-y-auto flex flex-col gap-[16px]">
                {
                  reservation.comments
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((item, index) => {
                    return (
                      <>
                        <div key="index" className="flex gap-[12px]">
                          {item.sender === reservation.client._id ? (
                            <>
                              <img
                                src={reservation.client.picture}
                                className="rounded-full object-cover h-[52px] w-[52px]"
                              />
                              <div className="p-[12px] bg-[#2B2E4A] flex flex-col gap-[10px] rounded-lg">
                                <div className="flex flex-col gap-[2px]">
                                  <p className="font-bold font-[nunito] text-[#F2F2F2]">
                                    {reservation.client.name}{" "}
                                    {reservation.client.lastname}
                                  </p>
                                  <p className="font-[nunito] text-[#F2F2F2] text-[12px]">
                                    {new Date(item.date).toLocaleString()}
                                  </p>
                                </div>
                                <p className="text-[#F2F2F2] font-[nunito]">
                                  {item.message}
                                </p>
                                {
                                  index === (reservation.comments.length - 1) && (
                                    <p className="text-[#66d43e] text-[10px] text-center border-[1px] border-[#66d43e] px-[12px] py-[2px] rounded-full">
                                      Mensaje más reciente
                                    </p>
                                  )
                                }
                              </div>
                            </>
                          ) : (
                            <>
                              <img
                                src={reservation.host.picture}
                                className="rounded-full object-cover h-[52px] w-[52px]"
                              />
                              <div className="p-[12px] bg-[#FF7068] flex flex-col gap-[10px] rounded-lg">
                                <div className="flex flex-col gap-[2px]">
                                  <p className="font-bold font-[nunito] text-[#F2F2F2]">
                                    {reservation.host.name}{" "}
                                    {reservation.host.lastname}
                                  </p>
                                  <p className="font-[nunito] text-[#F2F2F2] text-[12px]">
                                    {new Date(item.date).toLocaleString()}
                                  </p>
                                </div>
                                <p className="text-[#F2F2F2] font-[nunito]">
                                  {item.message}
                                </p>
                                {
                                  index === (reservation.comments.length - 1) && (
                                    <p className="text-[#66d43e] text-[12px] border-[1px] border-[#66d43e] px-[12px] py-[2px] rounded-full">
                                      Mensaje más reciente
                                    </p>
                                  )
                                }
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    );
                  })
                }
              </div>
              <form
                className="h-1/5 flex gap-[16px] items-center"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-[16px] items-center h-full w-4/5 ">
                  <textarea
                    className="w-full resize-none rounded-md p-[12px] focus:outline-[2px] outline-[#E91E63] text-[16px] font-[nunito] h-full bg-[#F2F2F2]"
                    placeholder="Escribe un mensaje"
                    {...register("textMessage", {
                      required: {
                        value: true,
                        message: "El campo es requerido",
                      },
                      minLength: {
                        value: 1,
                        message: "Mínimo 1 caracter",
                      },
                      maxLength: {
                        value: 150,
                        message: "Máximo 150 caracteres",
                      },
                    })}
                  ></textarea>
                  {errors.textMessage && (
                    <span className="text-red-500">
                      {errors.textMessage.message}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-1/5 rounded-xl bg-[#E91E63] font-[nunito] text-[20px] h-fit py-[12px] text-white hover:scale-[102%] hover:shadow-lg transition"
                >
                  Enviar
                </button>
              </form>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

// export async function getServerSideProps(context) {
//     const id = context.params.id;
//     const response = await fetch(`http://localhost:8080/reservations/all/${id}?find=comunication`);
//     if (response.status === 200) {
//         const reservation = await response.json();
//         if(reservation.data.status != 'paid' && reservation.data.status != 'current' && reservation.data.status != 'concluded') {
//             return {
//                 notFound: true,
//             };
//         } else {
//             return {
//                 props: {
//                     reservation,
//                 },
//             };
//         }
//     } else {
//         return {
//             notFound: true,
//         };
//     }
// }
