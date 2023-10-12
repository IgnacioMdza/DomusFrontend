import Image from "next/image";
import { Rating } from "@mui/material";

const imageLoader = ({ src, width, quality }) => {
  return `${src}`;
};

export default function PetCard({ data }) {
  return (
    <main className="p-[16px] bg-white rounded-[15px] w-full h-full shadow-md flex flex-col gap-[12px]">
      <div className="flex items-center bg-[#F2F2F2] rounded-l-[72px] rounded-r-[72px] p-[8px]">
        <Image
          loader={imageLoader}
          alt="Profile Picture"
          src={data.picture}
          width={110}
          height={110}
          className="min-w-[110px] max-w-[110px] min-h-[110px] max-h-[110px] object-cover rounded-full"
        />
        <div className="mx-auto">
          <p className="text-[Raleway] text-[28px] text-[#FF7068] mb-3 text-center">
            {data.name}
          </p>
          <Rating readOnly value={data.rate} precision={0.5} size="large" />
        </div>
      </div>
      <div className="flex justify-around w-full">
        <div className="inline-block text-[16px] text-center md:text-left">
          <p className="font-bold text-center">
            Raza: <span className="font-normal">{data.breed}</span>
          </p>
          <p className="font-bold text-center">
            Edad:{" "}
            <span className="font-normal">{`${data.age} 
            ${data.age === 1 ? "año" : "años"}`}</span>
          </p>
        </div>
        <div className="inline-block text-[16px] md:text-left">
          <p className="font-bold text-center">
            Sexo: <span className="font-normal">{data.sex}</span>
          </p>
          <p className="font-bold text-center">
            Tamaño: <span className="font-normal">{data.size}</span>
          </p>
        </div>
      </div>
      <p className="text-[16px] text-center md:text-justify px-[4px]">
        {data.aboutMe}
      </p>
    </main>
  );
}
