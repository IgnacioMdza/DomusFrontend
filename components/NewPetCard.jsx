import { useEffect, useState } from "react";
import { Stack, Rating } from "@mui/material";

import Image from "next/image";
import Link from "next/link";

export default function NewPetCard() {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserInfo(JSON.parse(atob(token.split(".")[1])));
  }, []);
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
          {/* <p>✩✩✩✩✩</p> */}
          <Rating readOnly value={0} precision={0.5} size="large" />
        </div>
      </div>
      <Link
        href={`/accounts/petregister/${userInfo.id}`}
        className="w-full bg-[#FF7068] font-normal text-[22px] md:text-[26px] py-[4px] rounded-[50px] text-white text-center shadow-lg hover:scale-[102%] transition"
      >
        Agregar Ahora
      </Link>
    </main>
  );
}
