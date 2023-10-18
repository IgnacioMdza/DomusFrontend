import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Rating } from "@mui/material";

import ReviewCard from "@/components/ReviewCard";
import BookingCard from "@/components/BookingCard";
import PetsSection from "@/components/PetsSection";
import HomeSection from "@/components/HomeSection";

import { bookingsData } from "@/data/bookingsData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const imageLoader = ({ src, width, quality }) => {
  return `${src}`;
};

export default function ClientProfile() {
  const router = useRouter();
  const [userData, setUserData] = useState(false);
  const [idMatch, setIdMatch] = useState(false);

  function notFeature() {
    toast.success(
      "Esta característica aún no está disponible, pero pronto 😉",
      { autoClose: 2000 }
    );
  }
  const URL = process.env.NEXT_PUBLIC_BASE_URL;
  useEffect(() => {
    const pathId = router.query.id;
    if (pathId) {
      const token = localStorage.getItem("token");
      let tokenInfo = {};
      if (token) {
        tokenInfo = JSON.parse(atob(token.split(".")[1]));
      }
      setIdMatch(pathId === tokenInfo?.id);

      fetch(`${URL}/users/${pathId}`)
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.success) {
            setUserData(resp.data);
            console.log("USER DATA -->", resp.data);
          } else {
            router.push("./404");
          }
          if (!resp.data?.isInfoCompleted && pathId === tokenInfo.id)
            router.push(`../accounts/register/${tokenInfo.id}`);
          else if (!resp.data?.isInfoCompleted) router.push("./404");
        });
    }
  }, [router.query.id, router, URL]);

  return (
    <main
      className={`mt-[80px] p-[12px] md:p-[24px] lg:p-[32px] xl:p-[40px] flex flex-col gap-10 text-[#2B2E4A] ${
        idMatch ? "max-w-screen-2xl" : "max-w-screen-xl"
      }`}
    >
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
      {userData && (
        <>
          <section
            id="top"
            className="items-start flex flex-col lg:flex-row gap-10"
          >
            <div className="flex flex-col gap-5">
              <div
                id="general"
                className="flex flex-col md:flex-row gap-5 mb-3"
              >
                <div className="text-center flex flex-col gap-3 items-center">
                  <Image
                    loader={imageLoader}
                    unoptimized
                    priority
                    alt="Profile Picture"
                    src={userData.picture}
                    width={200}
                    height={250}
                    className="min-w-[200px] max-w-[200px] min-h-[250px] max-h-[250px] object-cover rounded-full flex-none"
                  />
                  <Rating
                    readOnly
                    value={userData.rate}
                    precision={0.5}
                    size="large"
                  />
                  <p className="font-bold text-[14px]">
                    Miembro desde:
                    <span className="font-normal">
                      {` ${userData.joined
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}`}
                    </span>
                  </p>
                </div>
                <div id="description" className="w-full">
                  <div className="relative text-center md:text-left">
                    <p className="inline text-[48px] font-[Raleway] font-bold m-auto">
                      {`${userData.name} ${userData.lastname}`}
                    </p>
                    <button
                      className={`absolute right-0 bottom-0 ${
                        idMatch ? "" : "hidden"
                      }`}
                      href={"/"}
                      onClick={(e) => notFeature()}
                    >
                      <i className="fa fa-edit text-[25px]"></i>
                    </button>
                  </div>

                  <div className="w-full border-t-4 border-[#FF7068] mb-8"></div>
                  <p className="text-[20px] text-center md:text-justify">
                    {userData.aboutMe}
                  </p>
                </div>
              </div>
              <div>
                <div className="relative">
                  <p className="font-bold text-[35px]">
                    {userData?.type === "client" ? "Mascotas" : null}
                    {userData?.type === "host" ? "Alojamiento" : null}
                  </p>
                  <button
                    className={`absolute right-0 bottom-0 ${
                      idMatch ? "" : "hidden"
                    }`}
                    onClick={(e) => notFeature()}
                  >
                    <i className="fa fa-edit text-[25px]"></i>
                  </button>
                </div>
                <div className="w-full border-t-4 border-[#FF7068] mb-8"></div>
                {userData?.type === "client" ? (
                  <PetsSection data={userData.pets} idMatch={idMatch} />
                ) : null}
                {userData?.type === "host" ? (
                  <HomeSection homeData={userData.accommodation} />
                ) : null}
              </div>
            </div>
            <div
              className={`w-full lg:max-w-[450px] text-center px-5 lg:rounded-[10px] py-6 
          ${!idMatch ? "hidden" : ""}
          ${userData.type === "client" ? " bg-[#2B2E4A]" : ""}
          ${userData.type === "host" ? " bg-[#FF7068]" : ""}`}
            >
              <p className="text-white text-[40px] font-[Raleway] mb-4">
                Reservas
              </p>
              <select
                className="w-[300px] lg:w-[75%] font-[20px] rounded-[10px] h-[40px] px-3 mb-10"
                name="bookingFilter"
                id="bookingFilter"
              >
                <option value="all">Todas</option>
                <option value="pending">Pendiente</option>
                <option value="accepted">Aceptada</option>
                <option value="rejected">Rechazada</option>
                <option value="paid">Pagada</option>
                <option value="ongoing">En curso</option>
                <option value="finished">Terminada</option>
              </select>
              <div
                className={`flex flex-col gap-3 pt-1 max-h-[530px] overflow-y-scroll pb-1`}
              >
                {userData.reservations?.map((item, index) => {
                  return (
                    <BookingCard
                      key={index}
                      reservationId={item._id}
                      usertype={userData?.type}
                      cardUserName={
                        userData.type === "client"
                          ? `${item.host.name} ${item.host.lastname}`
                          : `${item.client.name} ${item.client.lastname}`
                      }
                      cardUserId={
                        userData.type === "client"
                          ? item.host._id
                          : item.client._id
                      }
                      cardUserImage={
                        userData.type === "client"
                          ? item.host.picture
                          : item.client.picture
                      }
                      startDate={item.startDate
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/")}
                      finishDate={item.finishDate
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/")}
                      status={item.status}
                      cost={item.cost.total}
                    />
                  );
                })}
              </div>
            </div>
          </section>
          <section id="bottom" className="">
            <p className="font-bold text-[35px]">Reseñas</p>
            <div className="w-full border-t-4 border-[#FF7068] mb-8"></div>
            <div className="grid grid-cols- lg:grid-cols-2 gap-5 mb-5">
              {userData.reviews.map((item, index) => {
                if (index > 5) return null;
                return (
                  <ReviewCard
                    key={index}
                    authorImage={item.sender.picture}
                    authorName={`${item.sender.name} ${item.sender.lastname}`}
                    reviewDate={item.date
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")}
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
        </>
      )}
    </main>
  );
}
