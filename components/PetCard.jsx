import Image from "next/image";

const imageLoader = ({ src, width, quality }) => {
  return `https://hips.hearstapps.com/${src}`;
};

export default function PetCard() {
  return (
    <main className="px-5 py-3 bg-white rounded-[15px] w-full">
      <div className="flex justify-around mb-4">
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
        <div className="text-center">
          <p className="text-[Raleway] text-[30px] text-[#FF7068] mb-3">
            Rocko
          </p>
          <p className="text-[25px]">⭐⭐⭐⭐⭐</p>
        </div>
      </div>
      <p className="text-[16px] mb-5 text-center md:text-left">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div className="inline-block w-[50%] text-[16px] text-center md:text-left">
        <p className="font-bold">
          Raza: <span className="font-normal">Chihuahua</span>
        </p>
        <p className="font-bold">
          Edad: <span className="font-normal">2 años</span>
        </p>
      </div>
      <div className="inline-block w-[50%] text-[16px] text-center md:text-left">
        <p className="font-bold">
          Sexo: <span className="font-normal">Macho</span>
        </p>
        <p className="font-bold">
          Tamaño: <span className="font-normal">Mediano</span>
        </p>
      </div>
    </main>
  );
}
