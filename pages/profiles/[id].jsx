import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

import ReviewCard from "@/components/ReviewCard";
import BookingCard from "@/components/BookingCard";
import PetsSection from "@/components/PetsSection";
import HomeSection from "@/components/HomeSection";

import { reviewsData } from "@/data/reviewsData";
import { bookingsData } from "@/data/bookingsData";
import { petData } from "@/data/petsData";

const imageLoader = ({ src, width, quality }) => {
  return `https://i.pinimg.com/${src}`;
};

export default function ClientProfile() {
  const router = useRouter();
  const [pageData, setPageData] = useState({});
  const [bookingBg, setBookingBg] = useState("");
  const editProfileBtn = useRef();
  const editPetAccomBtn = useRef();
  const bookingsAside = useRef();
  const pageDisplay = useRef();
  const client =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTA3YWEwZjQxMjRlMWZhZmMwMWNiMSIsInVzZXJUeXBlIjoiY2xpZW50IiwidXNlckltYWdlIjoiaHR0cHM6Ly91aS1hdmF0YXJzLmNvbS9hcGkvP25hbWU9SlJfQ2xpZW50IiwidXNlck5pY2tOYW1lIjoiSlJfQ2xpZW50IiwiaWF0IjoxNjk1NjAxNjg3LCJleHAiOjE2OTU2MTk2ODd9.pcT_4FmVytcMIPnQpmriYuD8Fkdt8Yhs7xxvC1DoxqU";
  const host =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTA3YjQwNzM3NjQxMmI3NzIzMDRlNSIsInVzZXJUeXBlIjoiaG9zdCIsInVzZXJJbWFnZSI6Imh0dHBzOi8vdWktYXZhdGFycy5jb20vYXBpLz9uYW1lPUpSX0hvc3QiLCJ1c2VyTmlja05hbWUiOiJKUl9Ib3N0IiwiaWF0IjoxNjk1NjAwOTQ1LCJleHAiOjE2OTU2MTg5NDV9.m_cfAruA-2B9rt4r6kavj2meWKWbkjyHlnNsxN_XCig";

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("token", client);
      const token = localStorage.getItem("token");
      const tokenInfo = JSON.parse(atob(token.split(".")[1]));
      const pathId = router.query.id;
      const idMatch = pathId === tokenInfo.id;

      setPageData({ tokenInfo, pathId, idMatch });
    }
  }, [router.query.id]);

  // STYLING ACCORDING THE PAGE DATA
  useEffect(() => {
    if (pageData?.tokenInfo?.userType === "client") {
      setBookingBg("#2B2E4A");
    } else if (pageData?.tokenInfo?.userType === "host") {
      setBookingBg("#FF7068");
    }

    if (pageData?.idMatch) {
      editProfileBtn.current.className =
        editProfileBtn.current.className.replace(" hidden", "");
      editPetAccomBtn.current.className =
        editPetAccomBtn.current.className.replace(" hidden", "");
      bookingsAside.current.className = bookingsAside.current.className.replace(
        " hidden",
        ""
      );
      pageDisplay.current.className = pageDisplay.current.className.replace(
        " max-w-screen-xl",
        " max-w-screen-2xl"
      );
    }
  }, [pageData.idMatch, pageData?.tokenInfo?.userType]);

  return (
    <main
      ref={pageDisplay}
      className="p-[12px] md:p-[24px] lg:p-[32px] xl:p-[40px] flex flex-col gap-10 text-[#2B2E4A] max-w-screen-xl"
    >
      <div className="max-h-[991px] m-auto"></div>
      <section
        id="top"
        className="items-start mt-[100px] flex flex-col lg:flex-row gap-10"
      >
        <div className="flex flex-col gap-5">
          <div id="general" className="flex flex-col md:flex-row gap-5 mb-3">
            <div className="text-center flex flex-col gap-3 items-center">
              <Image
                loader={imageLoader}
                alt="Profile Picture"
                src={"474x/7e/f4/bb/7ef4bbc4f379cd45bc7ee8b3a3d6099b.jpg"}
                width={200}
                height={200}
                className="min-w-[200px] max-w-[200px] min-h-[200px] max-h-[200px] object-cover rounded-full flex-none"
              />
              <p className="text-[30px]">⭐⭐⭐⭐⭐</p>
              <p className="font-bold text-[14px]">
                Miembro desde:{" "}
                <span className="font-normal">14/Enero/2021</span>
              </p>
            </div>
            <div id="description" className="w-full">
              <div className="relative text-center md:text-left">
                <p className="inline text-[48px] font-[Raleway] font-bold m-auto">
                  Josefina Trujillo
                </p>
                <Link
                  ref={editProfileBtn}
                  className="absolute right-0 bottom-0 hidden"
                  href={"/"}
                >
                  <i className="fa fa-edit text-[25px]"></i>
                </Link>
              </div>

              <div className="w-full border-t-4 border-[#FF7068] mb-8"></div>
              <p className="text-[20px] text-center md:text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            </div>
          </div>
          <div>
            <div className="relative">
              <p className="font-bold text-[35px]">
                {pageData?.tokenInfo?.userType === "client" ? "Mascotas" : null}
                {pageData?.tokenInfo?.userType === "host"
                  ? "Alojamiento"
                  : null}
              </p>
              <Link
                ref={editPetAccomBtn}
                className="absolute right-0 bottom-0 hidden"
                href={"/"}
              >
                <i className="fa fa-edit text-[25px]"></i>
              </Link>
            </div>
            <div className="w-full border-t-4 border-[#FF7068] mb-8"></div>
            {pageData?.tokenInfo?.userType === "client" ? (
              <PetsSection data={petData} idMatch={pageData.idMatch} />
            ) : null}
            {pageData?.tokenInfo?.userType === "host" ? <HomeSection /> : null}
          </div>
        </div>
        <div
          ref={bookingsAside}
          className={`w-full lg:min-w-[450px] text-center px-5 bg-[${bookingBg}] lg:rounded-[10px] py-6 hidden`}
        >
          <p className="text-white text-[40px] font-[Raleway] mb-4">Reservas</p>
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
                  usertype={pageData?.tokenInfo?.userType}
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
        <div className="flex flex-row gap-5">
          <div className="flex flex-col gap-3">
            {reviewsData
              .filter(
                (item, index) => index === 3 || index === 4 || index === 5
              )
              .map((item, index) => {
                return (
                  <ReviewCard
                    key={index}
                    authorImage={item.authorImage}
                    authorName={item.authorName}
                    reviewDate={item.reviewDate}
                    value={item.value}
                    review={item.review}
                    anfitrionName={item.anfitrionName}
                  />
                );
              })}
          </div>
          <div className="hidden lg:flex flex-col gap-3">
            {reviewsData
              .filter(
                (item, index) => index === 0 || index === 1 || index === 2
              )
              .map((item, index) => {
                return (
                  <ReviewCard
                    key={index}
                    authorImage={item.authorImage}
                    authorName={item.authorName}
                    reviewDate={item.reviewDate}
                    value={item.value}
                    review={item.review}
                    anfitrionName={item.anfitrionName}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </main>
  );
}
