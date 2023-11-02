import BookingBlogDropdownMenu from "@/components/BookingBlogDropdownMenu";
import BookingBlogNavMenu from "@/components/BookingBlogNavMenu";
import DayEvidence from "@/components/DayEvidence";
import { bookingsData } from "@/data/bookingsData";
import Link from "next/link";
import Head from "next/head";
import Modal from "@/components/Modal";
import { useState, useEffect } from "react";
import CameraForModal from "@/components/CameraForModal";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Evidence() {
  const [showModal, setShowModal] = useState(false);
  const startDay = Number(bookingsData[0].start_date.slice(0, 2));
  const finishDay = Number(bookingsData[0].finish_date.slice(0, 2));
  const totalDays = finishDay - startDay;
  const daysArray = [];
  for (let i = 0; i < totalDays; i++) {
    const dateToAdd = `${startDay + i}${bookingsData[0].start_date.slice(2)}`;
    daysArray.push(dateToAdd);
  }

  const [user, setUser] = useState(null);
  const [reservation, setReservation] = useState(null);
  const urlFetch = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    if (token) {
      const tokenInfo = JSON.parse(atob(token.split(".")[1]));
      //console.log(tokenInfo);
      setUser(tokenInfo);
    } else {
      router.push("/404");
    }
  }, [router]);

  useEffect(() => {
    const reservationId = router.query.id;
    const urlBackRoute = router.asPath
    if (user && reservationId) {
      fetch(`${urlFetch}/reservations/all/${reservationId}?find=evidence`)
        .then((resp) => {
          if (!resp) {
            throw new Error('Respuesta no exitosa');
          }
          return resp.json();
        })
        .then((resp) => {
          if (
            (user.id === resp.data.client._id || user.id === resp.data.host) &&
            (resp.data.status === "paid" ||
              resp.data.status === "current" ||
              resp.data.status === "concluded")
          ) {
            setReservation(resp.data);
            //console.log(resp.data)
          } else {
            router.push("/404");
          }
        })
        .catch((error) => {
          console.error('Error en la solicitud:', error);
          router.push({ 
            pathname: '/500', 
            query: { 
              back: urlBackRoute 
            }
          })
        });
    }
  }, [router, user, urlFetch]);

  return (
    <>
      <Head>
        <title>{`Bitácora - Evidencia Fotográfica`}</title>
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
      <main className="max-w-[1280px] p-[12px] md:p-[24px] lg:p-[32px] xl:p-[40px] min-h-screen">
        {user && user.userType === "host" && (
          <div className="p-[24px] bg-white rounded-[10px] max-w-fit m-auto mb-6">
            <button
              onClick={() => setShowModal(true)}
              className="h-[140px] w-[140px] rounded-[8px] border-[6px] border-[#FF7068] text-[16px] bg-[#2B2E4A] text-white font-bold transition active:border-[#2B2E4A] flex flex-col items-center place-content-center gap-[8px] hover:scale-[105%]"
            >
              <i className="fa fa-camera text-[#FF7068] text-[30px]"></i>
              <p className="text-[#F2F2F2]">Firulais</p>
            </button>
          </div>
        )}
        <div className="flex flex-col">
          {reservation &&
            user &&
            reservation.evidence.map((item, index) => (
              <DayEvidence key={index} evidencePerDay={item} day={index + 1} start={reservation.startDate} end={reservation.finishDate} generalStatus={reservation.status}/>
            ))}
        </div>
      </main>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <CameraForModal
          onClose={() => setShowModal(false)}
          reservation={reservation}
        />
      </Modal>
    </>
  );
}
