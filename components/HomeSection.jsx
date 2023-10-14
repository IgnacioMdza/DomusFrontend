import Slider from "./Slider";

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
    <div>
      <div className=" mb-10">
        <Slider pictures={data.homeData.picture} />
      </div>
      <div className="flex gap-5 text-[20px] p-5 bg-white rounded-[10px] font-bold">
        <div className="flex flex-col gap-7 basis-1/3">
          <p className="h-[55px] text-[16px] md:text-[20px]">
            Recibe:{" "}
            <span className="font-normal text-[13px] md:text-[16px]">
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
            <p className="text-[16px] md:text-[20px]">Amenidades:</p>
            <ol className="list-disc list-inside text-[13px] md:text-[16px] font-normal">
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
        <div className="flex flex-col gap-7 basis-1/3">
          <p className="h-[55px] text-[16px] md:text-[20px]">
            Tamaño:{" "}
            <span className="font-normal text-[13px] md:text-[16px]">
              {definePetSizes()}
            </span>
          </p>
          <div>
            <p className="text-[16px] md:text-[20px]">Restricciones:</p>
            <ol className="list-disc list-inside text-[13px] md:text-[16px] font-normal">
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
        <div className="flex flex-col gap-7 basis-1/3 font">
          <p className="h-[55px] text-[16px] md:text-[20px]">
            Tiene Mascota:{" "}
            <span className="font-normal text-[13px] md:text-[16px]">
              {data.homeData.hasPet ? "Sí" : "No"}
            </span>
          </p>
          <div>
            <p className="text-[16px] md:text-[20px]">Descripción:</p>
            <p className="text-[13px] md:text-[16px] font-normal">
              {data.homeData.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
