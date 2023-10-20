import Link from "next/link";

export default function Confirm() {
  return (
    <main className='min-h-[calc(100vh-90px)] flex place-content-center items-center mt-[90px] p-[12px] md:p-[24px]'>
      <section className="flex flex-col items-center gap-[6px] text-center bg-white p-[20px] md:p-[48px] shadow-xl rounded-xl border">
        <h1 className="text-[32px] md:text-[36px] text-[#FF6868] font-semibold">Último paso!</h1>
        <p className="text-[16px] md:text-[20px] text-[#2B2E4A]">
          Confirma tu dirección de correo electrónico para completar tu cuenta
          con nosotros. Es fácil solo tienes que hacer clic en el enlace que te
          enviamos.
        </p>
        <Link href={"/"} className="mt-[36px] text-[20px] font-light shadow-lg hover:scale-[102%] w-full md:w-1/2 lg:w-1/4 py-[8px] hover:text-[#2B2E4A] rounded-full text-white bg-[#2B2E4A] transition hover:bg-white border-[2px] border-[#2B2E4A]">
          Ir al home
        </Link>
      </section>
    </main>
  );
}
