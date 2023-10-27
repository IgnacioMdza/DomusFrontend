import Link from "next/link";
import Head from "next/head";
import BookingBlogDropdownMenu from "@/components/BookingBlogDropdownMenu";
import BookingBlogNavMenu from "@/components/BookingBlogNavMenu";
import PetCard from "@/components/PetCard";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Pets({ reservation }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    if (token) {
      const tokenInfo = JSON.parse(atob(token.split(".")[1]));
      if (
        tokenInfo.id === reservation.data.client._id ||
        tokenInfo.id === reservation.data.host
      ) {
        setUser(tokenInfo);
      } else {
        router.push("/404");
      }
    } else {
      router.push("/404");
    }
  }, [reservation.data.client, reservation.data.host, router]);

  return (
    <main className="min-h-screen bg-[#2B2E4A]">
      <Head>
        <title>{`Bitácora - Mascotas`}</title>
      </Head>
      <section className="flex flex-col items-center bg-[#F2F2F2]">
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
      <section className="max-w-[1024px] mx-auto px-[12px] md:px-[24px] lg:px-0 py-[24px] flex gap-[24px] min-h-[calc(100vh-256px)] place-content-center items-center">
        <div className="lg:w-1/2">
          <PetCard data={reservation.data.pet[0]} />
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps(context) {
  try {
    const id = context.params.id;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${BASE_URL}/reservations/all/${id}?find=pet`);
    if (response.status === 200) {
      const reservation = await response.json();
      if (
        reservation.data.status != "paid" &&
        reservation.data.status != "current" &&
        reservation.data.status != "concluded"
      ) {
        return {
          notFound: true,
        };
      } else {
        return {
          props: {
            reservation,
          },
        };
      }
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return {
      // pendiente implementar pagina de error 500
      notFound: true, 
    };
  }
}
