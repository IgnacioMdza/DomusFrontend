import Link from "next/link";
import Head from "next/head";
import BookingBlogDropdownMenu from "@/components/BookingBlogDropdownMenu";
import BookingBlogNavMenu from "@/components/BookingBlogNavMenu";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Info({ reservation }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    if (token) {
      const tokenInfo = JSON.parse(atob(token.split(".")[1]));
      if (tokenInfo.id === reservation.data.client._id || tokenInfo.id === reservation.data.host._id) {
        setUser(tokenInfo);
      } else {
        router.push("/404");
      }
    } else {
      router.push("/404");
    }
  }, [reservation.data.client, reservation.data.host, reservation.host, router]);

  return (
    <main className="min-h-screen bg-[#F2F2F2]">
      <Head>
        <title>{`Bitácora - Datos de Reserva`}</title>
      </Head>
      {user && (
        <>
          <section className="flex flex-col items-center">
            <div className="max-w-[1024px] mt-[90px] w-full px-[24px] lg:px-0">
              <Link 
                href={`/bookingblog/${reservation.data._id}`}
                className="text-[32px] md:text-[48px] font-[raleway] text-[#E91E63] font-bold py-[12px] inline-block"
              >
                Bitácora
              </Link>
            </div>
            <BookingBlogNavMenu />
            <BookingBlogDropdownMenu />
          </section>
          <section className="max-w-[1024px] mx-auto px-[12px] md:px-[24px] lg:px-0 py-[24px] flex flex-col gap-[24px] min-h-[calc(100vh-256px)] place-content-center">
            <div className="flex flex-col lg:flex-row w-full gap-[24px]">
              <div className="rounded-xl bg-white w-full lg:w-1/2 hover:scale-[102%] hover:shadow-xl transition group">
                <div className="bg-[#2B2E4A] rounded-t-xl p-[16px] text-[20px] group-hover:bg-[#E91E63] transition">
                  <p className="text-center text-[#F2F2F2]">Datos de la reserva</p>
                </div>
                <div className="flex flex-col gap-[16px] p-[16px] rounded-b-xl text-[16px]">
                  <div className="flex justify-between">
                    <p>Codigo</p>
                    <p>{reservation.data._id}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Estatus</p>
                    <p>{reservation.data.status === "paid" ? "Pagada" : reservation.data.status === "current" ? "En curso" : reservation.data.status === "concluded" ? "Concluida" : ""}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Mascota</p>
                    <p>{reservation.data.pet[0].name}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Fecha inicial</p>
                    <p>{new Date(reservation.data.startDate).toDateString()}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Fecha de término</p>
                    <p>{new Date(reservation.data.finishDate).toDateString()}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white w-full lg:w-1/2 hover:scale-[102%] hover:shadow-xl transition group">
                <div className="bg-[#2B2E4A] rounded-t-xl p-[16px] text-[20px] group-hover:bg-[#E91E63] transition">
                  <p className="text-center text-[#F2F2F2]">Contacto del anfitrion</p>
                </div>
                <div className="flex flex-col gap-[16px] p-[16px] text-[16px]">
                  <div className="flex justify-between">
                    <p>Nombre</p>
                    <p>
                      {reservation.data.host.name} {reservation.data.host.lastname}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Celular</p>
                    <p>{reservation.data.host.phone}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Domicilio</p>
                    <p>
                      {reservation.data.host.accommodation.address.street} #{reservation.data.host.accommodation.address.externalNumber}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Colonia</p>
                    <p>{reservation.data.host.accommodation.address.neighbourhood}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Ciudad</p>
                    <p>
                      {reservation.data.host.accommodation.address.city}, {reservation.data.host.accommodation.address.state}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-[24px]">
              <div className="rounded-xl bg-white w-full lg:w-1/2 hover:scale-[102%] hover:shadow-xl transition group">
                <div className="bg-[#2B2E4A] rounded-t-xl p-[16px] text-[20px] group-hover:bg-[#E91E63] transition">
                  <p className="text-center text-[#F2F2F2]">Costo de la reserva</p>
                </div>
                <div className="flex flex-col gap-[16px] p-[16px] text-[16px]">
                  <div className="flex justify-between">
                    <p className="w-1/2">Tipo de mascota</p>
                    <div className="flex w-1/2 justify-between">
                      <p>
                        {reservation.data.pet[0].type} | {reservation.data.pet[0].size}
                      </p>
                      <p>$ {reservation.data.cost.costPerNight}</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p className="w-1/2">Noches agendadas</p>
                    <div className="flex w-1/2 justify-between">
                      <p>
                        {reservation.data.cost.nights} x $ {reservation.data.cost.costPerNight}
                      </p>
                      <p>$ {reservation.data.cost.nights * reservation.data.cost.costPerNight}</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p>Tarifa Domus</p>
                    <p>$ {reservation.data.cost.domusFee}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Impuestos</p>
                    <p>$ {reservation.data.cost.taxes}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Total</p>
                    <p>$ {reservation.data.cost.total}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white w-full lg:w-1/2 hover:scale-[102%] hover:shadow-xl transition group">
                <div className="bg-[#2B2E4A] rounded-t-xl p-[16px] text-[20px] group-hover:bg-[#E91E63] transition">
                  <p className="text-center text-[#F2F2F2]">Contacto del cliente</p>
                </div>
                <div className="flex flex-col gap-[16px] p-[16px] rounded-b-xl text-[16px]">
                  <div className="flex justify-between">
                    <p>Nombre</p>
                    <p>
                      {reservation.data.client.name} {reservation.data.client.lastname}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Celular</p>
                    <p>{reservation.data.client.phone}</p>
                  </div>
                  <div className=" bg-[#F2F2F2] w-full rounded-lg">
                    <p className="text-center">Contacto de emergencia</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Nombre</p>
                    <p>
                      {reservation.data.client?.emergencyContact?.name} {reservation.data.client?.emergencyContact?.lastname}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Celular</p>
                    <p>{reservation.data.client?.emergencyContact?.phone}</p>
                  </div>
                </div>
              </div>
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
    const response = await fetch(`${BASE_URL}/reservations/all/${id}?find=info`);
    if (response.status === 200) {
      const reservation = await response.json();
      if (reservation.data.status != "paid" && reservation.data.status != "current" && reservation.data.status != "concluded") {
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
