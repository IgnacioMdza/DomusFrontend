import Link from "next/link";
import { useState } from "react";
import Modal from "./Modal";
import BookingForModal from "./BookingForModal";

export default function HostCard({
  hostProfileImage,
  hostName,
  nightPrice,
  city,
  state,
  raiting,
  reviewsQuantity,
  aboutHost,
}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="bg-[#F2F2F2] flex flex-col sm:flex-row items-center p-[16px] xl:p-[20px] rounded-[10px] gap-[20px] max-w-[1280px] border">
          <img
            src={hostProfileImage}
            alt="host_image"
            className="w-[140px] h-[140px] rounded-full lg:w-[235px] lg:h-[235px] object-cover aspect-square"
          />
        <div className="flex flex-col gap-[16px]">
          <div className="w-full flex justify-between items-center">
            <p className="font-[Nunito] text-[#2B2E4A] text-[20px] lg:text-[24px]  font-semibold">
              {hostName}
            </p>
            <p className="font-[Nunito] text-[#2B2E4A] text-[24px] lg:text-[28px] font-bold">
              ${nightPrice}
            </p>
          </div>
          <div className="flex flex-col items-center sm:flex-row sm:justify-between lg:flex-col xl:flex-row">
            <p className="font-[Nunito] text-[#2B2E4A] text-[16px]">
              {city}, {state}
            </p>
            <div className="flex gap-[24px]">
              <p className="font-[Nunito] text-[#2B2E4A] text-[16px]">
                {raiting}
              </p>
              <p className="font-[Nunito] text-[#2B2E4A] text-[16px]">
                {reviewsQuantity} Reseñas
              </p>
            </div>
          </div>
          <p className="font-[Nunito] text-[14px] text-center sm:text-start lg:text-center xl:text-start">
            Fecha del 00/00/0000 al 00/00/0000
          </p>
          <p className="text-justify text-[14px font-[Nunito] text-[#2B2E4A] md:text-[16px]">
            {aboutHost.slice(0, 245)}...
          </p>
          <div className="w-full flex justify-between sm:justify-end sm:gap-[24px] lg:justify-between xl:justify-end">
            <Link
              href="/profiles/host"
              className="py-[12px] w-[130px] bg-[#2B2E4A] rounded-xl text-[#F2F2F2] text-center font-[Nunito] border-[2px] hover:border-[#2B2E4A] border-[#F2F2F2] hover:shadow-lg transition"
            >
              Visitar perfil
            </Link>
            <button
              className="py-[12px] w-[130px] bg-[#FF7068] rounded-xl text-[#F2F2F2] text-center font-[Nunito] border-[2px] hover:border-[#FF7068] border-[#F2F2F2] hover:shadow-lg transition"
              onClick={() => setShowModal(true)}
            >
              Reservar
            </button>
          </div>
          <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
            <BookingForModal
              key={hostName}
              hostName={hostName}
              onClose={() => setShowModal(false)}
            />
          </Modal>
        </div>
      </div>
    </>
  );
}
