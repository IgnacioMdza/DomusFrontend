import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import BookingBlogDropdownMenu from "@/components/BookingBlogDropdownMenu";
import BookingBlogNavMenu from "@/components/BookingBlogNavMenu";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Bookingblog({ reservation }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    if (token) {
      const tokenInfo = JSON.parse(atob(token.split(".")[1]));
      if (
        tokenInfo.id === reservation.data.client ||
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
    <main className="min-h-screen">
      <Head>
        <title>{`Bitácora`}</title>
      </Head>
      {user && (
        <>
          <section className="flex flex-col items-center">
            <div className="max-w-[1024px] mx-auto mt-[90px] bg-[#F2F2F2]">
              <h1 className="text-[32px] md:text-[48px] font-[raleway] font-normal py-[12px] text-center">
                Bienvenido a{" "}
                <span className="text-[#E91E63] font-bold">Bitácora</span>
              </h1>
            </div>
            <BookingBlogNavMenu />
            <BookingBlogDropdownMenu />
          </section>
          <section className="bg-[#2B2E4A] w-full">
            <div className="flex flex-col lg:flex-row py-[24px] md:py-[40px] px-[16px] md:px-[24px] max-w-[1280px] mx-auto items-center gap-[40px] md:gap-[40px] min-h-[calc(100vh-202px)] md:min-h-[calc(100vh-250px)]">
              <div className="flex flex-col gap-[28px] md:gap-[40px] lg:w-1/2 items-center">
                <p className="text-[#F2F2F2] font-[nunito] text-[20px] md:text-[24px] text-center">
                  Este es un espacio donde puedes encontrar información
                  relevante sobre tu reserva y seguir su curso.
                </p>
                <Link
                  href={`/profile/${user.id}`}
                  className="text-[16px] md:text-[20px] font-[nunito] text-[#F2F2F2] p-[8px] text-center bg-[#FF7068] rounded-[12px] border-[3px] border-[#FF7068] hover:scale-[105%] hover:bg-opacity-50 transition shadow-xl w-full md:w-4/5"
                >
                  Da click aquí para regresar a tu perfil
                </Link>
              </div>
              <Image
                src={"/images/seccion_bitacora.webp"}
                alt="reviews_image"
                height={2000}
                width={2000}
                className="aspect-square md:w-10/12 lg:w-1/2 object-cover rounded-full mx-auto bg-[#F2F2F2] border-solid border-[4px] md:border-[8px] border-[#F2F2F2]"
              ></Image>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export async function getServerSideProps(context) {
  try {
    const id = context.params.id;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${BASE_URL}/reservations/${id}`);
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
        redirect: {
        destination: `/500?back=${context.resolvedUrl}`,
        permanent: false,
      },
    };
  }
}
