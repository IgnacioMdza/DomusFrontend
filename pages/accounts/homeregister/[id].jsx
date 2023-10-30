import { useForm } from "react-hook-form";
import Image from "next/image";
import Head from "next/head";
import { locations } from "@/data/locations";
import { bank } from "@/data/bank";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomeRegister() {
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm();

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const urlFetch = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const pathId = router.query.id;
    if (pathId && token) {
      fetch(`${urlFetch}/users/${pathId}`)
        .then((resp) => {
          if (!resp) {
            throw new Error('Respuesta no exitosa');
          }
          return resp.json();
        })
        .then((resp) => {
          if (!resp.data.accommodation) {
            setUser(resp.data);
          } else {
            router.push(`/profile/${pathId}`);
          }
        })
        .catch((error) => {
          console.error('Error en la solicitud:', error);
          toast.error("Error de conexión, favor de volver a intentar en un momento");
        });
    }
  }, [router, router.query.id, token, urlFetch]);

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
      if (tokenInfo.id != pathId || tokenInfo.userType != "host") {
        router.push("/");
      } else {
        setToken(token);
      }
    }
  }, [router.query.id, router]);

  const [images, setImages] = useState([]);
  const [currentFiles, setCurrentFiles] = useState([]);

  useEffect(() => {
    if (currentFiles) {
      const newList = images;
      for (const file of currentFiles) {
        newList.push(file);
      }
      setImages(newList);
    }
    setCurrentFiles(null);
  }, [images, currentFiles]);

  const deleteFileFromList = (index) => {
    images.splice(index, 1);
    setImages([...images]);
  };

  const [isOpen, setIsOpen] = useState([]);
  const [isOpenCheck, setIsOpenCheck] = useState([]);
  const [isOpenCheck2, setIsOpenCheck2] = useState([]);
  const [isOpenCheck3, setIsOpenCheck3] = useState([]);
  const [isOpenCheck4, setIsOpenCheck4] = useState([]);
  const [isOpenCheck5, setIsOpenCheck5] = useState([]);

  const [textareaActive, setTextareaActive] = useState(false);
  const [check, setCheck] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);

  const onSubmit = (data) => {
    toast.info("Guardando tu alojamiento...", { autoClose: 2000 });
    const amenities = data.amenities;
    const stringAmenities = amenities.split(".");
    const ListAmenities = stringAmenities.map((p) => p.trim());
    const clearAmenidades = ListAmenities.filter(Boolean);
    const arrayAmenidades = clearAmenidades.map((clear) => clear.replace(/(\r\n|\n|\r)/gm, ""));

    const restrictions = data.restrictions;
    const stringRestrictions = restrictions.split(".");
    const ListRestrictions = stringRestrictions.map((p) => p.trim());
    const clearRestrictions = ListRestrictions.filter(Boolean);
    const arrayRestrictions = clearRestrictions.map((clear) => clear.replace(/(\r\n|\n|\r)/gm, ""));

    let amount = parseInt(data.amount);
    let externalNumber = parseInt(data.externalNumber);
    let internalNumber = parseInt(data.internalNumber);
    let postalCode = parseInt(data.postalCode);

    let price1 = parseInt(data.price1);
    let price2 = parseInt(data.price2);
    let price3 = parseInt(data.price3);
    let price4 = parseInt(data.price4);

    const num = 0;
    isNaN(externalNumber) ? (externalNumber = num) : externalNumber;
    isNaN(internalNumber) ? (internalNumber = num) : internalNumber;
    isNaN(postalCode) ? (postalCode = num) : postalCode;

    isNaN(amount) ? (amount = num) : amount;

    isNaN(price1) ? (price1 = num) : price1;
    isNaN(price2) ? (price2 = num) : price2;
    isNaN(price3) ? (price3 = num) : price3;
    isNaN(price4) ? (price4 = num) : price4;

    const dataObject = {
      owner: JSON.parse(atob(token.split(".")[1])).id,
      hosting: {
        amount: amount,
        dog: {
          small: {
            isHosted: check,
            price: price1,
          },
          medium: {
            isHosted: check2,
            price: price2,
          },
          big: {
            isHosted: check3,
            price: price3,
          },
        },
        cat: {
          isHosted: check4,
          price: price4,
        },
      },
      hasPet: textareaActive,
      description: data.description === "" || !textareaActive ? "N/A" : data.description,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      amenities: arrayAmenidades,
      restrictions: arrayRestrictions,
      address: {
        street: data.street,
        externalNumber: externalNumber,
        internalNumber: internalNumber,
        neighbourhood: data.neighbourhood,
        state: data.state,
        city: data.city,
        postalCode: postalCode,
        streetsNearby: data.streetsNearby,
        references: data.references,
      },
      bankAccount: {
        name: data.name,
        number: parseInt(data.number),
        bank: data.bank,
        clabe: data.clabe,
      },
    };
    console.log(dataObject);
    if (images.length === 0) {
      toast.error("Tienes que cargar las imágenes!");
      return;
    }
    const formData = new FormData();
    formData.append("data", JSON.stringify(dataObject));
    formData.append("folder", "accommodations");
    images.forEach((image, index) => {
      formData.append(`image_${index}`, image);
    });

    fetch(`${urlFetch}/accommodation/${JSON.parse(atob(token.split(".")[1])).id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((resp) => {
        if (!resp) {
          throw new Error('Respuesta no exitosa');
        }
        return resp.json();
      })
      .then((response) => {
        if (response.success) {
          toast.success("Alojamiento creado con éxito", { autoClose: 2000 });
          setTimeout(() => router.push(`/profile/${JSON.parse(atob(token.split(".")[1])).id}`), 2000);
        } else {
          toast.error(`${response.message}`);
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
        toast.error("Error de conexión, favor de volver a intentar en un momento");
      });
  };

  // useEffect(() => {
  const hiddenText = (e) => {
    let aux = null;
    if (isOpen.includes(e.target.value)) {
      aux = isOpen.filter((element) => element !== e.target.value);
      // setIsOpen(aux);
    } else {
      aux = isOpen.concat(e.target.value);
      console.log(aux);
      hiddenText;
    }
    setIsOpen(aux);

    if (aux.length > 0) {
      setTextareaActive(true);
    } else {
      setTextareaActive(false);
    }
  };

  const hiddenCheck = (e) => {
    let aux = null;
    if (isOpenCheck.includes(e.target.value)) {
      aux = isOpenCheck.filter((element) => element !== e.target.value);
      // setIsOpen2(aux);
    } else {
      aux = isOpenCheck.concat(e.target.value);
    }
    setIsOpenCheck(aux);

    if (aux.length > 0) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };
  const hiddenCheck2 = (e) => {
    let aux = null;
    if (isOpenCheck2.includes(e.target.value)) {
      aux = isOpenCheck2.filter((element) => element !== e.target.value);
      //setIsOpen(aux);
    } else {
      aux = isOpenCheck2.concat(e.target.value);
    }
    setIsOpenCheck2(aux);

    if (aux.length > 0) {
      setCheck2(true);
    } else {
      setCheck2(false);
    }
  };
  const hiddenCheck3 = (e) => {
    let aux = null;
    if (isOpenCheck3.includes(e.target.value)) {
      aux = isOpenCheck3.filter((element) => element !== e.target.value);
      //setIsOpen(aux);
    } else {
      aux = isOpenCheck3.concat(e.target.value);
    }
    setIsOpenCheck3(aux);

    if (aux.length > 0) {
      setCheck3(true);
    } else {
      setCheck3(false);
    }
  };

  const hiddenCheck4 = (e) => {
    let aux = null;
    if (isOpenCheck4.includes(e.target.value)) {
      aux = isOpenCheck4.filter((element) => element !== e.target.value);
      //setIsOpen(aux);
    } else {
      aux = isOpenCheck4.concat(e.target.value);
    }
    setIsOpenCheck4(aux);

    if (aux.length > 0) {
      setCheck4(true);
    } else {
      setCheck4(false);
    }
  };

  const hiddenCheck5 = (e) => {
    let aux = null;
    if (isOpenCheck5.includes(e.target.value)) {
      aux = isOpenCheck5.filter((element) => element !== e.target.value);
      //setIsOpen(aux);
    } else {
      aux = isOpenCheck5.concat(e.target.value);
    }
    setIsOpenCheck5(aux);

    if (aux.length > 0) {
      setCheck5(true);
    } else {
      setCheck5(false);
    }
  };

  // const changeInput = (e) => {
  //   //esto es el indice que se le dará a cada imagen, a partir del indice de la ultima foto
  //   let indexImg;

  //   //aquí evaluamos si ya hay imagenes antes de este input, para saber en dónde debe empezar el index del proximo array
  //   if (images.length > 0) {
  //     indexImg = images[images.length - 1].index + 1;
  //   } else {
  //     indexImg = 0;
  //   }

  //   let newImgsToState = readmultifiles(e, indexImg);
  //   let newImgsState = [...images, ...newImgsToState];
  //   setimages(newImgsState);

  //   console.log(newImgsState);
  // };

  // function readmultifiles(e, indexInicial) {
  //   const files = e.currentTarget.files;

  //   //el array con las imagenes nuevas
  //   const arrayImages = [];

  //   Object.keys(files).forEach((i) => {
  //     const file = files[i];

  //     let url = URL.createObjectURL(file);

  //     //console.log(file);
  //     arrayImages.push({
  //       index: indexInicial,
  //       name: file.name,
  //       url,
  //       file,
  //     });

  //     indexInicial++;
  //   });

  //   //despues de haber concluido el ciclo retornamos las nuevas imagenes
  //   return arrayImages;
  // }

  // function deleteImg(indice) {
  //   //console.log("borrar img " + indice);

  //   const newImgs = images.filter(function (element) {
  //     return element.index !== indice;
  //   });
  //   console.log(newImgs);
  //   setimages(newImgs);
  // }

  return (
    <main className="min-h-[calc(100vh)]">
      <Head>
        <title>Domus - Registra tu Alojamiento</title>
      </Head>
      <ToastContainer 
        position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"
      />
      {token && user && (
        <>
          <div className="mt-32 mb-24">
            <div className="bg-[#FF6868] py-4 text-center">
              <h1 className="text-white text-3xl font-semibold  font-[Raleway]">Agregar Alojamiento</h1>
            </div>

            <div className="lg:flex lg:justify-center">
              <div className="border-[2px] py-4 mx-4 px-2 rounded-lg mt-10 lg:max-w-7xl bg-white drop-shadow-xl  font-[Nunito] font-medium">
                <div className="border-b-[2px] border-[#FF6868]">
                  <h2 className="text-2xl py-2 ">Características del Alojamiento</h2>
                </div>
                <div className=" md:items-center md:w-full">
                  <form onSubmit={handleSubmit(onSubmit)} className="px-2 pt-3  md:m-auto m-auto ">
                    <div className="md:flex">
                      <div className="flex justify-center flex-col sm:flex-row items-center pt-10 lg:px-10 text-center gap-4 sm:gap-2 sm:items-start md:flex-col md:justify-start md:items-center md:gap-5">
                        <div className="flex flex-col justify-center items-center">
                          <div className="rounded-full w-[240px] h-[240px] flex justify-center items-center shadow-lg bg-[#F2F2F2] border border-[#c1c1c1]">
                            <Image src="/images/seccion_home.png" alt="camera_pic" width={220} height={220} className="w-fit h-fit object-cover aspect-square rounded-full" />
                          </div>
                          <p className="md:pt-4">Te recomendamos agregar al menos 5 fotografías diferentes de tu alojamiento</p>
                        </div>

                        <div className="md:max-w-[360px] md:px-5">
                          <br></br>
                          {/* INPUT IMAGES */}
                          <label className="">
                            <p className="bg-[#2F2E43] px-10  text-white rounded-full py-2 text-lg md:text-lg sm:text-sm w-full cursor-pointer">Selecciona tus imagenes Aquí</p>
                            <div className="flex sm:min-w-[330px] ">
                              <input type="file" hidden name="imag" className="text-[#2A2D49]" accept=".png, .jpg, .jpeg" multiple onChange={(e) => setCurrentFiles(e.target.files)} />
                            </div>
                            {errors.imag && <span className="text-red-500">{errors.imag.message}</span>}
                          </label>

                          {/* VIEW IMAGES */}
                          <div className="flex flex-row gap-2 flex-wrap justify-center">
                            {images.map((image, index) => (
                              <div className="flex " key={index}>
                                <div className="">
                                  <button className="position-absolute px-2 mb-2 text-white bg-[#FF6868] mt-4" onClick={() => deleteFileFromList(index)}>
                                    x
                                  </button>
                                  <div className="">
                                    <Image src={URL.createObjectURL(image)} width={100} height={100} className="border border-5 w-max-80 h-auto" alt="Imagen dada de alta"></Image>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="md:w-full">
                        <div className=" my-5 text-lg font-medium">
                          <h4>
                            ¿Qué tipo de mascotas recibirás en tu alojamiento?
                            <small>{` (Pueden ser ambos)`}</small>:
                          </h4>
                          <div className="flex justify-start items-center gap-3 pt-4">
                            <div className="flex items-center">
                              <label htmlFor="default-radio-1" className="mr-2 ">
                                Perro
                              </label>
                              <input type="checkbox" value="perro" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" onChange={hiddenCheck5} />
                            </div>

                            <div className="flex items-center">
                              <label htmlFor="default-radio-1" className="mr-2 ">
                                Gato
                              </label>
                              <input type="checkbox" value="gato" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" onChange={hiddenCheck4} />
                            </div>
                          </div>
                        </div>
                        <div className=" my-5 text-lg font-medium">
                          <h4>
                            Tamaño{" "}
                            <small>{` (Puede ser más de uno. Los gatos son tamaño
                            chico por default)`}</small>
                            :
                          </h4>
                          <div className="flex justify-start items-center gap-3 pt-4">
                            <div className="flex items-center">
                              <label htmlFor="" className="mr-2 ">
                                Chico
                              </label>
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                onChange={hiddenCheck}
                                disabled={check4 && check5 ? !check4 : check4}
                                // {...register("small", {})}
                              />
                            </div>

                            <div className="flex items-center">
                              <label htmlFor="" className="mr-2 ">
                                Mediano
                              </label>
                              <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" onChange={hiddenCheck2} disabled={check4 && check5 ? !check4 : check4} />
                            </div>
                            <div className="flex items-center">
                              <label htmlFor="" className="mr-2 ">
                                Grande
                              </label>
                              <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" onChange={hiddenCheck3} disabled={check4 && check5 ? !check4 : check4} />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label forlabel="lastName" className="block mb-2 text-lg font-medium">
                            ¿Cuántas mascotas podrías cuidar simultáneamente?:
                          </label>
                          <select
                            className="rounded-lg w-full p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868]  bg-[#F2F2F2]"
                            {...register("amount", {
                              required: {
                                value: true,
                                message: "Selecciona un número de mascotas",
                              },
                            })}
                          >
                            <option value="">--Selecciona un numero--</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            {/* <option value="otro">otro</option> */}
                          </select>
                          {errors.amount && <span className="text-red-500">{errors.amount.message}</span>}
                        </div>
                        <div className="sm:flex sm:justify-start sm:gap-10 lg:flex lg:justify-start lg:gap-14 mt-4">
                          <div className="flex justify-around item-center sm:gap-4">
                            <div className="pb-4">
                              <label forlabel="datetime" className="block mb-2 text-lg font-medium">
                                Check In:
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                    />
                                  </svg>
                                </div>
                                <input
                                  type="time"
                                  //step="1800"
                                  min="05:00"
                                  max="23:00"
                                  className=" rounded-lg w-full pl-10 p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868]  bg-[#F2F2F2]"
                                  placeholder="Ingresa tu Nombre"
                                  {...register("checkIn", {
                                    required: {
                                      value: true,
                                      message: "Campo requerido",
                                    },
                                  })}
                                />
                              </div>
                              {errors.checkIn && <span className="text-red-500">{errors.checkIn.message}</span>}
                            </div>
                            <div className="pb-4">
                              <label forlabel="datetime" className="block mb-2 text-lg font-medium">
                                Check Out:
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                    />
                                  </svg>
                                </div>
                                <input
                                  type="time"
                                  //step="1800"
                                  min="05:00"
                                  max="23:00"
                                  name="date"
                                  className=" rounded-lg w-full pl-10 p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868]  bg-[#F2F2F2]"
                                  placeholder="Ingresa tu Nombre"
                                  {...register("checkOut", {
                                    required: {
                                      value: true,
                                      message: "Campo requerido",
                                    },
                                  })}
                                />
                              </div>
                              {errors.checkOut && <span className="text-red-500">{errors.checkOut.message}</span>}
                            </div>
                          </div>
                        </div>
                        <p>[Se permiten horas de 5:00 am a 11:00 pm con intervalos de media hora]</p>
                        <div className="pt-4">
                          <div className="flex justify-start justify-items-center  items-center pb-2">
                            <label htmlFor="message" className="block mb-2 text-lg font-medium">
                              ¿Habitan mascotas en el sitio?
                            </label>
                            <div className="flex justify-center items-center gap-1 mb-2 pl-10">
                              <p>Marcar</p>
                              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" onChange={hiddenText} />
                            </div>
                          </div>
                          <textarea
                            id="message"
                            rows="6"
                            className=" rounded-lg w-full pl-10 p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                            placeholder={`- ¿Cómo es su temperamento?\n- ¿Qué le gusta hacer?\n- ¿Se lleva bien con otros animales?\n30 - 200 caracteres.`}
                            disabled={!textareaActive}
                            {...register("description", {
                              minLength: {
                                value: 30,
                                message: "Mínimo 30 caracteres",
                              },
                              maxLength: {
                                value: 200,
                                message: "Máximo 200 caracteres",
                              },
                            })}
                          ></textarea>
                          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                        </div>
                        <div className="pt-4">
                          <label htmlFor="message" className="block mb-2 text-lg font-medium">
                            Amenidades
                            <small> (Separa tus amenidades con un punto al final de cada una)</small>:
                          </label>

                          <textarea
                            id="message"
                            rows="6"
                            className=" rounded-lg w-full pl-10 p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                            placeholder={`Describe las particularidades que hacen de tu alojamiento un lugar ideal para las mascotas.\n\nEjemplo:\nTengo un patio amplio. La casa tiene doble puerta por lo que estarán muy seguros. Dormirá en un colchón para mascotas. Etc.`}
                            {...register("amenities", {
                              required: {
                                value: true,
                                message: "El campo es requerido",
                              },
                            })}
                          ></textarea>
                          {errors.amenities && <span className="text-red-500">{errors.amenities.message}</span>}
                        </div>
                        <div className="pt-4">
                          <label htmlFor="message" className="block mb-2 text-lg font-medium">
                            Restricciones
                            <small> (Separa tus restricciones con un punto al final de cada una)</small>:
                          </label>

                          <textarea
                            id="message"
                            rows="6"
                            className=" rounded-lg w-full pl-10 p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                            placeholder={`Describe las limitaciones que tendrán las mascotas hospedadas en tu alojamiento.\n\nEjemplo:\nNo se pueden subir a los muebles. No podré pasearlos por la cantidad de mascotas a los alrededores. Etc.`}
                            {...register("restrictions", {
                              required: {
                                value: true,
                                message: "El campo es requerido",
                              },
                            })}
                          ></textarea>
                          {errors.restrictions && <span className="text-red-500">{errors.restrictions.message}</span>}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="border-b-[2px] border-[#FF6868] pt-4">
                        <h2 className="text-3xl pb-2">Dirección</h2>
                      </div>
                      <div className="md:flex md:items-start">
                        <div className="flex justify-center items-center pt-10 md:pt-0 md:px-10 sm:pb-5 ">
                          <Image src={"/images/direction.png"} width={500} height={500} alt="Dirección" />
                        </div>
                        <div className="md:pt-5">
                          <div className="sm:flex  sm:items-center">
                            <div className="flex gap-4">
                              <div className="pb-4 pt-4 sm:pt-0 sm:w-full sm:mr-4 sm:pb-0 lg:pb-0">
                                <label forlabel="street" className="block mb-2 text-lg font-medium">
                                  Calle:
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
                                  <input
                                    type="text"
                                    name="street"
                                    className=" rounded-lg w-full p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                                    placeholder="Ingresa la Calle"
                                    {...register("street", {
                                      required: {
                                        value: true,
                                        message: "El campo es requerido",
                                      },
                                    })}
                                  />
                                </div>
                                {errors.street && <span className="text-red-500">{errors.street.message}</span>}
                              </div>
                              <div className="pb-4  pt-4 sm:w-52 sm:pb-0 lg:pb-0 sm:pt-0">
                                <label forlabel="exterior" className="block mb-2 text-lg font-medium">
                                  No. Ext:
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
                                  <input
                                    type="number"
                                    min="0"
                                    className=" rounded-lg w-full p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                                    placeholder="Número Exterior"
                                    {...register("externalNumber", {
                                      required: {
                                        value: true,
                                        message: "El campo es requerido",
                                      },
                                    })}
                                  />
                                </div>
                                {errors.externalNumber && <span className="text-red-500">{errors.externalNumber.message}</span>}
                              </div>
                              <div className="pb-4 pt-4 sm:w-52 sm:pb-0 lg:pb-0 sm:pt-0">
                                <label forlabel="interior" className="block mb-2 text-lg font-medium">
                                  No. Int:
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
                                  <input
                                    type="number"
                                    min="0"
                                    name="interior"
                                    className=" rounded-lg w-full p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2] [$>*::webkit-inner-spin-button"
                                    placeholder="Número Interior"
                                    {...register("internalNumber", {
                                      required: {
                                        value: true,
                                        message: "El campo es requerido",
                                      },
                                    })}
                                  />
                                </div>
                                {errors.internalNumber && <span className="text-red-500">{errors.internalNumber.message}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="pb-4 sm:pb-0 lg:pb-0">
                            <label forlabel="cologne" className="block mb-2 text-lg font-medium">
                              Colonia:
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
                              <input
                                type="text"
                                name="cologne"
                                className=" rounded-lg w-full p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                                placeholder="Ingresa tu Colonia"
                                {...register("neighbourhood", {
                                  required: {
                                    value: true,
                                    message: "El campo es requerido",
                                  },
                                })}
                              />
                            </div>
                            {errors.neighbourhood && <span className="text-red-500">{errors.neighbourhood.message}</span>}
                          </div>
                          <div className="sm:flex sm:gap-10 ">
                            <div className="sm:w-full">
                              <label forlabel="lastName" className="block mb-2 text-lg font-medium">
                                Estado:
                              </label>
                              <select
                                {...register("state", {
                                  required: {
                                    value: true,
                                    message: "Selecciona un estado",
                                  },
                                })}
                                className="rounded-lg w-full p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868]  bg-[#F2F2F2]"
                              >
                                <option value="">Estado</option>
                                {locations.map((item, index) => {
                                  return (
                                    <option key={index} value={item.estado}>
                                      {item.estado}
                                    </option>
                                  );
                                })}
                              </select>
                              {errors.state && <p className="text-[#2B2E4A]">{errors.state.message}</p>}
                            </div>
                            <div className="pt-4 sm:pt-0 sm:w-full">
                              <label forlabel="lastName" className="block mb-2 text-lg font-medium">
                                Ciudad:
                              </label>
                              <select
                                {...register("city", {
                                  required: {
                                    value: true,
                                    message: "Selecciona un municipio",
                                  },
                                })}
                                className="rounded-lg w-full p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868]  bg-[#F2F2F2]"
                              >
                                <option value="">Municipio</option>
                                {locations
                                  .filter((item) => item.estado === watch("state"))[0]
                                  ?.municipios.map((municipio, index) => {
                                    return (
                                      <option key={index} value={municipio}>
                                        {municipio}
                                      </option>
                                    );
                                  })}
                              </select>
                              {errors.city && <p className="text-[#2B2E4A]">{errors.city.message}</p>}
                            </div>
                          </div>
                          <div className="sm:flex sm:gap-10 sm:mt-5">
                            <div className="pb-4 pt-4 sm:pt-0">
                              <label forlabel="street" className="block mb-2 text-lg font-medium">
                                C.P:
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
                                <input
                                  type="number"
                                  min="0"
                                  className=" rounded-lg w-50 p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868]  bg-[#F2F2F2]"
                                  placeholder="Código Postal"
                                  {...register("postalCode", {
                                    required: {
                                      value: true,
                                      message: "El campo es requerido",
                                    },
                                  })}
                                />
                              </div>
                              {errors.postalCode && <span className="text-red-500">{errors.postalCode.message}</span>}
                            </div>
                            <div className="pb-4 sm:w-full">
                              <label forlabel="street" className="block mb-2 text-lg font-medium">
                                Entre calles / Esquina::
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
                                <input
                                  type="text"
                                  className=" rounded-lg w-full p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                                  {...register("streetsNearby", {
                                    required: {
                                      value: true,
                                      message: "El campo es requerido",
                                    },
                                  })}
                                />
                              </div>
                              {errors.streetsNearby && <span className="text-red-500">{errors.streetsNearby.message}</span>}
                            </div>
                          </div>
                          <div className="pt-4">
                            <label htmlFor="message" className="block mb-2 text-2xl font-medium">
                              Referencias
                            </label>
                            <textarea
                              rows="6"
                              className=" rounded-lg w-full pl-10 p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                              placeholder={"Ejemplo:\n- ¿Color de la casa?\n- ¿Color de la puerta / portón?\n- ¿Algún negocio cercano?"}
                              {...register("references", {
                                required: {
                                  value: true,
                                  message: "El campo es requerido",
                                },
                                maxLength: {
                                  value: 200,
                                  message: "Máximo 200 caracteres",
                                },
                              })}
                            ></textarea>
                            {errors.references && <span className="text-red-500">{errors.references.message}</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="border-b-[2px] border-[#FF6868] pt-4 pb-2">
                        <h2 className="text-3xl pb-2">Información financiera</h2>
                      </div>
                    </div>
                    <div className="lg:flex">
                      <div className="pt-4 md:pt-2">
                        <p className="text-lg lg:w-64 lg:mr-16">
                          Los costos por noche son los que tú recibirás netamente en tu cuenta bancaria al terminar el hospedaje de la mascota. Al fijar los precios, considera que{" "}
                          <strong>domus.com.mx</strong> agregará un porcentaje extra como cargo por impuestos, comisiones y mantenimiento de la plataforma.
                        </p>
                      </div>
                      <div className="md:w-full">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4">
                          <table className="w-full text-sm ">
                            <thead className="text-xs uppercase bg-[#2A2D49] text-white text-center ">
                              <tr>
                                {/* <th>Activar Costo</th> */}
                                <th scope="col" className="px-6 py-3">
                                  Mascota
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Tamaño
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Costo por noche
                                </th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              <tr className="bg-white border-b">
                                {/* <th>
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                {...register("small", {
                                  required: {
                                    value: true,
                                    message: "Selecciona un tamaño",
                                  },
                                })}
                              />
                            </th> */}
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                  Perro
                                </th>
                                <td className="px-6 py-4">Pequeño</td>
                                <td className="px-6 py-4">
                                  {" "}
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M12 1C11.4477 1 11 1.44772 11 2V3H10C8.3642 3 7.0588 3.60369 6.1691 4.57428C5.29413 5.52878 4.875 6.77845 4.875 8C4.875 9.22155 5.29413 10.4712 6.1691 11.4257C6.33335 11.6049 6.51177 11.7716 6.70382 11.9243C7.55205 12.5986 8.6662 13 10 13H11V19H10C9.17499 19 8.62271 18.7966 8.2422 18.5429C7.85544 18.2851 7.58511 17.9342 7.39443 17.5528C7.20178 17.1675 7.10048 16.7701 7.04889 16.4606C7.02329 16.307 7.00411 16.1512 6.99999 15.9953C6.99736 15.4454 6.55059 15 6 15C5.44771 15 5 15.4477 5 16C5.00003 16.0672 5.0024 16.1317 5.01035 16.2431C5.02006 16.3791 5.039 16.5668 5.07611 16.7894C5.14952 17.2299 5.29821 17.8325 5.60557 18.4472C5.91489 19.0658 6.39456 19.7149 7.1328 20.2071C7.8773 20.7034 8.82502 21 10 21H11V22C11 22.5523 11.4477 23 12 23C12.5523 23 13 22.5523 13 22V21H14C15.6358 21 16.9412 20.3963 17.8309 19.4257C18.7059 18.4712 19.125 17.2216 19.125 16C19.125 14.7784 18.7059 13.5288 17.8309 12.5743C16.9412 11.6037 15.6358 11 14 11H13V5H14C14.825 5 15.3773 5.20338 15.7578 5.45705C16.1446 5.71489 16.4149 6.06584 16.6056 6.44721C16.7982 6.8325 16.8995 7.22989 16.9511 7.5394C16.9767 7.69303 16.9959 7.84879 17 8.00465C17.0027 8.55467 17.4494 9 18 9C18.5458 9 19 8.54436 19 7.99898C18.9999 7.93212 18.9976 7.8677 18.9896 7.75688C18.9799 7.62092 18.961 7.43322 18.9239 7.2106C18.8505 6.77011 18.7018 6.1675 18.3944 5.55279C18.0851 4.93416 17.6054 4.28511 16.8672 3.79295C16.1227 3.29662 15.175 3 14 3H13V2C13 1.44772 12.5523 1 12 1ZM11 5H10C8.8858 5 8.1287 5.39631 7.6434 5.92572C7.14337 6.47122 6.875 7.22155 6.875 8C6.875 8.77845 7.14337 9.52878 7.6434 10.0743C8.1287 10.6037 8.8858 11 10 11H11V5ZM13 13V19H14C15.1142 19 15.8713 18.6037 16.3566 18.0743C16.8566 17.5288 17.125 16.7784 17.125 16C17.125 15.2216 16.8566 14.4712 16.3566 13.9257C15.8713 13.3963 15.1142 13 14 13H13Z"
                                          fill="#0F0F0F"
                                        />
                                      </svg>
                                    </div>
                                    <input
                                      type="number"
                                      min="0"
                                      className=" rounded-lg w-full pl-10 p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                                      placeholder="Ingresa tu Costo  $00.00"
                                      disabled={!check}
                                      {...register("price1", {
                                        pattern: {
                                          value: /^[0-9]+/,
                                          message: "El formato no es correcto",
                                        },
                                      })}
                                    />
                                  </div>
                                </td>
                              </tr>
                              <tr className="border-b bg-gray-50">
                                {/* <th>
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                {...register("medium", {
                                  required: {
                                    value: true,
                                    message: "Selecciona un tamaño",
                                  },
                                })}
                              />
                            </th> */}
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                  Perro
                                </th>
                                <td className="px-6 py-4">Mediano</td>
                                <td className="px-6 py-4">
                                  {" "}
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M12 1C11.4477 1 11 1.44772 11 2V3H10C8.3642 3 7.0588 3.60369 6.1691 4.57428C5.29413 5.52878 4.875 6.77845 4.875 8C4.875 9.22155 5.29413 10.4712 6.1691 11.4257C6.33335 11.6049 6.51177 11.7716 6.70382 11.9243C7.55205 12.5986 8.6662 13 10 13H11V19H10C9.17499 19 8.62271 18.7966 8.2422 18.5429C7.85544 18.2851 7.58511 17.9342 7.39443 17.5528C7.20178 17.1675 7.10048 16.7701 7.04889 16.4606C7.02329 16.307 7.00411 16.1512 6.99999 15.9953C6.99736 15.4454 6.55059 15 6 15C5.44771 15 5 15.4477 5 16C5.00003 16.0672 5.0024 16.1317 5.01035 16.2431C5.02006 16.3791 5.039 16.5668 5.07611 16.7894C5.14952 17.2299 5.29821 17.8325 5.60557 18.4472C5.91489 19.0658 6.39456 19.7149 7.1328 20.2071C7.8773 20.7034 8.82502 21 10 21H11V22C11 22.5523 11.4477 23 12 23C12.5523 23 13 22.5523 13 22V21H14C15.6358 21 16.9412 20.3963 17.8309 19.4257C18.7059 18.4712 19.125 17.2216 19.125 16C19.125 14.7784 18.7059 13.5288 17.8309 12.5743C16.9412 11.6037 15.6358 11 14 11H13V5H14C14.825 5 15.3773 5.20338 15.7578 5.45705C16.1446 5.71489 16.4149 6.06584 16.6056 6.44721C16.7982 6.8325 16.8995 7.22989 16.9511 7.5394C16.9767 7.69303 16.9959 7.84879 17 8.00465C17.0027 8.55467 17.4494 9 18 9C18.5458 9 19 8.54436 19 7.99898C18.9999 7.93212 18.9976 7.8677 18.9896 7.75688C18.9799 7.62092 18.961 7.43322 18.9239 7.2106C18.8505 6.77011 18.7018 6.1675 18.3944 5.55279C18.0851 4.93416 17.6054 4.28511 16.8672 3.79295C16.1227 3.29662 15.175 3 14 3H13V2C13 1.44772 12.5523 1 12 1ZM11 5H10C8.8858 5 8.1287 5.39631 7.6434 5.92572C7.14337 6.47122 6.875 7.22155 6.875 8C6.875 8.77845 7.14337 9.52878 7.6434 10.0743C8.1287 10.6037 8.8858 11 10 11H11V5ZM13 13V19H14C15.1142 19 15.8713 18.6037 16.3566 18.0743C16.8566 17.5288 17.125 16.7784 17.125 16C17.125 15.2216 16.8566 14.4712 16.3566 13.9257C15.8713 13.3963 15.1142 13 14 13H13Z"
                                          fill="#0F0F0F"
                                        />
                                      </svg>
                                    </div>
                                    <input
                                      type="number"
                                      min="0"
                                      className=" rounded-lg w-full pl-10 p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                                      placeholder="Ingresa tu Costo  $00.00"
                                      disabled={!check2}
                                      {...register("price2", {
                                        pattern: {
                                          value: /^[0-9]+/,
                                          message: "El formato no es correcto",
                                        },
                                      })}
                                    />
                                  </div>
                                </td>
                              </tr>
                              <tr className="bg-white border-b">
                                {/* <th>
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                {...register("big", {
                                  required: {
                                    value: true,
                                    message: "Selecciona un tamaño",
                                  },
                                })}
                              />
                            </th> */}
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                  Perro
                                </th>
                                <td className="px-6 py-4">Grande</td>
                                <td className="px-6 py-4">
                                  {" "}
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M12 1C11.4477 1 11 1.44772 11 2V3H10C8.3642 3 7.0588 3.60369 6.1691 4.57428C5.29413 5.52878 4.875 6.77845 4.875 8C4.875 9.22155 5.29413 10.4712 6.1691 11.4257C6.33335 11.6049 6.51177 11.7716 6.70382 11.9243C7.55205 12.5986 8.6662 13 10 13H11V19H10C9.17499 19 8.62271 18.7966 8.2422 18.5429C7.85544 18.2851 7.58511 17.9342 7.39443 17.5528C7.20178 17.1675 7.10048 16.7701 7.04889 16.4606C7.02329 16.307 7.00411 16.1512 6.99999 15.9953C6.99736 15.4454 6.55059 15 6 15C5.44771 15 5 15.4477 5 16C5.00003 16.0672 5.0024 16.1317 5.01035 16.2431C5.02006 16.3791 5.039 16.5668 5.07611 16.7894C5.14952 17.2299 5.29821 17.8325 5.60557 18.4472C5.91489 19.0658 6.39456 19.7149 7.1328 20.2071C7.8773 20.7034 8.82502 21 10 21H11V22C11 22.5523 11.4477 23 12 23C12.5523 23 13 22.5523 13 22V21H14C15.6358 21 16.9412 20.3963 17.8309 19.4257C18.7059 18.4712 19.125 17.2216 19.125 16C19.125 14.7784 18.7059 13.5288 17.8309 12.5743C16.9412 11.6037 15.6358 11 14 11H13V5H14C14.825 5 15.3773 5.20338 15.7578 5.45705C16.1446 5.71489 16.4149 6.06584 16.6056 6.44721C16.7982 6.8325 16.8995 7.22989 16.9511 7.5394C16.9767 7.69303 16.9959 7.84879 17 8.00465C17.0027 8.55467 17.4494 9 18 9C18.5458 9 19 8.54436 19 7.99898C18.9999 7.93212 18.9976 7.8677 18.9896 7.75688C18.9799 7.62092 18.961 7.43322 18.9239 7.2106C18.8505 6.77011 18.7018 6.1675 18.3944 5.55279C18.0851 4.93416 17.6054 4.28511 16.8672 3.79295C16.1227 3.29662 15.175 3 14 3H13V2C13 1.44772 12.5523 1 12 1ZM11 5H10C8.8858 5 8.1287 5.39631 7.6434 5.92572C7.14337 6.47122 6.875 7.22155 6.875 8C6.875 8.77845 7.14337 9.52878 7.6434 10.0743C8.1287 10.6037 8.8858 11 10 11H11V5ZM13 13V19H14C15.1142 19 15.8713 18.6037 16.3566 18.0743C16.8566 17.5288 17.125 16.7784 17.125 16C17.125 15.2216 16.8566 14.4712 16.3566 13.9257C15.8713 13.3963 15.1142 13 14 13H13Z"
                                          fill="#0F0F0F"
                                        />
                                      </svg>
                                    </div>
                                    <input
                                      type="number"
                                      min="0"
                                      className=" rounded-lg w-full pl-10 p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                                      placeholder="Ingresa tu Costo  $00.00"
                                      disabled={!check3}
                                      {...register("price3", {
                                        pattern: {
                                          value: /^[0-9]+/,
                                          message: "El formato no es correcto",
                                        },
                                      })}
                                    />
                                  </div>
                                </td>
                              </tr>
                              <tr className="border-b bg-gray-50">
                                {/* <th>
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                {...register("cat", {
                                  required: {
                                    value: true,
                                    message: "Selecciona un tamaño",
                                  },
                                })}
                              />
                            </th> */}
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                  Gato
                                </th>
                                <td className="px-6 py-4">-----</td>
                                <td className="px-6 py-4">
                                  {" "}
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M12 1C11.4477 1 11 1.44772 11 2V3H10C8.3642 3 7.0588 3.60369 6.1691 4.57428C5.29413 5.52878 4.875 6.77845 4.875 8C4.875 9.22155 5.29413 10.4712 6.1691 11.4257C6.33335 11.6049 6.51177 11.7716 6.70382 11.9243C7.55205 12.5986 8.6662 13 10 13H11V19H10C9.17499 19 8.62271 18.7966 8.2422 18.5429C7.85544 18.2851 7.58511 17.9342 7.39443 17.5528C7.20178 17.1675 7.10048 16.7701 7.04889 16.4606C7.02329 16.307 7.00411 16.1512 6.99999 15.9953C6.99736 15.4454 6.55059 15 6 15C5.44771 15 5 15.4477 5 16C5.00003 16.0672 5.0024 16.1317 5.01035 16.2431C5.02006 16.3791 5.039 16.5668 5.07611 16.7894C5.14952 17.2299 5.29821 17.8325 5.60557 18.4472C5.91489 19.0658 6.39456 19.7149 7.1328 20.2071C7.8773 20.7034 8.82502 21 10 21H11V22C11 22.5523 11.4477 23 12 23C12.5523 23 13 22.5523 13 22V21H14C15.6358 21 16.9412 20.3963 17.8309 19.4257C18.7059 18.4712 19.125 17.2216 19.125 16C19.125 14.7784 18.7059 13.5288 17.8309 12.5743C16.9412 11.6037 15.6358 11 14 11H13V5H14C14.825 5 15.3773 5.20338 15.7578 5.45705C16.1446 5.71489 16.4149 6.06584 16.6056 6.44721C16.7982 6.8325 16.8995 7.22989 16.9511 7.5394C16.9767 7.69303 16.9959 7.84879 17 8.00465C17.0027 8.55467 17.4494 9 18 9C18.5458 9 19 8.54436 19 7.99898C18.9999 7.93212 18.9976 7.8677 18.9896 7.75688C18.9799 7.62092 18.961 7.43322 18.9239 7.2106C18.8505 6.77011 18.7018 6.1675 18.3944 5.55279C18.0851 4.93416 17.6054 4.28511 16.8672 3.79295C16.1227 3.29662 15.175 3 14 3H13V2C13 1.44772 12.5523 1 12 1ZM11 5H10C8.8858 5 8.1287 5.39631 7.6434 5.92572C7.14337 6.47122 6.875 7.22155 6.875 8C6.875 8.77845 7.14337 9.52878 7.6434 10.0743C8.1287 10.6037 8.8858 11 10 11H11V5ZM13 13V19H14C15.1142 19 15.8713 18.6037 16.3566 18.0743C16.8566 17.5288 17.125 16.7784 17.125 16C17.125 15.2216 16.8566 14.4712 16.3566 13.9257C15.8713 13.3963 15.1142 13 14 13H13Z"
                                          fill="#0F0F0F"
                                        />
                                      </svg>
                                    </div>
                                    <input
                                      type="number"
                                      min="0"
                                      className=" rounded-lg w-full pl-10 p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                                      placeholder="Ingresa tu Costo  $00.00"
                                      disabled={!check4}
                                      {...register("price4", {
                                        pattern: {
                                          value: /^[0-9]+/,
                                          message: "El formato no es correcto",
                                        },
                                      })}
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div>
                          <div className="sm:flex  mt-5 lg:flex sm:gap-10">
                            <div className="pb-4 sm:w-full">
                              <label forlabel="card" className="block mb-2 text-lg font-medium">
                                Titular de la cuenta:
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
                                <input
                                  type="text"
                                  name="card"
                                  className=" rounded-lg w-full p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868]  bg-[#F2F2F2]"
                                  placeholder="Nombre completo del Titular"
                                  {...register("name", {
                                    required: {
                                      value: true,
                                      message: "El campo es requerido",
                                    },
                                  })}
                                />
                              </div>
                              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                            </div>
                            <div className="pb-4 sm:w-full">
                              <label forlabel="card" className="block mb-2 text-lg font-medium">
                                Número de cuenta:
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
                                <input
                                  type="number"
                                  min="0"
                                  name="card"
                                  className=" rounded-lg w-full p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868]  bg-[#F2F2F2]"
                                  placeholder="Ingresa el Número de Cuenta"
                                  {...register("number", {
                                    required: {
                                      value: true,
                                      message: "El campo es requerido",
                                    },
                                    minLength: {
                                      value: 20,
                                      message: "Mínimo 20 caracteres",
                                    },
                                    maxLength: {
                                      value: 20,
                                      message: "Máximo 20 caracteres",
                                    },
                                    pattern: {
                                      value: /[0-9]/,
                                      message: "El formato no es correcto",
                                    },
                                  })}
                                />
                              </div>
                              {errors.number && <span className="text-red-500">{errors.number.message}</span>}
                            </div>
                          </div>
                          <div className="sm:flex sm:gap-10">
                            <div className="pb-4 sm:w-full">
                              <label forlabel="lastName" className="block mb-2 text-lg font-medium">
                                Banco:
                              </label>

                              <select
                                className="rounded-lg w-full p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868]  bg-[#F2F2F2]"
                                {...register("bank", {
                                  required: {
                                    value: true,
                                    message: "El campo es requerido",
                                  },
                                })}
                              >
                                {bank.map((item, index) => {
                                  return (
                                    <option key={index} value={item.marca}>
                                      {item.marca}
                                    </option>
                                  );
                                })}
                              </select>
                              {errors.bank && <span className="text-red-500">{errors.bank.message}</span>}
                            </div>
                            <div className="pb-4 sm:w-full">
                              <label forlabel="card" className="block mb-2 text-lg font-medium">
                                CLABE interbancaria:
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
                                <input
                                  type="number"
                                  name="card"
                                  min="0"
                                  className=" rounded-lg w-full p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868]  bg-[#F2F2F2]"
                                  placeholder=" Ingresa tu clave interbancaria"
                                  {...register("clabe", {
                                    required: {
                                      value: true,
                                      message: "El campo es requerido",
                                    },
                                    minLength: {
                                      value: 18,
                                      message: "Mínimo 18 caracteres",
                                    },
                                    maxLength: {
                                      value: 18,
                                      message: "Máximo 18 caracteres",
                                    },
                                  })}
                                />
                              </div>
                              {errors.clabe && <span className="text-red-500">{errors.clabe.message}</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-6 sm:flex sm:justify-around items-center gap-4">
                      <Link
                        href="/"
                        className="text-center px-6 py-3 w-full border-[2px] border-[#2B2E4A] rounded-full md:font-semibold mb-3 sm:mt-0 md:mb-0 lg:mb-0 sm:mb-0 hover:scale-[102%] transition"
                      >
                        Cancelar
                      </Link>
                      <button type="submit" className="px-6 py-3.5 w-full text-base md:font-bold text-white bg-[#FF6868] hover:scale-[102%] rounded-full text-center transition">
                        Guardar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
