import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

const imageLoader = ({ src, width, quality }) => {
  return `${src}`;
};

export default function PetRegister() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [picture, setPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const urlFetch = process.env.NEXT_PUBLIC_BASE_URL;
  const aboutMeText = watch("aboutMe") || "";

  useEffect(() => {
    const pathId = router.query.id;
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
    if (pathId && token) {
      const tokenInfo = JSON.parse(atob(token.split(".")[1]));
      const pathId = router.query.id;
      if (tokenInfo.id != pathId || tokenInfo.userType != "client") {
        router.push("/");
      } else {
        setToken(token);
      }
    }
  }, [router.query.id, router]);

  const onSubmit = (data) => {
    setIsLoading(true);
    toast.info("Guardando Mascota...", { autoClose: 2000 });
    let dataObject = {
      type: data.type,
      name: data.name,
      breed: data.breed,
      size: data.size,
      sex: data.sex,
      age: parseInt(data.age),
      aboutMe: data.aboutMe,
      owner: JSON.parse(atob(token.split(".")[1])).id,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(dataObject));
    formData.append("folder", "pets");
    formData.append("image", picture);

    fetch(`${urlFetch}/pets/${JSON.parse(atob(token.split(".")[1])).id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((resp) => {
        if (!resp) {
          throw new Error("Respuesta no exitosa");
        }
        return resp.json();
      })
      .then((response) => {
        if (response.success) {
          toast.success("Mascota creada con éxito", { autoClose: 2000 });
          setTimeout(() => router.push(`/profile/${JSON.parse(atob(token.split(".")[1])).id}`), 2000);
        } else {
          toast.error("Error al crear mascota");
          setTimeout(() => setIsLoading(false), 2000);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        toast.error("Error de conexión, favor de volver a intentar en un momento");
        setTimeout(() => setIsLoading(false), 2000);
      });
  };

  return !token ? (
    <main className="mt-[114px] mb-[24px] h-[calc(100vh-90px)]">
      <Head>
        <title>Domus - Registra tu Mascota</title>
      </Head>
    </main>
  ) : (
    <main className="mt-[110px] md:mt-32 min-h-[calc(100vh-90px)]">
      <Head>
        <title>Domus - Registra tu Mascota</title>
      </Head>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      <div className="bg-[#2B2E4A] py-4 text-center">
        <h1 className="text-white text-[24px] md:text-[28px] font-normal font-[Raleway]">Agregar Mascota</h1>
      </div>
      <div className="lg:flex lg:justify-center">
        <div className="p-[16px] md:p-[36px] m-5 md:m-8 rounded-2xl lg:max-w-7xl lg:items-center bg-white drop-shadow-xl font-[Nunito] font-medium">
          <div className="lg:flex lg:items-start md:items-center lg:w-full">
            {/* <div className="flex justify-center items-center pt-10 lg:px-10 ">
              <Image
                src={"/icons/profile-pet.jpg"}
                width={200}
                height={200}
                alt="Perfil de la Mascota"
              />
            </div> */}
            <form onSubmit={handleSubmit(onSubmit)} className="md:m-auto m-auto text-[#2B2E4A]">
              <div className="border-b-[2px] border-[#2B2E4A]">
                <h2 className="text-[24px] pb-[2px] font-semibold">Datos de tu mascota</h2>
              </div>
              <div className="flex flex-col md:flex-row md:gap-[36px]">
                <div className="w-[200px] h-[200px] aspect-square rounded-full bg-[#F2F2F2] mx-auto border mt-[20px] md:mt-[24px] mb-[12px] p-[12px] border-[#c1c1c1]">
                  {picture ? (
                    <Image loader={imageLoader} alt="Pet Picture" src={URL.createObjectURL(picture)} width={200} height={200} className="h-full w-full object-cover rounded-full" />
                  ) : (
                    <div className="h-full w-full object-cover rounded-full flex place-content-center items-center bg-white bg-opacity-40">
                      <p className="text-center text-slate-400 font-light mt-[8px]">Aún no has cargado una imagen</p>
                    </div>
                  )}
                </div>
                <div className="mt-[10px] md:mt-[24px] lg:w-[500px]">
                  <div className="pb-4 w-full">
                    <label forlabel="picture" className="block mb-2 text-lg font-medium">
                      Subir imagen:
                    </label>
                    <div className="flex justify-center bg-[#F2F2F2] border-[1px] border-slate-300 rounded-lg">
                      <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        className="cursor-pointer p-[8px]"
                        {...register("picture", {
                          required: {
                            value: true,
                            message: "Subir imagen es requerido",
                          },
                          onChange: (e) => setPicture(e.target.files[0]),
                        })}
                      />
                    </div>
                    {errors.picture && <span className="text-red-500">{errors.picture.message}</span>}
                  </div>
                  <div className="my-[8px]">
                    <p className="block mb-[4px] text-lg font-medium">Tipo de mascota:</p>
                    <div className="flex justify-start items-center gap-5">
                      <div className="flex items-center">
                        <label htmlFor="default-radio-1" className="mr-2 text-[18px]">
                          Perro
                        </label>
                        <input
                          type="radio"
                          value="Perro"
                          name="default-radio"
                          className="w-4 h-4 bg-[#F2F2F2] border-gray-300"
                          {...register("type", {
                            required: {
                              value: true,
                              message: "Selecciona un tipo de mascota",
                            },
                          })}
                        />
                      </div>
                      <div className="flex items-center">
                        <label htmlFor="default-radio-1" className="mr-2 text-[18px]">
                          Gato
                        </label>
                        <input
                          type="radio"
                          value="Gato"
                          name="default-radio"
                          className="w-4 h-4 bg-[#F2F2F2] border-gray-300 "
                          {...register("type", {
                            required: {
                              value: true,
                              message: "Selecciona un tipo de mascota",
                            },
                          })}
                        />
                      </div>
                    </div>
                    {errors.type && <span className="text-red-500">{errors.type.message}</span>}
                  </div>
                  <div className="sm:flex w-full sm:justify-center sm:gap-[16px] lg:flex lg:justify-start lg:gap-[20px]">
                    <div className="pb-4 sm:w-1/2">
                      <label forlabel="name" className="block mb-2 text-lg font-medium">
                        Nombre:
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" viewBox="0 0 400 400" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M55 196.076C213.97 162.425 328.5 179.5 344.217 163.629C356.262 151.465 347.5 115.501 340.587 111.591C332.881 107.232 302.935 102.413 281 101.629M266.5 75.5C232.987 143.859 249.995 254.767 246.007 323"
                              stroke="#000000"
                              strokeOpacity="0.9"
                              strokeWidth="16"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path d="M49 150.74C61.5 214.941 69 259.146 69 323.347" stroke="#000000" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M69 323C113.955 213.209 226.212 186.011 244 321.792" stroke="#000000" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="name"
                          className="rounded-lg w-full pl-10 p-3 border-[1px] border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#2B2E4A] focus:ring-[#2B2E4A]  bg-[#F2F2F2]"
                          placeholder="Ingresa el Nombre"
                          {...register("name", {
                            required: {
                              value: true,
                              message: "El campo Nombre es requerido",
                            },
                            maxLength: {
                              value: 20,
                              message: "Máximo 20 caracteres",
                            },
                          })}
                        />
                      </div>
                      {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                    </div>
                    <div className="pb-4 sm:sm:w-1/2">
                      <label forlabel="breed" className="block mb-2 text-lg font-medium">
                        Raza:
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
                        <input
                          type="text"
                          name="breed"
                          className=" rounded-lg w-full p-3 border-[1px] border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#2B2E4A] focus:ring-[#2B2E4A]  bg-[#F2F2F2]"
                          placeholder="Ingresa la Raza"
                          {...register("breed", {
                            required: {
                              value: true,
                              message: "El campo Raza es requerido",
                            },
                          })}
                        />
                      </div>
                      {errors.breed && <span className="text-red-500">{errors.breed.message}</span>}
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-center gap-[12px] sm:gap-[16px] lg:flex lg:justify-start lg:gap-[20px]">
                      <div className="sm:w-1/3">
                        <label forlabel="size" className="block mb-2 text-lg font-medium">
                          Tamaño:
                        </label>
                        <select
                          id="size"
                          className="rounded-lg w-full p-3 border-[1px] border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#2B2E4A] focus:ring-[#2B2E4A]  bg-[#F2F2F2]"
                          {...register("size", {
                            required: {
                              value: true,
                              message: "El campo tamaño es requerido",
                            },
                          })}
                        >
                          <option value="">Seleccionar</option>
                          {watch("type") === "Gato" ? (
                            <option value="Pequeño">Chico (2-10 kilos)</option>
                          ) : (
                            <>
                              <option value="Pequeño">Chico (2-10 kilos)</option>
                              <option value="Mediano">Mediano (10-25 kilos)</option>
                              <option value="Grande">Grande (25-50 kilos)</option>
                            </>
                          )}
                        </select>
                        {errors.size && <span className="text-red-500">{errors.size.message}</span>}
                      </div>
                      <div className="sm:w-1/3">
                        <label forlabel="sex" className="block mb-2 text-lg font-medium">
                          Sexo:
                        </label>
                        <select
                          id="sex"
                          className="rounded-lg w-full p-3 border-[1px] border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#2B2E4A] focus:ring-[#2B2E4A]  bg-[#F2F2F2]"
                          {...register("sex", {
                            required: {
                              value: true,
                              message: "El campo sexo es requerido",
                            },
                          })}
                        >
                          <option value="">Seleccionar</option>
                          <option value="Macho">Macho</option>
                          <option value="Hembra">Hembra</option>
                        </select>
                        {errors.sex && <span className="text-red-500">{errors.sex.message}</span>}
                      </div>
                      <div className="pb-4 sm:sm:w-1/3">
                        <label forlabel="age" className="block mb-2 text-lg font-medium">
                          Edad:
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
                          <input
                            type="number"
                            name="age"
                            className=" rounded-lg w-full p-3 border-[1px] border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#2B2E4A] focus:ring-[#2B2E4A]  bg-[#F2F2F2]"
                            placeholder="En años"
                            {...register("age", {
                              required: {
                                value: true,
                                message: "El campo edad es requerido",
                              },
                              min: {
                                value: 1,
                                message: "Ingresa una edad valida",
                              },
                              max: {
                                value: 20,
                                message: "Ingresa una edad valida",
                              },
                            })}
                          />
                        </div>
                        {errors.age && <span className="text-red-500">{errors.age.message}</span>}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="aboutMe" className="block mb-2 text-[18px] font-medium">
                      Acerca de tu Mascota:
                    </label>
                    <textarea
                      id="aboutMe"
                      rows="6"
                      className=" rounded-lg w-full p-3 border-[1px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#2B2E4A] focus:ring-[#2B2E4A] bg-[#F2F2F2] resize-none"
                      placeholder={`Describe:\n- ¿Cuál es su temperamento?\n- ¿Qué le gusta hacer?\n- ¿Se lleva bien con otros animales?\n- 100 a 150 caracteres`}
                      {...register("aboutMe", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        minLength: {
                          value: 100,
                          message: "Mínimo 100 caracteres",
                        },
                        maxLength: {
                          value: 150,
                          message: "Máximo 150 caracteres",
                        },
                      })}
                    ></textarea>
                    <p className={`${aboutMeText.length < 100 || aboutMeText.length > 150 ? "text-red-500" : "text-gray-500"} text-[14px]`}>
                      {aboutMeText.length < 100 ? `Min ${aboutMeText.length}/100` : `Max ${aboutMeText.length}/150`}
                    </p>
                    {errors.aboutMe && <span className="text-red-500">{errors.aboutMe.message}</span>}
                  </div>

                  <div className="pt-6 flex justify-around items-center gap-4">
                    <Link
                      href="/"
                      className="px-6 py-3 text-center w-1/2 border-[1px] border-[#2B2E4A] rounded-full md:font-semibold hover:scale-[102%] transition active:bg-[#2B2E4A] active:text-white shadow-lg"
                    >
                      Cancelar
                    </Link>
                    <button
                      type="submit"
                      className="px-6 py-3.5 w-1/2 text-base md:font-bold text-white bg-[#2B2E4A] border-[1px] border-[#2B2E4A] hover:scale-[102%] active:bg-white active:text-[#2B2E4A] rounded-full text-center transition shadow-lg disabled:opacity-25 disabled:bg-gray-400 disabled:border-gray-700 disabled:text-gray-700"
                      disabled={isLoading}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
