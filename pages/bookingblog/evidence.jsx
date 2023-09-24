import BookingBlogDropdownMenu from "@/components/BookingBlogDropdownMenu";
import BookingBlogNavMenu from "@/components/BookingBlogNavMenu";
import DayEvidence from "@/components/DayEvidence";
import { bookingsData } from "@/data/bookingsData";
import Link from "next/link";
import Modal from "@/components/Modal";
import { useState } from "react";
import CameraForModal from "@/components/CameraforModal";

export default function Evidence() {
  const [showModal, setShowModal] = useState(false)
  const startDay = Number(bookingsData[0].start_date.slice(0, 2));
  const finishDay = Number(bookingsData[0].finish_date.slice(0, 2));
  const totalDays = finishDay - startDay;
  const daysArray = [];
  for (let i = 0; i < totalDays; i++) {
    const dateToAdd = `${startDay + i}${bookingsData[0].start_date.slice(2)}`;
    daysArray.push(dateToAdd);
  }

  return (
    <>
      <section className="flex flex-col items-center">
        <div className="max-w-[1024px] mt-[90px] w-full px-[24px] lg:px-0">
          <Link
            href="/bookingblog"
            className="text-[32px] md:text-[48px] font-[raleway] text-[#E91E63] font-bold py-[12px] inline-block"
          >
            Bitácora
          </Link>
        </div>
        <BookingBlogNavMenu />
        <BookingBlogDropdownMenu />
      </section>
      <main className="max-w-[1280px] p-[12px] md:p-[24px] lg:p-[32px] xl:p-[40px] min-h-screen">
        <div className="p-[24px] bg-white rounded-[10px] max-w-fit m-auto mb-6">
          <button onClick={() => setShowModal(true)} className="h-[140px] w-[140px] rounded-[8px] border-[6px] border-[#FF7068] text-[16px] bg-[#2B2E4A] text-white font-bold transition active:border-[#2B2E4A] flex flex-col items-center place-content-center gap-[8px] hover:scale-[105%]">
            <i className="fa fa-camera text-[#FF7068] text-[30px]"></i>
            <p className='text-[#F2F2F2]'>Firulais</p>
          </button>
        </div>
        <div className="flex flex-col">
          {daysArray.map((item, index) => (
            <DayEvidence key={index} day={index + 1} date={item} />
          ))}
        </div>
      </main>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <CameraForModal onClose={() => setShowModal(false)}/>
      </Modal>
    </>
  );
}
