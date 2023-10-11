import Link from "next/link";

export default function Confirm() {
  return (
    <main className="flex justify-center my-40">
      <div className=" text-center bg-white p-32 drop-shadow-xl rounded-sm">
        <h1 className=" text-4xl text-[#FF6868]">Último paso...</h1>
        <p className="text-2xl text-[#2B2E4A]">
          Confirma tu dirección de correo electrónico para completar tu cuenta
          con nosotros. Es fácil solo tienes que hacer clic en el enlace que te
          enviamos.
        </p>
        <Link href={"/"}>
          <p className="pt-5 text-blue-500 underline"> Regresar al inicio</p>
        </Link>
      </div>
    </main>
  );
}
