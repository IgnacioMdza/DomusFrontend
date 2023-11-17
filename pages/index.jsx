import SearchCard from "@/components/SearchCard";
import HostSearchCard from "@/components/HostSearchCard";
import ReviewCard from "@/components/ReviewCard";
import component from "/public/images/seccion_beneficios_1.png";
import check from "/public/icons/check.png";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const [pageToken, setPageToken] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const token = localStorage.getItem("token");
    if (token) setPageToken(token);
    fetch(`${BASE_URL}/reviews/forIndexPage?qty=6&minRate=4`)
      .then((resp) => {
        if (!resp) {
          throw new Error('Respuesta no exitosa');
        }
        return resp.json();
      })
      .then((resp) => {
        setReviews(resp.data);
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
        toast.error("Error de conexión, favor de volver a intentar en un momento");
      });
  }, []);

  return (
    <main className="p-[12px] md:p-[24px] lg:p-[32px] xl:p-[40px]">
      <Head>
        <title>Domus - Inicio</title>
      </Head>
      <section
        id="hero"
        className="flex lg:bg-[url('../public/images/seccion_principal_1.png')] lg:bg-no-repeat lg:bg-[length:75%] xl:bg-[length:60%] bg-right bg-contain mt-[70px] max-w-[1536px] mx-auto xl:h-[800px]"
      >
        <ToastContainer 
          position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"
        />
        <div className="text-center md:text-justify lg:text-left lg:w-[48%]">
          <h1 className="text-[#1f2937] font-[Raleway] text-[64px] font-semibold mb-[30px] mt-14">
            DOMUS
          </h1>
          <h2 className="text-[#e91e63] font-[Raleway] text-[40px] font-medium md:text-[48px] mb-[15px] leading-none">
            El alojamiento ideal para tus mascotas
          </h2>
          <div className="flex flex-col gap-[15px] md:gap-0 w-full md:flex-col-reverse items-center">
            <Image
              src={"/images/seccion_principal_1.png"}
              alt="hero_image"
              className="w-[600px] lg:hidden"
              height={600}
              width={600}
            ></Image>
            <p className="text-[22px] mb-[30px]">
              ¿Sales de viaje y necesitas que alguien cuide de tu mascota por
              unos días? No te preocupes, alguno de nuestros anfitriones estará
              encantado de hacerlo.
            </p>
          </div>
          <div className="md:relative top-[-40px] lg:static">
            <HostSearchCard isLanding={true} />
          </div>
        </div>
      </section>
      <section
        id="quienes_somos"
        className="mt-14 md:mt-4 lg:mt-20 max-w-[1536px] mx-auto"
      >
        <h2
          id="qs"
          className="text-[#e91e63] font-[Raleway] text-[40px] font-medium md:text-[48px] mb-[15px] leading-none text-center pb-3  pt-[100px] mt-[-100px]"
        >
          ¿Quiénes somos?
        </h2>
        <p className="text-[22px] mb-[30px] text-center">
          Domus es una plataforma mexicana que nació como una oportunidad para
          cubrir la necesidad de conectar a dueños de mascotas que no pueden
          hacerse cargo de ellas por unos días con personas que tienen
          disponibilidad, empatía y compromiso para cuidar de nuestros amigos de
          cuatro patas.
        </p>
        <div className="bg-[#2B2E4A] px-6 md:px-16 text-center rounded-md md:rounded-xl">
          <h3 className="text-[32px] text-white pt-6 text-center mb-8 font-[Raleway] font-semibold">
            Beneficios de nuestro servicio para una mejor experiencia
          </h3>
          <div className="flex gap-10 flex-col lg:flex-row items-center justify-center pb-8">
            <div className="w-[280px] md:w-[600px] lg:w-[50%]">
              <Image
                src={component}
                alt="Quienes Somos Image"
                className="w-screen"
              ></Image>
            </div>
            <div className="flex flex-col items-center lg:w-[50%] justify-between">
              <p className=" mb-10 text-white text-center text-[20px]">
                En <strong>DOMUS</strong> nos esforzamos para que el transcurso
                del cuidado de tu mascota sea seguro, es por eso que decidimos
                implementar los siguientes puntos claves:
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex gap-10 text-white text-[20px] items-center">
                  <Image src={check} alt="" className="w-5 h-5"></Image>{" "}
                  <p>Cuidadores certificados</p>
                </div>
                <div className="flex gap-10 text-white text-[20px] items-center">
                  <Image src={check} alt="" className="w-5 h-5"></Image>{" "}
                  <p>Registros de fotografías</p>
                </div>
                <div className="flex gap-10 text-white text-[20px] items-center">
                  <Image src={check} alt="" className="w-5 h-5"></Image>{" "}
                  <p>Bitácora de cuidados</p>
                </div>
                <div className="flex gap-10 text-white text-[20px] items-center">
                  <Image src={check} alt="" className="w-5 h-5"></Image>{" "}
                  <p>Servicios personalizados</p>
                </div>
              </div>
              <Link className="w-full" href={"/search"}>
                <button
                  type="button"
                  className="py-2.5 mt-4 mb-10 lg:mb-0 text-white text-[20px] font-bold bg-[#FF7068]  border-[2px] border-[#FF7068] rounded-full text-center w-full hover:bg-opacity-50 hover:shadow-none lg:hover:scale-[104%] transition"
                >
                  Encuentra a tu cuidador
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#F2F2F2] my-[40px] max-w-[1536px] mx-auto">
        <h1 className="z-10 text-center mb-[24px] text-[32px] lg:mb-[40px] lg:text-[40px] font-semibold text-[#2B2E4A] font-[Raleway]">
          Te compartimos algunas reseñas de nuestros usuarios
        </h1>
        <div className="flex flex-col lg:flex-row justify-between w-full gap-[20px] lg:gap-[100px] xl:gap-[140px] z-10 lg:relative">
          <Image
            src={"/images/seccion_reseñas.png"}
            alt="reviews_image"
            height={2000}
            width={2000}
            className="lg:px-[16px] object-cover w-full max-w-[1260px] mb-[16px] sm:mb-[28px] lg:absolute lg:m-auto top-0 bottom-0 start-0 end-0 z-0 max-h-full"
          ></Image>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] sm:gap-[28px] lg:gap-[40px]">
            {reviews &&
              reviews.map((item, index) => {
                return (
                  <ReviewCard
                    key={index}
                    authorImage={item.sender.picture}
                    authorId={item.sender._id}
                    receiverId={item.receiver._id}
                    authorName={`${item.sender.name} ${item.sender.lastname}`}
                    reviewDate={item.date
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")}
                    value={item.rate}
                    review={item.comment}
                    anfitrionName={`${item.receiver.name} ${item.receiver.lastname}`}
                    renderReceiver={true}
                    cardNumber={index + 1}
                  />
                );
              })}
          </div>
        </div>
      </section>
      <section className="flex flex-col mx-auto max-w-[1536px] lg:flex-row lg:h-[730px] xl:h-[816px]">
        <div className="flex flex-col lg:w-1/2">
          <div className="lg:h-1/2 flex items-center mx-auto lg:px-[60px]">
            <h1 className="text-center text-[32px] md:text-[40px] xl:text-[44px] text-black mb-[40px]">
              Únete a nuestra
              <span className="text-[#FF7068] font-bold"> comunidad</span> de
              manera gratuita
            </h1>
          </div>
          <div className="lg:rounded-tl-[60px] rounded-t-[24px] lg:rounded-tr-[0px] lg:rounded-bl-[60px] h-[310px] lg:h-1/2 bg-[#FF7068] py-[25px] lg:py-[40px] px-[16px] md:px-[25px] lg:px-[32px] xl:px-[48px] flex flex-col items-center justify-around ">
            <p className="text-[20px] md:text-[24px] lg:text-[20px] xl:text-[24px] text-[#F2F2F2] text-center">
              ¿Te apasionan los animales, eres responsable y te gustaría cuidar
              de las mascotas de alguien más?
            </p>
            <p className="text-[24px] md:text-[36px] xl:text-[44px] text-[#2B2E4A] font-semibold text-center">
              ¡Registra tu alojamiento!
            </p>
            <Link
              href="/accounts/signup"
              className={`text-[16px] md:text-[20px] lg:text-[16px] xl:text-[20px] font-bold text-[#2B2E4A] bg-[#F2F2F2] w-full text-center py-[12px] rounded-full shadow-lg hover:shadow-none lg:hover:scale-105 transition active:bg-[#2B2E4A] active:text-[#F2F2F2] hover:bg-white ${
                pageToken ? "pointer-events-none bg-slate-300" : null
              }`}
            >
              REGISTRARSE COMO ANFITRIÓN
            </Link>
          </div>
        </div>

        <div className="flex flex-col bg-[#2B2E4A] rounded-b-[24px] lg:rounded-tl-[60px] h-[620px] lg:h-full lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:rounded-bl-[0px] lg:w-1/2 shadow-[-15px_0px_10px_-5px_rgba(0,0,0,0.2)]">
          <div className="h-1/2 py-[25px] lg:py-[40px] px-[16px] md:px-[25px] lg:px-[32px] xl:px-[48px] flex flex-col items-center justify-around">
            <p className="text-[20px] md:text-[24px] lg:text-[20px] xl:text-[24px] text-[#F2F2F2] text-center">
              ¿Estarás fuera unos días y buscas un entorno amigable para tu
              mascota?
            </p>
            <p className="text-[24px] md:text-[36px] xl:text-[44px] text-[#FF7068] font-semibold text-center">
              ¡Registra a tu mascota!
            </p>
            <Link
              href="/accounts/signup"
              className={`text-[16px] md:text-[20px] lg:text-[16px] xl:text-[20px] font-bold text-[#2B2E4A] bg-[#F2F2F2] w-full text-center py-[12px] rounded-full shadow-lg hover:shadow-none lg:hover:scale-105 transition active:bg-[#FF7068] hover:bg-white ${
                pageToken ? "pointer-events-none bg-slate-300" : null
              }`}
            >
              REGISTRARSE COMO CLIENTE
            </Link>
          </div>
          <div className="h-1/2 flex w-full pb-[25px] lg:py-[40px] px-[16px] md:px-[70px] lg:px-[32px] xl:p-[48px]">
            <Image
              priority
              src={"/images/seccion_registrarse_gato.png"}
              alt="signup_image"
              height={500}
              width={500}
              className="object-scale-down w-1/2"
            ></Image>
            <Image
              priority
              src={"/images/seccion_registrarse_perro.png"}
              alt="signup_image"
              height={500}
              width={500}
              className="object-scale-down w-1/2"
            ></Image>
          </div>
        </div>
      </section>
    </main>
  );
}
