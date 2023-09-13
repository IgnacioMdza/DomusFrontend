import Image from "next/image";

const imageLoader = ({ src, width, quality }) => {
  return `https://hips.hearstapps.com/${src}`;
};

export default function PetCard() {
  return (
    <main className="p-[16px] bg-white rounded-[15px] w-full shadow-md flex flex-col gap-[12px]">
      <div className="flex items-center bg-[#F2F2F2] rounded-l-[72px] rounded-r-[72px] p-[8px]">
        <Image
          loader={imageLoader}
          alt="Profile Picture"
          src={
            "hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
          }
          width={110}
          height={110}
          className="object-cover rounded-full"
        />
        <div className="mx-auto">
          <p className="text-[Raleway] text-[28px] text-[#FF7068] mb-3 text-center">
            Rocko
          </p>
          <p className="text-[18px]">⭐⭐⭐⭐⭐</p>
        </div>
      </div>
      <div className='flex justify-around w-full'>
        <div className="inline-block text-[16px] text-center md:text-left">
          <p className="font-bold text-center">
            Raza: <span className="font-normal">Chihuahua</span>
          </p>
          <p className="font-bold text-center">
            Edad: <span className="font-normal">2 años</span>
          </p>
        </div>
        <div className="inline-block text-[16px] md:text-left">
          <p className="font-bold text-center">
            Sexo: <span className="font-normal">Macho</span>
          </p>
          <p className="font-bold text-center">
            Tamaño: <span className="font-normal">Mediano</span>
          </p>
        </div>
      </div>
      <p className="text-[16px] text-center md:text-justify px-[4px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </main>
  );
}
