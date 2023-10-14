import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";

import ReviewCard from "@/components/ReviewCard";
import BookingCard from "@/components/BookingCard";
import PetsSection from "@/components/PetsSection";
import HomeSection from "@/components/HomeSection";

import { reviewsData } from "@/data/reviewsData";
import { bookingsData } from "@/data/bookingsData";

const imageLoader = ({ src, width, quality }) => {
  return `${src}`;
};

export default function ClientProfile() {
  const router = useRouter();
  const [userData, setUserData] = useState(false);
  const [idMatch, setIdMatch] = useState(false);

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
            console.log("user data", resp.data);
            setUserData(resp.data);
          } else {
            router.push("./search/404");
          }
          if (!resp.data.isInfoCompleted && pathId === tokenInfo.id)
            router.push("../accounts/register");
          else if (!resp.data.isInfoCompleted) router.push("./search/404");
        });
    }
  }, [router.query.id]);

  return (
    <main
      className={`mt-[100px] p-[12px] md:p-[24px] lg:p-[32px] xl:p-[40px] flex flex-col gap-10 text-[#2B2E4A] ${
        idMatch ? "max-w-screen-2xl" : "max-w-screen-xl"
      }`}
    >
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
                    height={200}
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
                    <Link
                      className={`absolute right-0 bottom-0 ${
                        idMatch ? "" : "hidden"
                      }`}
                      href={"/"}
                    >
                      <i className="fa fa-edit text-[25px]"></i>
                    </Link>
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
                  <Link
                    className={`absolute right-0 bottom-0 ${
                      idMatch ? "" : "hidden"
                    }`}
                    href={"/"}
                  >
                    <i className="fa fa-edit text-[25px]"></i>
                  </Link>
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
                className={`flex flex-col gap-3 pt-1 max-h-[530px] overflow-y-scroll `}
              >
                {bookingsData.map((item, index) => {
                  return (
                    <BookingCard
                      key={index}
                      usertype={userData?.type}
                      data={item}
                    />
                  );
                })}
              </div>
            </div>
          </section>
          <section id="bottom" className="">
            <p className="font-bold text-[35px]">Reseñas</p>
            <div className="w-full border-t-4 border-[#FF7068] mb-8"></div>
            <div className="grid grid-cols- lg:grid-cols-2 gap-5">
              {userData.reviews.map((item, index) => {
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
