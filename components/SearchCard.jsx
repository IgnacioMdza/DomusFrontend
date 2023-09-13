import Link from "next/link";

export default function SearchCard() {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-[15px] p-[20px] text-center text-[20px] text-[#1f2937] font-[Nunito] bg-opacity-60 backdrop-blur shadow-xl">
      <h3 className="text-[24px] mb-4">¡Realiza tu primer búsqueda!</h3>
      <div className="grid md:grid-cols-2 gap-5">
        <select
          className="w-full bg-[#f2f2f2] h-[57px] rounded-[10px] px-[10px]"
          id="petType"
          name="petType"
          defaultValue="default"
        >
          <option value="default">Mascota</option>
          <option value="perro">Perro</option>
          <option value="gato">Gato</option>
        </select>
        <select
          className="w-full bg-[#f2f2f2] h-[57px] rounded-[10px] px-[10px]"
          id="petSize"
          name="petSize"
          defaultValue="default"
        >
          <option value="default" disabled hidden>
            Tamaño
          </option>
          <option value="small">Chico</option>
          <option value="medium">Mediano</option>
          <option value="big">Grande</option>
        </select>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <select
          className="w-full bg-[#f2f2f2] h-[57px] rounded-[10px] px-[10px]"
          id="state"
          name="state"
          defaultValue="default"
        >
          <option value="default" disabled hidden>
            Estado
          </option>
          <option value="estado1">Estado 1</option>
          <option value="estado2">Estado 2</option>
          <option value="estado3">Estado 3</option>
        </select>
        <select
          className="w-full bg-[#f2f2f2] h-[57px] rounded-[10px] px-[10px]"
          id="city"
          name="city"
          defaultValue="default"
        >
          <option value="default" disabled hidden>
            Ciudad
          </option>
          <option value="ciudad1">Ciudad 1</option>
          <option value="ciudad2">Ciudad 2</option>
          <option value="ciudad3">Ciudad 3</option>
        </select>
      </div>
      <div className="grid md:grid-cols-2 gap-5 mb-4">
        <input
          className="w-full bg-[#f2f2f2] h-[57px] rounded-[10px] px-[10px]"
          type="date"
          id="checkin"
          name="checkin"
        />
        <input
          className="w-full bg-[#f2f2f2] h-[57px] rounded-[10px] px-[10px]"
          type="date"
          id="checkout"
          name="checkout"
        />
      </div>
      <Link
        href={
          "http://localhost:3000/search?city=Guadalajara&state=Jalisco&animalType=Perro"
        }
      >
        <button className="bg-[#2b2e4a] text-[#F2F2F2] rounded-[60px] w-10/12 h-[57px] font-bold hover:scale-105 mx-auto">
          BUSCAR
        </button>
      </Link>
    </div>
  );
}
