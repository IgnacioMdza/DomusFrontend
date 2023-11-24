import { useEffect, useState } from "react";
import { Rating } from "@mui/material";

import Image from "next/image";
import Link from "next/link";

export default function NewHouseCard() {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserInfo(JSON.parse(atob(token.split(".")[1])));
  }, []);
  return (
    <div className="px-[24px] py-[24px] bg-white rounded-[15px] w-full lg:w-1/2 gap-[24px] flex flex-col justify-between shadow-md">
      <div className="flex justify-around items-center">
        <Image
          src={"/images/newPet.webp"}
          width={150}
          height={150}
          alt="New Pet Image"
          className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] aspect-square"
        />
        <div className="flex flex-col items-center gap-[24px] text-center text-[20px] sm:text-[30px] md:text-[24px] lg:text-[28px] font-medium font-[Raleway]">
          <p>Tu Alojamiento</p>
          <Rating readOnly value={0} precision={0.5} size="large" />
        </div>
      </div>
      <Link
        href={`/accounts/homeregister/${userInfo.id}`}
        className="w-full place-self-center bg-[#FF7068] font-normal text-[20px] md:text-[24px] lg:text-[26px] py-[4px] rounded-full text-white text-center shadow-lg border border-[#FF7068] hover:scale-[102%] hover:bg-white hover:text-[#FF7068] transition"
      >
        Agregar ahora
      </Link>
    </div>
  );
}
