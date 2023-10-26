import PetCard from "./PetCard";
import NewPetCard from "./NewPetCard";

export default function PetsSection({ data, idMatch }) {
  return (
    <div className='bg-[#2B2E4A] p-[16px] sm:p-[20px] md:p-[24px] lg:p-[28px] sm:rounded-2xl'>
      <p className='text-[#F2F2F2] text-[28px] sm:text-[32px] md:text-[28px] lg:text-[32px] border px-[16px] rounded-xl w-fit font-semibold sm:font-bold mb-[28px]'>
        Mascotas
      </p>
      {data.length === 0 && idMatch 
        ? 
        <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-[28px] lg:gap-[48px] items-center'>
          <NewPetCard />
          <p className='text-white font-light text-[16px] md:text-[20px] text-center w-full order-first lg:order-last'>
            Para poder solicitar una reserva debes de tener agregada al menos una mascota
          </p>
        </div>
        : 
        null
      }
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] sm:gap-[20px] md:gap-[24px] lg:gap-[28px]">
        {data.map((item, index) => {
          return <PetCard data={item} key={index} />;
        })}
        {
        data.length < 4 && data.length > 0 && idMatch ? <NewPetCard/> : null
        }
      </div>
    </div>
  );
}
