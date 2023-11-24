import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>{`Error 404`}</title>
      </Head>
      <section className="h-screen bg-[#2B2E4A] flex items-center w-full place-content-center">
        <div className="w-[300px] sm:w-[485px] lg:w-[575px] flex flex-col">
          <h1 className="text-[#F2F2F2] text-[28px] sm:text-[40px] lg:text-[48px] font-[Raleway] text-center mb-[8px]">
            ¡Oh no! Tenemos un <span className="font-semibold text-[#FF7068] text-[40px] sm:text-[60px] lg:text-[68px]">404</span>
          </h1>
          <Link
            href="/"
            className="lg:border-[3px] bg-[#F2F2F2] lg:bg-transparent lg:border-[#F2F2F2] py-[4px] sm:py-[8px] rounded-full w-full text-[#2B2E4A] lg:text-[#F2F2F2] text-center text-[16px] font-[Nunito] hover:shadow-lg mb-[40px] hover:bg-[#F2F2F2] hover:text-[#2B2E4A] transition"
          >
            Regresar a inicio
          </Link>
          <Image src="/images/seccion_404.webp" alt="not-found-image" priority width={1000} height={1000}></Image>
        </div>
      </section>
    </>
  );
}
