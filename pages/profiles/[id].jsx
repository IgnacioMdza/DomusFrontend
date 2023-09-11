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

const imageLoader = ({ src, width, quality }) => {
  return `https://i.pinimg.com/${src}`;
};

export default function ClientProfile() {
  const router = useRouter();
  const id = router.query.id;
  // Hacer el fetch aquí

  const user_type = "client";
  let bookingBg = "";
  user_type === "client" ? (bookingBg = "#2B2E4A") : (bookingBg = "#FF7068");

  const [height, setHeight] = useState(0);
  const [heightClass, setHeightClass] = useState("");
  const elementRef = useRef(null);

  useEffect(() => {
    setHeight(elementRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    setHeightClass(`max-h-[${height - 198}px]`);
  }, [height]);

  const finalHeight = heightClass;
  return (
    <main className="p-[12px] md:p-[24px] lg:p-[32px] xl:p-[40px] max-w-screen-2xl flex flex-col gap-10 text-[#2B2E4A]">
      <section
        id="top"
        className="items-start  mt-[100px] flex flex-col lg:flex-row gap-10"
      >
        <div
          id="sibling"
          ref={elementRef}
          className="basis-2/3 flex flex-col gap-5"
        >
          <div id="general" className="flex flex-col md:flex-row gap-5">
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
                  Josefina Trujillo id: {id}
                </p>
                <p>{`height is: ${height} and class is ${heightClass}`}</p>
                <Link className="absolute right-0 bottom-0" href={"/"}>
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
                {user_type === "client" ? "Mascotas" : "Alojamiento"}
              </p>
              <Link className="absolute right-0 bottom-0" href={"/"}>
                <i className="fa fa-edit text-[25px]"></i>
              </Link>
            </div>
            <div className="w-full border-t-4 border-[#FF7068] mb-8"></div>
            {user_type === "client" ? <PetsSection /> : <HomeSection />}
          </div>
        </div>
        <div
          className={`w-full basis-1/3 text-center px-5 bg-[${bookingBg}] lg:rounded-[10px] py-6`}
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
            className={`flex flex-col gap-3 pr-3 ${finalHeight} max-h-[807px] overflow-y-scroll`}
          >
            {bookingsData.map((item, index) => {
              return (
                <BookingCard key={index} usertype={user_type} data={item} />
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
                  />
                );
              })}
          </div>
        </div>
      </section>
    </main>
  );
}
