import SearchCard from "@/components/SearchCard";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-[12px] md:p-[24px] lg:p-[32px] xl:p-[40px]">
      <section id="hero" className="hero max-w-[1536px] mx-auto xl:h-[800px]">
        <div className="hero__textSide">
          <h1 className="hero__h1">DOMUS</h1>
          <h2 className="hero__h2">El alojamiento ideal para tus mascotas</h2>
          <div className="hero__textSide__textImageContainer">
            <Image
              src={"/images/seccion_principal_1.png"}
              alt="hero_image"
              className="hero__image"
              height={600}
              width={600}
            ></Image>
            <p className="hero__p">
              ¿Sales de viaje y necesitas que alguien cuide de tu mascota por
              unos días? No te preocupes, alguno de nuestros anfitriones estará
              encantado de hacerlo.
            </p>
          </div>
          <div className="hero__searchCard">
            <SearchCard />
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
              href="/"
              className="text-[16px] md:text-[20px] lg:text-[16px] xl:text-[20px] font-bold text-[#2B2E4A] bg-[#F2F2F2] w-full text-center py-[12px] rounded-full shadow-lg hover:shadow-none lg:hover:scale-105"
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
              href="/"
              className="text-[16px] md:text-[20px] lg:text-[16px] xl:text-[20px] font-bold text-[#2B2E4A] bg-[#F2F2F2] w-full text-center py-[12px] rounded-full shadow-lg hover:shadow-none lg:hover:scale-105"
            >
              REGISTRARSE COMO CLIENTE
            </Link>
          </div>
          <div className="h-1/2 flex w-full pb-[25px] lg:py-[40px] px-[16px] md:px-[70px] lg:px-[32px] xl:p-[48px]">
            <Image
              src={"/images/seccion_registrarse_gato.png"}
              alt="signup_image"
              height={500}
              width={500}
              className="object-scale-down w-1/2"
            ></Image>
            <Image
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
