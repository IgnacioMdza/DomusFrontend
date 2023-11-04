import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Rating } from "@mui/material";

import BarsMenu from "/public/icons/bars-menu.svg";
import XMark from "/public/icons/xmark.svg";

import ReviewCard from "@/components/ReviewCard";
import BookingCard from "@/components/BookingCard";
import NewHouseCard from "@/components/NewHouseCard";
import PetsSection from "@/components/PetsSection";
import HomeSection from "@/components/HomeSection";

import { bookingsData } from "@/data/bookingsData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const imageLoader = ({ src, width, quality }) => {
  return `${src}`;
};

export default function ClientProfile({ userData }) {
  const router = useRouter();
  const [bookingsFilter, setBookingsFilter] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const [idMatch, setIdMatch] = useState(false);

  useEffect(() => {
    const pathId = router.query.id;
    const token = localStorage.getItem("token");
    let tokenInfo = {};
    if (token) {
      tokenInfo = JSON.parse(atob(token.split(".")[1]));
    }
    setIdMatch(pathId === tokenInfo?.id);
  }, [router]);

  function notFeature() {
    toast.info("Esta característica aún no está disponible, pero lo estará pronto 😉", { autoClose: 2000 });
  }

  return (
    <>
      <Head>
        <title>{`Domus - Perfil`}</title>
      </Head>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      <main className="min-h-[calc(100vh-90px)] mt-[90px]">
        {userData && userData.isInfoCompleted && (
          <>
            <Head>
              <title>{`Domus - Perfil ${userData.name}`}</title>
            </Head>
            <div id="top" className="items-start flex flex-col lg:flex-row gap-10 max-w-[1380px] bg-[#F2F2F2] mx-auto sm:p-[16px] md:p-[24px] xl:p-[32px]">
              <div className="flex flex-col gap-[24px]">
                <section id="general" className="flex flex-col-reverse md:flex-row gap-[32px] sm:mb-3 px-[16px] pt-[16px] sm:pt-0 sm:px-0">
                  <div id="description" className="w-full md:w-2/3 lg:w-[70%] flex flex-col gap-[24px] items-center align-middle place-content-center">
                    <div className="w-full relative md:text-left flex flex-col sm:flex-row place-content-center items-center gap-[12px] rounded-full md:p-0 lg:p-[12px] lg:border lg:border-[#2B2E4A] justify-between">
                      <p className="lg:ms-[12px] text-[28px] md:text-[28px] lg:text-[34px] xl:text-[38px] font-[Raleway] py-[6px] lg:py-0 font-bold text-[#2B2E4A] border border-[#2B2E4A] lg:border-transparent rounded-full w-full text-center lg:text-left">
                        {`${userData.name} ${userData.lastname}`}
                      </p>
                      <div className="bg-[#E91E63] px-[24px] md:px-[16px] lg:px-[24px] rounded-full py-[6px] sm:py-[12px] md:h-full md:py-0 items-center flex ">
                        <p className="text-[20px] md:text-[18px] lg:text-[22px] font-normal text-[#F2F2F2]">{userData.type === "client" ? "Cliente" : "Anfitrión"}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between gap-[20px] md:gap-[14px] lg:gap-[20px]">
                      <p className="font-bold text-[14px] sm:text-[14px] lg:text-[16px]">
                        Miembro desde:
                        <span className="font-normal">{` ${userData.joined.split("T")[0].split("-").reverse().join("-")}`}</span>
                      </p>
                      <p className="font-bold text-[14px] sm:text-[14px] lg:text-[16px]">
                        Sexo: <span className="font-normal">{`${userData.sex}`}</span>
                      </p>
                      <p className="font-bold text-[14px] sm:text-[14px] lg:text-[16px]">
                        No. de reservas: <span className="font-normal">{`${userData.reservations.length}`}</span>
                      </p>
                      {/* <button className={`inline-block ${idMatch ? "" : "hidden"}`} href={"/"} onClick={(e) => notFeature()}>
                        <i className="fa fa-edit text-[16px] sm:text-[22px]"></i>
                      </button> */}
                    </div>
                    <p className="text-[16px] md:text-[18px] text-justify">{userData.aboutMe}</p>
                    {idMatch && userData.type === "client" && (
                      <Link
                        href={"/search"}
                        className="w-full text-center py-[10px] hover:bg-[#F2F2F2] hover:text-[#2B2E4A] text-white text-[18px] border-[3px] border-[#2B2E4A] hover:scale-[102%] hover:shadow-lg bg-[#2B2E4A] rounded-xl transition"
                      >
                        Realizar una nueva reservación
                      </Link>
                    )}
                    {idMatch && (
                      <div className="bg-white w-full flex flex-col items-center rounded-xl shadow-lg border hover:shadow-2xl transition duration-300">
                        <button onClick={() => setIsOpen((prev) => !prev)} href="Bookingblog" className="w-full py-[16px] px-[16px] flex gap-[20px] items-center place-content-center rounded-xl">
                          <p className="text-[20px] lg:text-[24px] font-[nunito] text-[#2B2E4A]">Reservaciones</p>
                          {!isOpen ? <i className="fa fa-caret-down text-[#2B2E4A] text-[24px]"></i> : <i className="fa fa-caret-up text-[#2B2E4A] text-[24px]"></i>}
                        </button>
                        {isOpen && (
                          <>
                            <select
                              className="w-[90%] md:w-[50%] font-[20px] rounded-lg h-[40px] px-3 bg-[#F2F2F2] text-[#2B2E4A] border border-[#2B2E4A]"
                              name="bookingFilter"
                              id="bookingFilter"
                              onChange={(e) => setBookingsFilter(e.target.value)}
                              value={bookingsFilter}
                            >
                              <option selected value="all">
                                Todas
                              </option>
                              <option value="pending">Pendiente</option>
                              <option value="accepted">Aceptada</option>
                              <option value="refused">Rechazada</option>
                              <option value="paid">Pagada</option>
                              <option value="current">En curso</option>
                              <option value="concluded">Terminada</option>
                            </select>
                            <div className={`flex flex-col gap-[18px] w-full p-[16px] lg:p-[32px]`}>
                              {userData.reservations
                                ?.filter((item) => bookingsFilter === "all" || item.status === bookingsFilter)
                                //.sort((a, b) => new Date(b.created) - new Date(a.created))
                                .toReversed()
                                .map((item, index) => {
                                  return (
                                    <BookingCard
                                      key={index}
                                      reservationId={item._id}
                                      usertype={userData?.type}
                                      cardUserName={userData.type === "client" ? `${item.host.name} ${item.host.lastname}` : `${item.client.name} ${item.client.lastname}`}
                                      cardUserId={userData.type === "client" ? item.host._id : item.client._id}
                                      cardUserImage={userData.type === "client" ? item.host.picture : item.client.picture}
                                      startDate={item.startDate.split("T")[0].split("-").reverse().join("/")}
                                      finishDate={item.finishDate.split("T")[0].split("-").reverse().join("/")}
                                      status={item.status}
                                      cost={item.cost?.total}
                                    />
                                  );
                                })}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-[24px] items-center place-content-start w-2/3 md:w-1/3 lg:w-[30%] mx-auto sm:px-[32px] md:p-0 lg:p-[24px] xl:p-[32px]">
                    <div className="w-full flex item-center place-content-center rounded-full border-[6px] border-white shadow-lg">
                      <Image
                        loader={imageLoader}
                        unoptimized
                        priority
                        alt="Profile Picture"
                        src={userData.picture}
                        width={450}
                        height={450}
                        className="w-full aspect-square object-cover rounded-full"
                      />
                    </div>
                    <Rating readOnly value={userData.rate} precision={0.5} size="large" className="scale-[105%] sm:scale-[115%]" />
                  </div>
                </section>
                <section>
                  <div className="flex justify-between items-center align-middle">
                    {/* <p className="font-bold text-[32px] text-[#2B2E4A]">
                      {userData?.type === "client" ? "Mascotas" : null}
                      {userData?.type === "host" ? "Alojamiento" : null}
                    </p> */}
                    {/* <button
                      className={`inline-block ${
                        idMatch ? "" : "hidden"
                      }`}
                      onClick={(e) => notFeature()}
                    >
                      <i className="fa fa-edit text-[25px]"></i>
                    </button> */}
                  </div>
                  {/* <div className="w-full border-t-[2px] border-[#2B2E4A] mb-[32px]"></div> */}
                  {userData?.type === "client" ? <PetsSection data={userData.pets} idMatch={idMatch} /> : null}
                  {userData?.type === "host" && <HomeSection homeData={userData.accommodation} idMatch={idMatch} />}
                  {/* {userData?.type === "host" && !userData.accommodation && (
                    <NewHouseCard />
                  )} */}
                </section>
                <section id="bottom" className="px-[16px] sm:px-0">
                  <p className="ms-0 sm:ms-[20px] md:ms-[24px] lg:ms-[28px] font-medium text-[32px] text-[#2B2E4A] text-center border border-[#2B2E4A] rounded-xl px-[16px] w-fit mb-[8px]">Reseñas</p>
                  <div className="w-full border-t-[2px] border-[#2B2E4A] mb-[28px]"></div>
                  {userData.reviews.length === 0 && <p className="text-center w-full text-[20px]">Aún no hay reseñas</p>}
                  <div className="grid grid-cols- lg:grid-cols-2 gap-5 mb-5 ">
                    {userData.reviews.map((item, index) => {
                      if (index > 5) return null;
                      return (
                        <ReviewCard
                          key={index}
                          authorImage={item.sender.picture}
                          authorName={`${item.sender.name} ${item.sender.lastname}`}
                          reviewDate={item.date.split("T")[0].split("-").reverse().join("/")}
                          value={item.rate}
                          review={item.comment}
                          anfitrionName={`${item.receiver.name} ${item.receiver.lastname}`}
                          rederReceiver={false}
                          cardNumber={index + 1}
                        />
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const URL = process.env.NEXT_PUBLIC_BASE_URL;
    const pathId = context.params.id;
    if (pathId) {
      // fetch
      const response = await fetch(`${URL}/users/${pathId}`);
      if (response.status === 200) {
        const user = await response.json();
        return {
          props: {
            userData: user.data,
          },
        };
      }
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return {
      redirect: {
        destination: `/500?back=${context.resolvedUrl}`,
        permanent: false,
      },
    };
  }
}
