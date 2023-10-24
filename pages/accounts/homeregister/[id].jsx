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
        .then((resp) => resp.json())
        .then((resp) => {
          if (!resp.data.accommodation) {
            setUser(resp.data);
          } else {
            router.push("/");
          }
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
    const amenities = data.amenities;
    const stringAmenities = amenities.split(".");
    const ListAmenities = stringAmenities.map((p) => p.trim());
    const clearAmenidades = ListAmenities.filter(Boolean);
    const arrayAmenidades = clearAmenidades.map((clear) =>
      clear.replace(/(\r\n|\n|\r)/gm, "")
    );

    const restrictions = data.restrictions;
    const stringRestrictions = restrictions.split(".");
    const ListRestrictions = stringRestrictions.map((p) => p.trim());
    const clearRestrictions = ListRestrictions.filter(Boolean);
    const arrayRestrictions = clearRestrictions.map((clear) =>
      clear.replace(/(\r\n|\n|\r)/gm, "")
    );

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
      description: data.description === "" || !textareaActive ? "N/A" : "",
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

    fetch(
      `${urlFetch}/accommodation/${JSON.parse(atob(token.split(".")[1])).id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          toast.success("Alojamiento creado con éxito", { autoClose: 2000 });
          console.log("api resp -->", response);
          // setTimeout(
          //   () =>
          //     router.push(
          //       `/profiles/${JSON.parse(atob(token.split(".")[1])).id}`
          //     ),
          //   2000
          // );
        } else {
          toast.error(`${response.message}`);
        }
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
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {token && user && (
        <>
          <div className="mt-32 mb-24">
            <div className="bg-[#FF6868] py-4 text-center">
              <h1 className="text-white text-3xl font-semibold  font-[Raleway]">
                Agregar Alojamiento
              </h1>
            </div>

            <div className="lg:flex lg:justify-center">
              <div className="border-[2px] py-4 mx-4 px-2 rounded-lg mt-10 lg:max-w-7xl bg-white drop-shadow-xl  font-[Nunito] font-medium">
                <div className="border-b-[2px] border-[#FF6868]">
                  <h2 className="text-2xl py-2 ">
                    Características del Alojamiento
                  </h2>
                </div>
                <div className=" md:items-center md:w-full">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="px-2 pt-3  md:m-auto m-auto "
                  >
                    <div className="md:flex">
                      <div className="flex justify-center flex-col sm:flex-row items-center pt-10 lg:px-10 text-center gap-4 sm:gap-2 sm:items-start md:flex-col md:justify-start md:items-center md:gap-5">
                        <div className="flex flex-col justify-center items-center">
                          <svg
                            width="168"
                            height="168"
                            viewBox="0 0 168 168"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="84"
                              cy="84"
                              r="83.5"
                              fill="white"
                              stroke="#CFD8DC"
                            />
                            <circle cx="84" cy="84" r="72" fill="#E0E0E0" />
                            <path
                              d="M84 90.25C86.7614 90.25 89 88.0114 89 85.25C89 82.4886 86.7614 80.25 84 80.25C81.2386 80.25 79 82.4886 79 85.25C79 88.0114 81.2386 90.25 84 90.25Z"
                              fill="#455A64"
                            />
                            <path
                              d="M97.75 75.25H93.1406C92.9062 75.25 92.6156 75.0984 92.3891 74.8594L90.3625 71.6609C90.3305 71.6102 90.2947 71.5619 90.2555 71.5164C89.5555 70.7 88.6094 70.25 87.5938 70.25H80.4062C79.3906 70.25 78.4445 70.7 77.7445 71.5164C77.7053 71.5619 77.6695 71.6102 77.6375 71.6609L75.6109 74.8641C75.4375 75.0531 75.1937 75.2547 74.9375 75.2547V74.6297C74.9375 74.2982 74.8058 73.9802 74.5714 73.7458C74.337 73.5114 74.019 73.3797 73.6875 73.3797H71.8125C71.481 73.3797 71.163 73.5114 70.9286 73.7458C70.6942 73.9802 70.5625 74.2982 70.5625 74.6297V75.2547H70.25C69.2558 75.2557 68.3025 75.6511 67.5995 76.3542C66.8965 77.0572 66.501 78.0104 66.5 79.0047V94C66.501 94.9942 66.8965 95.9475 67.5995 96.6505C68.3025 97.3535 69.2558 97.749 70.25 97.75H97.75C98.7442 97.749 99.6975 97.3535 100.401 96.6505C101.104 95.9475 101.499 94.9942 101.5 94V79C101.499 78.0058 101.104 77.0525 100.401 76.3495C99.6975 75.6465 98.7442 75.251 97.75 75.25ZM84 92.75C82.5166 92.75 81.0666 92.3101 79.8332 91.486C78.5999 90.6619 77.6386 89.4906 77.0709 88.1201C76.5032 86.7497 76.3547 85.2417 76.6441 83.7868C76.9335 82.332 77.6478 80.9956 78.6967 79.9467C79.7456 78.8978 81.082 78.1835 82.5368 77.8941C83.9917 77.6047 85.4997 77.7532 86.8701 78.3209C88.2406 78.8886 89.4119 79.8499 90.236 81.0832C91.0601 82.3166 91.5 83.7666 91.5 85.25C91.4977 87.2384 90.7068 89.1448 89.3008 90.5508C87.8948 91.9568 85.9884 92.7477 84 92.75V92.75Z"
                              fill="#455A64"
                            />
                            <circle
                              cx="84"
                              cy="84"
                              r="72"
                              fill="#424242"
                              fillOpacity="0.7"
                            />
                            <path
                              d="M84 63.75C85.6569 63.75 87 62.4069 87 60.75C87 59.0931 85.6569 57.75 84 57.75C82.3431 57.75 81 59.0931 81 60.75C81 62.4069 82.3431 63.75 84 63.75Z"
                              fill="white"
                            />
                            <path
                              d="M92.25 54.75H89.4844C89.3438 54.75 89.1694 54.6591 89.0334 54.5156L87.8175 52.5966C87.7983 52.5661 87.7768 52.5371 87.7533 52.5098C87.3333 52.02 86.7656 51.75 86.1562 51.75H81.8438C81.2344 51.75 80.6667 52.02 80.2467 52.5098C80.2232 52.5371 80.2017 52.5661 80.1825 52.5966L78.9666 54.5184C78.8625 54.6319 78.7162 54.7528 78.5625 54.7528V54.3778C78.5625 54.1789 78.4835 53.9881 78.3428 53.8475C78.2022 53.7068 78.0114 53.6278 77.8125 53.6278H76.6875C76.4886 53.6278 76.2978 53.7068 76.1572 53.8475C76.0165 53.9881 75.9375 54.1789 75.9375 54.3778V54.7528H75.75C75.1535 54.7534 74.5815 54.9907 74.1597 55.4125C73.7379 55.8343 73.5006 56.4063 73.5 57.0028V66C73.5006 66.5965 73.7379 67.1685 74.1597 67.5903C74.5815 68.0121 75.1535 68.2494 75.75 68.25H92.25C92.8465 68.2494 93.4185 68.0121 93.8403 67.5903C94.2621 67.1685 94.4994 66.5965 94.5 66V57C94.4994 56.4035 94.2621 55.8315 93.8403 55.4097C93.4185 54.9879 92.8465 54.7506 92.25 54.75ZM84 65.25C83.11 65.25 82.24 64.9861 81.4999 64.4916C80.7599 63.9971 80.1831 63.2943 79.8425 62.4721C79.5019 61.6498 79.4128 60.745 79.5865 59.8721C79.7601 58.9992 80.1887 58.1974 80.818 57.568C81.4474 56.9387 82.2492 56.5101 83.1221 56.3365C83.995 56.1628 84.8998 56.2519 85.7221 56.5925C86.5443 56.9331 87.2471 57.5099 87.7416 58.2499C88.2361 58.99 88.5 59.86 88.5 60.75C88.4986 61.9431 88.0241 63.0869 87.1805 63.9305C86.3369 64.7741 85.1931 65.2486 84 65.25V65.25Z"
                              fill="white"
                            />
                            <path
                              d="M38.6058 92.83H34.3498L33.5658 95H32.2218L35.7498 85.298H37.2198L40.7338 95H39.3898L38.6058 92.83ZM38.2418 91.794L36.4778 86.866L34.7138 91.794H38.2418ZM41.7954 91.15C41.7954 90.3567 41.954 89.666 42.2714 89.078C42.5887 88.4807 43.0274 88.0187 43.5874 87.692C44.1567 87.3653 44.8054 87.202 45.5334 87.202C46.476 87.202 47.2507 87.4307 47.8574 87.888C48.4734 88.3453 48.8794 88.98 49.0754 89.792H47.7034C47.5727 89.3253 47.316 88.9567 46.9334 88.686C46.56 88.4153 46.0934 88.28 45.5334 88.28C44.8054 88.28 44.2174 88.532 43.7694 89.036C43.3214 89.5307 43.0974 90.2353 43.0974 91.15C43.0974 92.074 43.3214 92.788 43.7694 93.292C44.2174 93.796 44.8054 94.048 45.5334 94.048C46.0934 94.048 46.56 93.9173 46.9334 93.656C47.3067 93.3947 47.5634 93.0213 47.7034 92.536H49.0754C48.87 93.32 48.4594 93.95 47.8434 94.426C47.2274 94.8927 46.4574 95.126 45.5334 95.126C44.8054 95.126 44.1567 94.9627 43.5874 94.636C43.0274 94.3093 42.5887 93.8473 42.2714 93.25C41.954 92.6527 41.7954 91.9527 41.7954 91.15ZM52.3293 88.378V92.9C52.3293 93.2733 52.4086 93.5393 52.5673 93.698C52.7259 93.8473 53.0013 93.922 53.3933 93.922H54.3313V95H53.1833C52.4739 95 51.9419 94.8367 51.5873 94.51C51.2326 94.1833 51.0553 93.6467 51.0553 92.9V88.378H50.0613V87.328H51.0553V85.396H52.3293V87.328H54.3313V88.378H52.3293ZM62.6789 87.328V95H61.4049V93.866C61.1622 94.258 60.8215 94.566 60.3829 94.79C59.9535 95.0047 59.4775 95.112 58.9549 95.112C58.3575 95.112 57.8209 94.9907 57.3449 94.748C56.8689 94.496 56.4909 94.1227 56.2109 93.628C55.9402 93.1333 55.8049 92.5313 55.8049 91.822V87.328H57.0649V91.654C57.0649 92.41 57.2562 92.9933 57.6389 93.404C58.0215 93.8053 58.5442 94.006 59.2069 94.006C59.8882 94.006 60.4249 93.796 60.8169 93.376C61.2089 92.956 61.4049 92.3447 61.4049 91.542V87.328H62.6789ZM64.354 91.136C64.354 90.352 64.5126 89.666 64.83 89.078C65.1473 88.4807 65.5813 88.0187 66.132 87.692C66.692 87.3653 67.3126 87.202 67.994 87.202C68.666 87.202 69.2493 87.3467 69.744 87.636C70.2386 87.9253 70.6073 88.2893 70.85 88.728V87.328H72.138V95H70.85V93.572C70.598 94.02 70.22 94.3933 69.716 94.692C69.2213 94.9813 68.6426 95.126 67.98 95.126C67.2986 95.126 66.6826 94.958 66.132 94.622C65.5813 94.286 65.1473 93.8147 64.83 93.208C64.5126 92.6013 64.354 91.9107 64.354 91.136ZM70.85 91.15C70.85 90.5713 70.7333 90.0673 70.5 89.638C70.2666 89.2087 69.9493 88.882 69.548 88.658C69.156 88.4247 68.722 88.308 68.246 88.308C67.77 88.308 67.336 88.42 66.944 88.644C66.552 88.868 66.2393 89.1947 66.006 89.624C65.7726 90.0533 65.656 90.5573 65.656 91.136C65.656 91.724 65.7726 92.2373 66.006 92.676C66.2393 93.1053 66.552 93.4367 66.944 93.67C67.336 93.894 67.77 94.006 68.246 94.006C68.722 94.006 69.156 93.894 69.548 93.67C69.9493 93.4367 70.2666 93.1053 70.5 92.676C70.7333 92.2373 70.85 91.7287 70.85 91.15ZM75.5649 84.64V95H74.2909V84.64H75.5649ZM78.3942 86.082C78.1515 86.082 77.9462 85.998 77.7782 85.83C77.6102 85.662 77.5262 85.4567 77.5262 85.214C77.5262 84.9713 77.6102 84.766 77.7782 84.598C77.9462 84.43 78.1515 84.346 78.3942 84.346C78.6275 84.346 78.8235 84.43 78.9822 84.598C79.1502 84.766 79.2342 84.9713 79.2342 85.214C79.2342 85.4567 79.1502 85.662 78.9822 85.83C78.8235 85.998 78.6275 86.082 78.3942 86.082ZM79.0102 87.328V95H77.7362V87.328H79.0102ZM82.1335 93.95H85.8995V95H80.6775V93.95L84.4015 88.364H80.7055V87.328H85.8715V88.364L82.1335 93.95ZM87.0766 91.136C87.0766 90.352 87.2353 89.666 87.5526 89.078C87.8699 88.4807 88.3039 88.0187 88.8546 87.692C89.4146 87.3653 90.0353 87.202 90.7166 87.202C91.3886 87.202 91.9719 87.3467 92.4666 87.636C92.9613 87.9253 93.3299 88.2893 93.5726 88.728V87.328H94.8606V95H93.5726V93.572C93.3206 94.02 92.9426 94.3933 92.4386 94.692C91.9439 94.9813 91.3653 95.126 90.7026 95.126C90.0213 95.126 89.4053 94.958 88.8546 94.622C88.3039 94.286 87.8699 93.8147 87.5526 93.208C87.2353 92.6013 87.0766 91.9107 87.0766 91.136ZM93.5726 91.15C93.5726 90.5713 93.4559 90.0673 93.2226 89.638C92.9893 89.2087 92.6719 88.882 92.2706 88.658C91.8786 88.4247 91.4446 88.308 90.9686 88.308C90.4926 88.308 90.0586 88.42 89.6666 88.644C89.2746 88.868 88.9619 89.1947 88.7286 89.624C88.4953 90.0533 88.3786 90.5573 88.3786 91.136C88.3786 91.724 88.4953 92.2373 88.7286 92.676C88.9619 93.1053 89.2746 93.4367 89.6666 93.67C90.0586 93.894 90.4926 94.006 90.9686 94.006C91.4446 94.006 91.8786 93.894 92.2706 93.67C92.6719 93.4367 92.9893 93.1053 93.2226 92.676C93.4559 92.2373 93.5726 91.7287 93.5726 91.15ZM98.2875 88.574C98.5115 88.1353 98.8289 87.7947 99.2395 87.552C99.6595 87.3093 100.168 87.188 100.766 87.188V88.504H100.43C99.0015 88.504 98.2875 89.2787 98.2875 90.828V95H97.0135V87.328H98.2875V88.574ZM109.091 88.378H107.481V95H106.207V88.378H105.213V87.328H106.207V86.782C106.207 85.9233 106.426 85.298 106.865 84.906C107.313 84.5047 108.027 84.304 109.007 84.304V85.368C108.447 85.368 108.05 85.48 107.817 85.704C107.593 85.9187 107.481 86.278 107.481 86.782V87.328H109.091V88.378ZM113.922 95.126C113.203 95.126 112.55 94.9627 111.962 94.636C111.383 94.3093 110.926 93.8473 110.59 93.25C110.263 92.6433 110.1 91.9433 110.1 91.15C110.1 90.366 110.268 89.6753 110.604 89.078C110.949 88.4713 111.416 88.0093 112.004 87.692C112.592 87.3653 113.25 87.202 113.978 87.202C114.706 87.202 115.364 87.3653 115.952 87.692C116.54 88.0093 117.002 88.4667 117.338 89.064C117.683 89.6613 117.856 90.3567 117.856 91.15C117.856 91.9433 117.679 92.6433 117.324 93.25C116.979 93.8473 116.507 94.3093 115.91 94.636C115.313 94.9627 114.65 95.126 113.922 95.126ZM113.922 94.006C114.379 94.006 114.809 93.8987 115.21 93.684C115.611 93.4693 115.933 93.1473 116.176 92.718C116.428 92.2887 116.554 91.766 116.554 91.15C116.554 90.534 116.433 90.0113 116.19 89.582C115.947 89.1527 115.63 88.8353 115.238 88.63C114.846 88.4153 114.421 88.308 113.964 88.308C113.497 88.308 113.068 88.4153 112.676 88.63C112.293 88.8353 111.985 89.1527 111.752 89.582C111.519 90.0113 111.402 90.534 111.402 91.15C111.402 91.7753 111.514 92.3027 111.738 92.732C111.971 93.1613 112.279 93.4833 112.662 93.698C113.045 93.9033 113.465 94.006 113.922 94.006ZM121.085 88.378V92.9C121.085 93.2733 121.164 93.5393 121.323 93.698C121.482 93.8473 121.757 93.922 122.149 93.922H123.087V95H121.939C121.23 95 120.698 94.8367 120.343 94.51C119.988 94.1833 119.811 93.6467 119.811 92.9V88.378H118.817V87.328H119.811V85.396H121.085V87.328H123.087V88.378H121.085ZM127.977 95.126C127.258 95.126 126.605 94.9627 126.017 94.636C125.438 94.3093 124.981 93.8473 124.645 93.25C124.318 92.6433 124.155 91.9433 124.155 91.15C124.155 90.366 124.323 89.6753 124.659 89.078C125.004 88.4713 125.471 88.0093 126.059 87.692C126.647 87.3653 127.305 87.202 128.033 87.202C128.761 87.202 129.419 87.3653 130.007 87.692C130.595 88.0093 131.057 88.4667 131.393 89.064C131.738 89.6613 131.911 90.3567 131.911 91.15C131.911 91.9433 131.733 92.6433 131.379 93.25C131.033 93.8473 130.562 94.3093 129.965 94.636C129.367 94.9627 128.705 95.126 127.977 95.126ZM127.977 94.006C128.434 94.006 128.863 93.8987 129.265 93.684C129.666 93.4693 129.988 93.1473 130.231 92.718C130.483 92.2887 130.609 91.766 130.609 91.15C130.609 90.534 130.487 90.0113 130.245 89.582C130.002 89.1527 129.685 88.8353 129.293 88.63C128.901 88.4153 128.476 88.308 128.019 88.308C127.552 88.308 127.123 88.4153 126.731 88.63C126.348 88.8353 126.04 89.1527 125.807 89.582C125.573 90.0113 125.457 90.534 125.457 91.15C125.457 91.7753 125.569 92.3027 125.793 92.732C126.026 93.1613 126.334 93.4833 126.717 93.698C127.099 93.9033 127.519 94.006 127.977 94.006ZM56.2329 111.136C56.2329 110.352 56.3915 109.666 56.7089 109.078C57.0262 108.481 57.4602 108.019 58.0109 107.692C58.5709 107.365 59.1962 107.202 59.8869 107.202C60.4842 107.202 61.0395 107.342 61.5529 107.622C62.0662 107.893 62.4582 108.252 62.7289 108.7V104.64H64.0169V115H62.7289V113.558C62.4769 114.015 62.1035 114.393 61.6089 114.692C61.1142 114.981 60.5355 115.126 59.8729 115.126C59.1915 115.126 58.5709 114.958 58.0109 114.622C57.4602 114.286 57.0262 113.815 56.7089 113.208C56.3915 112.601 56.2329 111.911 56.2329 111.136ZM62.7289 111.15C62.7289 110.571 62.6122 110.067 62.3789 109.638C62.1455 109.209 61.8282 108.882 61.4269 108.658C61.0349 108.425 60.6009 108.308 60.1249 108.308C59.6489 108.308 59.2149 108.42 58.8229 108.644C58.4309 108.868 58.1182 109.195 57.8849 109.624C57.6515 110.053 57.5349 110.557 57.5349 111.136C57.5349 111.724 57.6515 112.237 57.8849 112.676C58.1182 113.105 58.4309 113.437 58.8229 113.67C59.2149 113.894 59.6489 114.006 60.1249 114.006C60.6009 114.006 61.0349 113.894 61.4269 113.67C61.8282 113.437 62.1455 113.105 62.3789 112.676C62.6122 112.237 62.7289 111.729 62.7289 111.15ZM73.1698 110.87C73.1698 111.113 73.1558 111.369 73.1278 111.64H66.9958C67.0425 112.396 67.2991 112.989 67.7658 113.418C68.2418 113.838 68.8158 114.048 69.4878 114.048C70.0385 114.048 70.4958 113.922 70.8598 113.67C71.2331 113.409 71.4945 113.063 71.6438 112.634H73.0158C72.8105 113.371 72.3998 113.973 71.7838 114.44C71.1678 114.897 70.4025 115.126 69.4878 115.126C68.7598 115.126 68.1065 114.963 67.5278 114.636C66.9585 114.309 66.5105 113.847 66.1838 113.25C65.8571 112.643 65.6938 111.943 65.6938 111.15C65.6938 110.357 65.8525 109.661 66.1698 109.064C66.4871 108.467 66.9305 108.009 67.4998 107.692C68.0785 107.365 68.7411 107.202 69.4878 107.202C70.2158 107.202 70.8598 107.361 71.4198 107.678C71.9798 107.995 72.4091 108.434 72.7078 108.994C73.0158 109.545 73.1698 110.17 73.1698 110.87ZM71.8538 110.604C71.8538 110.119 71.7465 109.703 71.5318 109.358C71.3171 109.003 71.0231 108.737 70.6498 108.56C70.2858 108.373 69.8798 108.28 69.4318 108.28C68.7878 108.28 68.2371 108.485 67.7798 108.896C67.3318 109.307 67.0751 109.876 67.0098 110.604H71.8538ZM79.8579 108.742C80.1099 108.303 80.4832 107.939 80.9779 107.65C81.4819 107.351 82.0652 107.202 82.7279 107.202C83.4092 107.202 84.0252 107.365 84.5759 107.692C85.1359 108.019 85.5745 108.481 85.8919 109.078C86.2092 109.666 86.3679 110.352 86.3679 111.136C86.3679 111.911 86.2092 112.601 85.8919 113.208C85.5745 113.815 85.1359 114.286 84.5759 114.622C84.0252 114.958 83.4092 115.126 82.7279 115.126C82.0745 115.126 81.4959 114.981 80.9919 114.692C80.4972 114.393 80.1192 114.025 79.8579 113.586V118.64H78.5839V107.328H79.8579V108.742ZM85.0659 111.136C85.0659 110.557 84.9492 110.053 84.7159 109.624C84.4825 109.195 84.1652 108.868 83.7639 108.644C83.3719 108.42 82.9379 108.308 82.4619 108.308C81.9952 108.308 81.5612 108.425 81.1599 108.658C80.7679 108.882 80.4505 109.213 80.2079 109.652C79.9745 110.081 79.8579 110.581 79.8579 111.15C79.8579 111.729 79.9745 112.237 80.2079 112.676C80.4505 113.105 80.7679 113.437 81.1599 113.67C81.5612 113.894 81.9952 114.006 82.4619 114.006C82.9379 114.006 83.3719 113.894 83.7639 113.67C84.1652 113.437 84.4825 113.105 84.7159 112.676C84.9492 112.237 85.0659 111.724 85.0659 111.136ZM95.0448 110.87C95.0448 111.113 95.0308 111.369 95.0028 111.64H88.8708C88.9175 112.396 89.1741 112.989 89.6408 113.418C90.1168 113.838 90.6908 114.048 91.3628 114.048C91.9135 114.048 92.3708 113.922 92.7348 113.67C93.1081 113.409 93.3695 113.063 93.5188 112.634H94.8908C94.6855 113.371 94.2748 113.973 93.6588 114.44C93.0428 114.897 92.2775 115.126 91.3628 115.126C90.6348 115.126 89.9815 114.963 89.4028 114.636C88.8335 114.309 88.3855 113.847 88.0588 113.25C87.7321 112.643 87.5688 111.943 87.5688 111.15C87.5688 110.357 87.7275 109.661 88.0448 109.064C88.3621 108.467 88.8055 108.009 89.3748 107.692C89.9535 107.365 90.6161 107.202 91.3628 107.202C92.0908 107.202 92.7348 107.361 93.2948 107.678C93.8548 107.995 94.2841 108.434 94.5828 108.994C94.8908 109.545 95.0448 110.17 95.0448 110.87ZM93.7288 110.604C93.7288 110.119 93.6215 109.703 93.4068 109.358C93.1921 109.003 92.8981 108.737 92.5248 108.56C92.1608 108.373 91.7548 108.28 91.3068 108.28C90.6628 108.28 90.1121 108.485 89.6548 108.896C89.2068 109.307 88.9501 109.876 88.8848 110.604H93.7288ZM98.0004 108.574C98.2244 108.135 98.5418 107.795 98.9524 107.552C99.3724 107.309 99.8811 107.188 100.478 107.188V108.504H100.142C98.7144 108.504 98.0004 109.279 98.0004 110.828V115H96.7264V107.328H98.0004V108.574ZM105.071 108.378H103.461V115H102.187V108.378H101.193V107.328H102.187V106.782C102.187 105.923 102.406 105.298 102.845 104.906C103.293 104.505 104.007 104.304 104.987 104.304V105.368C104.427 105.368 104.03 105.48 103.797 105.704C103.573 105.919 103.461 106.278 103.461 106.782V107.328H105.071V108.378ZM107.215 106.082C106.972 106.082 106.767 105.998 106.599 105.83C106.431 105.662 106.347 105.457 106.347 105.214C106.347 104.971 106.431 104.766 106.599 104.598C106.767 104.43 106.972 104.346 107.215 104.346C107.448 104.346 107.644 104.43 107.803 104.598C107.971 104.766 108.055 104.971 108.055 105.214C108.055 105.457 107.971 105.662 107.803 105.83C107.644 105.998 107.448 106.082 107.215 106.082ZM107.831 107.328V115H106.557V107.328H107.831ZM111.276 104.64V115H110.002V104.64H111.276Z"
                              fill="white"
                            />
                          </svg>
                          <p className="md:pt-4">
                            Te recomendamos agregar al menos 5 fotografías
                            diferentes de tu alojamiento
                          </p>
                        </div>

                        <div className="">
                          <br></br>
                          {/* INPUT IMAGES */}
                          <label className="">
                            <p className="bg-[#2F2E43] px-10  text-white rounded-full py-2 text-lg md:text-lg sm:text-sm w-full cursor-pointer">
                              Selecciona tus imagenes Aquí
                            </p>
                            <div className="flex">
                              <input
                                type="file"
                                hidden
                                name="imag"
                                className="text-[#2A2D49]"
                                accept=".png, .jpg, .jpeg"
                                multiple
                                onChange={(e) =>
                                  setCurrentFiles(e.target.files)
                                }
                              />
                            </div>
                            {errors.imag && (
                              <span className="text-red-500">
                                {errors.imag.message}
                              </span>
                            )}
                          </label>

                          {/* VIEW IMAGES */}
                          <div className="flex flex-row gap-2 flex-wrap justify-center">
                            {images.map((image, index) => (
                              <div className="flex " key={index}>
                                <div className="">
                                  <button
                                    className="position-absolute px-2 mb-2 text-white bg-[#FF6868] mt-4"
                                    onClick={() => deleteFileFromList(index)}
                                  >
                                    x
                                  </button>
                                  <div className="">
                                    <Image
                                      src={URL.createObjectURL(image)}
                                      width={100}
                                      height={100}
                                      className="border border-5 w-max-80 h-auto"
                                      alt="Imagen dada de alta"
                                    ></Image>
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
                              <label
                                htmlFor="default-radio-1"
                                className="mr-2 "
                              >
                                Perro
                              </label>
                              <input
                                type="checkbox"
                                value="perro"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                onChange={hiddenCheck5}
                              />
                            </div>

                            <div className="flex items-center">
                              <label
                                htmlFor="default-radio-1"
                                className="mr-2 "
                              >
                                Gato
                              </label>
                              <input
                                type="checkbox"
                                value="gato"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                onChange={hiddenCheck4}
                              />
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
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                onChange={hiddenCheck2}
                                disabled={check4 && check5 ? !check4 : check4}
                              />
                            </div>
                            <div className="flex items-center">
                              <label htmlFor="" className="mr-2 ">
                                Grande
                              </label>
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                onChange={hiddenCheck3}
                                disabled={check4 && check5 ? !check4 : check4}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label
                            forlabel="lastName"
                            className="block mb-2 text-lg font-medium"
                          >
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
                          {errors.amount && (
                            <span className="text-red-500">
                              {errors.amount.message}
                            </span>
                          )}
                        </div>
                        <div className="sm:flex sm:justify-start sm:gap-10 lg:flex lg:justify-start lg:gap-14">
                          <div className="flex justify-around item-center sm:gap-4">
                            <div className="pb-4">
                              <label
                                forlabel="datetime"
                                className="block mb-2 text-lg font-medium"
                              >
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
                              {errors.checkIn && (
                                <span className="text-red-500">
                                  {errors.checkIn.message}
                                </span>
                              )}
                            </div>
                            <div className="pb-4">
                              <label
                                forlabel="datetime"
                                className="block mb-2 text-lg font-medium"
                              >
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
                              {errors.checkOut && (
                                <span className="text-red-500">
                                  {errors.checkOut.message}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="pt-4">
                          <div className="flex justify-start justify-items-center  items-center pb-2">
                            <label
                              htmlFor="message"
                              className="block mb-2 text-lg font-medium"
                            >
                              ¿Habitan mascotas en el sitio?
                            </label>
                            <div className="flex justify-center items-center gap-1 mb-2 pl-10">
                              <p>Marcar</p>
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                onChange={hiddenText}
                              />
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
                          {errors.description && (
                            <span className="text-red-500">
                              {errors.description.message}
                            </span>
                          )}
                        </div>
                        <div className="pt-4">
                          <label
                            htmlFor="message"
                            className="block mb-2 text-lg font-medium"
                          >
                            Amenidades
                            <small>
                              {" "}
                              (Separa tus amenidades con un punto al final de
                              cada una)
                            </small>
                            :
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
                          {errors.amenities && (
                            <span className="text-red-500">
                              {errors.amenities.message}
                            </span>
                          )}
                        </div>
                        <div className="pt-4">
                          <label
                            htmlFor="message"
                            className="block mb-2 text-lg font-medium"
                          >
                            Restricciones
                            <small>
                              {" "}
                              (Separa tus restricciones con un punto al final de
                              cada una)
                            </small>
                            :
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
                          {errors.restrictions && (
                            <span className="text-red-500">
                              {errors.restrictions.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="border-b-[2px] border-[#FF6868] pt-4">
                        <h2 className="text-3xl pb-2">Dirección</h2>
                      </div>
                      <div className="md:flex md:items-start">
                        <div className="flex justify-center items-center pt-10 md:pt-0 md:px-10 sm:pb-5 ">
                          <Image
                            src={"/images/direction.png"}
                            width={500}
                            height={500}
                            alt="Dirección"
                          />
                        </div>
                        <div className="md:pt-5">
                          <div className="sm:flex  sm:items-center">
                            <div className="flex gap-4">
                              <div className="pb-4 pt-4 sm:pt-0 sm:w-full sm:mr-4 sm:pb-0 lg:pb-0">
                                <label
                                  forlabel="street"
                                  className="block mb-2 text-lg font-medium"
                                >
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
                                {errors.street && (
                                  <span className="text-red-500">
                                    {errors.street.message}
                                  </span>
                                )}
                              </div>
                              <div className="pb-4  pt-4 sm:w-52 sm:pb-0 lg:pb-0 sm:pt-0">
                                <label
                                  forlabel="exterior"
                                  className="block mb-2 text-lg font-medium"
                                >
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
                                {errors.externalNumber && (
                                  <span className="text-red-500">
                                    {errors.externalNumber.message}
                                  </span>
                                )}
                              </div>
                              <div className="pb-4 pt-4 sm:w-52 sm:pb-0 lg:pb-0 sm:pt-0">
                                <label
                                  forlabel="interior"
                                  className="block mb-2 text-lg font-medium"
                                >
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
                                {errors.internalNumber && (
                                  <span className="text-red-500">
                                    {errors.internalNumber.message}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="pb-4 sm:pb-0 lg:pb-0">
                            <label
                              forlabel="cologne"
                              className="block mb-2 text-lg font-medium"
                            >
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
                            {errors.neighbourhood && (
                              <span className="text-red-500">
                                {errors.neighbourhood.message}
                              </span>
                            )}
                          </div>
                          <div className="sm:flex sm:gap-10 ">
                            <div className="sm:w-full">
                              <label
                                forlabel="lastName"
                                className="block mb-2 text-lg font-medium"
                              >
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
                              {errors.state && (
                                <p className="text-[#2B2E4A]">
                                  {errors.state.message}
                                </p>
                              )}
                            </div>
                            <div className="pt-4 sm:pt-0 sm:w-full">
                              <label
                                forlabel="lastName"
                                className="block mb-2 text-lg font-medium"
                              >
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
                                  .filter(
                                    (item) => item.estado === watch("state")
                                  )[0]
                                  ?.municipios.map((municipio, index) => {
                                    return (
                                      <option key={index} value={municipio}>
                                        {municipio}
                                      </option>
                                    );
                                  })}
                              </select>
                              {errors.city && (
                                <p className="text-[#2B2E4A]">
                                  {errors.city.message}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="sm:flex sm:gap-10 sm:mt-5">
                            <div className="pb-4 pt-4 sm:pt-0">
                              <label
                                forlabel="street"
                                className="block mb-2 text-lg font-medium"
                              >
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
                              {errors.postalCode && (
                                <span className="text-red-500">
                                  {errors.postalCode.message}
                                </span>
                              )}
                            </div>
                            <div className="pb-4 sm:w-full">
                              <label
                                forlabel="street"
                                className="block mb-2 text-lg font-medium"
                              >
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
                              {errors.streetsNearby && (
                                <span className="text-red-500">
                                  {errors.streetsNearby.message}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="pt-4">
                            <label
                              htmlFor="message"
                              className="block mb-2 text-2xl font-medium"
                            >
                              Referencias
                            </label>
                            <textarea
                              rows="6"
                              className=" rounded-lg w-full pl-10 p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                              placeholder={
                                "Ejemplo:\n- ¿Color de la casa?\n- ¿Color de la puerta / portón?\n- ¿Algún negocio cercano?"
                              }
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
                            {errors.references && (
                              <span className="text-red-500">
                                {errors.references.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="border-b-[2px] border-[#FF6868] pt-4 pb-2">
                        <h2 className="text-3xl pb-2">
                          Información financiera
                        </h2>
                      </div>
                    </div>
                    <div className="lg:flex">
                      <div className="pt-4 md:pt-2">
                        <p className="text-lg lg:w-64 lg:mr-16">
                          Los costos por noche son los que tú recibirás
                          netamente en tu cuenta bancaria al terminar el
                          hospedaje de la mascota. Al fijar los precios,
                          considera que <strong>domus.com.mx</strong> agregará
                          un porcentaje extra como cargo por impuestos,
                          comisiones y mantenimiento de la plataforma.
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
                                <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                >
                                  Perro
                                </th>
                                <td className="px-6 py-4">Pequeño</td>
                                <td className="px-6 py-4">
                                  {" "}
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                      <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
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
                                <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                >
                                  Perro
                                </th>
                                <td className="px-6 py-4">Mediano</td>
                                <td className="px-6 py-4">
                                  {" "}
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                      <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
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
                                <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                >
                                  Perro
                                </th>
                                <td className="px-6 py-4">Grande</td>
                                <td className="px-6 py-4">
                                  {" "}
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                      <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
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
                                <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                  Gato
                                </th>
                                <td className="px-6 py-4">-----</td>
                                <td className="px-6 py-4">
                                  {" "}
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                      <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
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
                              <label
                                forlabel="card"
                                className="block mb-2 text-lg font-medium"
                              >
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
                              {errors.name && (
                                <span className="text-red-500">
                                  {errors.name.message}
                                </span>
                              )}
                            </div>
                            <div className="pb-4 sm:w-full">
                              <label
                                forlabel="card"
                                className="block mb-2 text-lg font-medium"
                              >
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
                              {errors.number && (
                                <span className="text-red-500">
                                  {errors.number.message}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="sm:flex sm:gap-10">
                            <div className="pb-4 sm:w-full">
                              <label
                                forlabel="lastName"
                                className="block mb-2 text-lg font-medium"
                              >
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
                              {errors.bank && (
                                <span className="text-red-500">
                                  {errors.bank.message}
                                </span>
                              )}
                            </div>
                            <div className="pb-4 sm:w-full">
                              <label
                                forlabel="card"
                                className="block mb-2 text-lg font-medium"
                              >
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
                              {errors.clabe && (
                                <span className="text-red-500">
                                  {errors.clabe.message}
                                </span>
                              )}
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
                      <button
                        type="submit"
                        className="px-6 py-3.5 w-full text-base md:font-bold text-white bg-[#FF6868] hover:scale-[102%] rounded-full text-center transition"
                      >
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
