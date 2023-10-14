import Image from "next/image";
import Link from "next/link";

export default function NewPetCard() {
  return (
    <main className="px-5 py-5 bg-white rounded-[15px] w-full min-h-[300px] h-full flex flex-col justify-around shadow-md">
      <div className="flex justify-around">
        <Image
          src={"/images/newPet.png"}
          width={150}
          height={150}
          alt="New Pet Image"
          className="min-w-[150px] max-w-[150px] min-h-[150px] max-h-[150px]"
        />
        <div className="text-center text-[30px] font-medium font-[Raleway]">
          <p>Tu Nueva</p>
          <p>Mascota</p>
          <p>✩✩✩✩✩</p>
        </div>
      </div>
      <Link
        href={"/accounts/petregister"}
        className="w-full bg-[#FF7068] h-[40px] font-medium text-[28px] rounded-[50px] text-white text-center hover:scale-[102%]"
      >
        Agregar Ahora
      </Link>
    </main>
  );
}
