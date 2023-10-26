import Slider from "./Slider";
import NewHouseCard from "./NewHouseCard";
import Image from "next/image";

export default function HomeSection(data) {
  console.log("data", data);
  function definePetSizes() {
    let sizesString = "";
    if (data.homeData.hosting.cat || data.homeData.hosting.dog.small.isHosted)
      sizesString += ",Chico";
    if (data.homeData.hosting.dog.medium.isHosted) sizesString += ", Mediano";
    if (data.homeData.hosting.dog.big.isHosted) sizesString += ", Grande";
    const petSize = sizesString.replace(",", "");
    return petSize;
  }
  return (
    <div className='bg-[#2B2E4A] sm:rounded-2xl p-[16px] sm:p-[20px] md:p-[24px] lg:p-[28px] text-[#2B2E4A]'>
      <p className='text-[#F2F2F2] text-[28px] sm:text-[32px] md:text-[28px] lg:text-[32px] font-semibold sm:font-bold mb-[28px] border w-fit px-[16px] rounded-xl'>
        Alojamiento
      </p>
      { !data.homeData && data.idMatch &&
        <div className='flex flex-col-reverse lg:flex-row w-full gap-[28px] lg:gap-[48px] items-center'>
          <NewHouseCard />
          <p className='text-white font-light text-[16px] md:text-[20px] text-center w-full lg:w-1/2'>
            Para poder recibir solicitudes de reserva debes agregar tu alojamiento
          </p>
        </div>
      }
      { data.homeData &&
        <>
          <div className=" mb-10">
            <Slider pictures={data.homeData.picture} />
          </div>
          <div className='flex justify-between px-[6px] sm:px-[12px] md:px-[20px] font-light  w-full rounded-lg mb-[20px] text-[16px] md:text-[20px] bg-[#FF7068] text-white'>
              <p className="font-[Nunito] text-center sm:text-start lg:text-center xl:text-start">
              Check-In: <span>{data.homeData.checkIn}</span>
              </p>
              <p className="font-[Nunito] text-centersm:text-start lg:text-center xl:text-start">
              Check-Out: <span>{data.homeData.checkOut}</span>
              </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-[12px] text-[20px] p-[12px] md:p-[20px] bg-[#F2F2F2] rounded-[10px] font-bold justify-between">
            <div className="flex flex-col gap-[12px] sm:gap-7 basis-1/3">
              <p className="h-fit sm:h-[55px] text-[16px] md:text-[18px] lg:text-[20px]">
                Recibe:{" "}
                <span className="font-normal text-[14px] md:text-[16px] lg:text-[18px]">
                  {data.homeData.hosting.cat.isHosted &&
                  (data.homeData.hosting.dog.small.isHosted ||
                    data.homeData.hosting.dog.medium.isHosted ||
                    data.homeData.hosting.dog.big.isHosted)
                    ? "Perros y Gatos"
                    : data.homeData.hosting.cat.isHosted
                    ? "Gatos"
                    : data.homeData.hosting.dog.small.isHosted ||
                      data.homeData.hosting.dog.medium.isHosted ||
                      data.homeData.hosting.dog.big.isHosted
                    ? "Perros"
                    : null}
                </span>
              </p>
              <div>
                <p className="text-[16px] md:text-[18px] lg:text-[20px]">Amenidades:</p>
                <ol className="list-disc list-inside text-[14px] md:text-[16px] lg:text-[18px] font-normal">
                  {data.homeData.amenities.map((item, index) => {
                    return (
                      <li key={index} className="font-normal">
                        {item}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
            <div className="flex flex-col gap-[12px] sm:gap-7 basis-1/3">
              <p className="h-fit sm:h-[55px] text-[16px] md:text-[18px] lg:text-[20px]">
                Tamaño:{" "}
                <span className="font-normal text-[14px] md:text-[16px] lg:text-[18px]">
                  {definePetSizes()}
                </span>
              </p>
              <div>
                <p className="text-[16px] md:text-[18px] lg:text-[20px]">Restricciones:</p>
                <ol className="list-disc list-inside text-[14px] md:text-[16px] lg:text-[18px] font-normal">
                  {data.homeData.restrictions.map((item, index) => {
                    return (
                      <li key={index} className="font-normal">
                        {item}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
            <div className="flex flex-col gap-[12px] sm:gap-7 basis-1/3 font">
              <p className="h-fit sm:h-[55px] text-[16px] md:text-[18px] lg:text-[20px]">
                Tiene Mascota:{" "}
                <span className="font-normal text-[14px] md:text-[16px] lg:text-[18px]">
                  {data.homeData.hasPet ? "Sí" : "No"}
                </span>
              </p>
              <div>
                <p className="text-[16px] md:text-[18px] lg:text-[20px]">Descripción:</p>
                <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal">
                  {data.homeData.description}
                </p>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
}
