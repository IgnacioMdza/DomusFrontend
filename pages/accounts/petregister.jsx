import Image from "next/image";

export default function PetRegister() {
  return (
    <div className="mt-32 mb-24">
      <div className="bg-[#2B2E4A] py-4 text-center">
        <h1 className="text-white text-3xl font-semibold">Agregar Mascota</h1>
      </div>
      <div className="lg:flex lg:justify-center">
        <div className="border-[2px] py-7 mx-4 px-2 rounded-lg mt-10 lg:max-w-7xl lg:items-center">
          <div className="lg:flex lg:items-start md:items-center lg:w-full">
            <div className="flex justify-center items-center pt-10 lg:px-10 ">
              <Image
                src={"/icons/profile-pet.jpg"}
                width={200}
                height={200}
                alt="Perfil de la Mascota"
              />
            </div>
            <form action="" className="px-2 pt-3  md:m-auto m-auto">
              <div className="border-b-4 border-[#2B2E4A]">
                <h2 className="text-2xl py-2 ">Datos de tu mascota</h2>
              </div>
              <div className="flex justify-start items-center gap-5 py-4">
                <div className="flex items-center">
                  <label htmlFor="default-radio-1" className="mr-2 ">
                    Perro
                  </label>
                  <input
                    type="radio"
                    value=""
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                  />
                </div>

                <div className="flex items-center">
                  <label htmlFor="default-radio-1" className="mr-2 ">
                    Gato
                  </label>
                  <input
                    type="radio"
                    value=""
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                  />
                </div>
              </div>
              <div className="sm:flex sm:justify-center sm:gap-36 lg:flex lg:justify-start lg:gap-14">
                <div className="pb-4">
                  <label
                    forlabel="name"
                    className="block mb-2 text-lg font-medium"
                  >
                    Nombre:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        viewBox="0 0 400 400"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M55 196.076C213.97 162.425 328.5 179.5 344.217 163.629C356.262 151.465 347.5 115.501 340.587 111.591C332.881 107.232 302.935 102.413 281 101.629M266.5 75.5C232.987 143.859 249.995 254.767 246.007 323"
                          stroke="#000000"
                          strokeOpacity="0.9"
                          strokeWidth="16"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M49 150.74C61.5 214.941 69 259.146 69 323.347"
                          stroke="#000000"
                          strokeOpacity="0.9"
                          strokeWidth="16"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M69 323C113.955 213.209 226.212 186.011 244 321.792"
                          stroke="#000000"
                          strokeOpacity="0.9"
                          strokeWidth="16"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="name"
                      className=" rounded-lg w-full pl-10 p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#2B2E4A] focus:ring-[#2B2E4A]"
                      placeholder="Ingresa el Nombre"
                    />
                  </div>
                </div>
                <div className="pb-4">
                  <label
                    forlabel="lastName"
                    className="block mb-2 text-lg font-medium"
                  >
                    Raza:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
                    <input
                      type="text"
                      name="lastName"
                      className=" rounded-lg w-full p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#2B2E4A] focus:ring-[#2B2E4A]"
                      placeholder="Ingresa la Raza"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:flex sm:justify-center sm:gap-10 lg:flex lg:justify-start lg:gap-14">
                <div className="flex justify-around item-center sm:gap-80">
                  <div>
                    <label
                      forlabel="lastName"
                      className="block mb-2 text-lg font-medium"
                    >
                      Tamaño:
                    </label>
                    <select
                      id="countries"
                      className="rounded-lg w-full p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#2B2E4A] focus:ring-[#2B2E4A]"
                    >
                      <option>Chico (2 kilos)</option>
                      <option value="">Mediano(5 kilos)</option>

                      <option value="">Grande (8 kilos)</option>
                    </select>
                  </div>
                  <div>
                    <label
                      forlabel="lastName"
                      className="block mb-2 text-lg font-medium"
                    >
                      Sexo:
                    </label>
                    <select
                      id="countries"
                      className="rounded-lg w-full p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#2B2E4A] focus:ring-[#2B2E4A]"
                    >
                      <option>Macho</option>
                      <option value="">Hembra</option>

                      <option value="">otro</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <label
                  htmlFor="message"
                  className="block mb-2 text-2xl font-medium"
                >
                  Acerca de tu Mascota:
                </label>
                <textarea
                  id="message"
                  rows="6"
                  className=" rounded-lg w-full pl-10 p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#2B2E4A] focus:ring-[#2B2E4A] bg-gray-100"
                  placeholder="100 - 200 caracteres. -¿Cuál es su temperamento? -¿Qué le gusta hacer? -¿Se lleva bien con otros animales? "
                ></textarea>
              </div>

              <div className="pt-6 sm:flex sm:justify-around items-center gap-4">
                <button
                  type="button"
                  className="px-6 py-3 w-full border-[2px] border-[#2B2E4A] rounded-full md:font-semibold mb-3 sm:mt-0 lg:mb-0 md:mb-0 sm:mb-0"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="px-6 py-3.5 w-full text-base md:font-bold text-white bg-[#2B2E4A] hover:bg-[#2B2E4A] focus:ring-4 focus:outline-none focus:ring-[#2B2E4A] rounded-full text-center dark:bg-[#2B2E4A] dark:hover:bg-[#2B2E4A] dark:focus:ring-bg-[#FF6868]"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
