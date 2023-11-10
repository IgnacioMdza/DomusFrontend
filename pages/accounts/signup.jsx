import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

export default function Register() {
  const { user, setUser } = useState();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  let captcha = useRef(null);
  const [captchaValid, setCaptchaValid] = useState(null);
  // const [userValid, setUserValid] = useState(false);
  const router = useRouter();
  const password = useRef({});
  const CAPTCHA_KEY = process.env.NEXT_PUBLIC_CAPTCHA_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  password.current = watch("password", "");

  const onChange = () => {
    if (captcha.current.getValue()) {
      setCaptchaValid(true);
    }
  };

  const onSubmit = (data) => {
    if (captcha.current.getValue()) {
      console.log("El usuario no es un robot");
      // setUserValid(true);
      setCaptchaValid(true);
      toast.info("Creando usuario", { autoClose: 1500 });
    } else {
      // setUserValid(false);
      setCaptchaValid(false);
      return;
    }
    setIsLoading(true);
    fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: data.nickname,
        email: data.email,
        password: data.password,
        type: data.radio,
      }),
    })
      .then((resp) => {
        if (!resp) {
          throw new Error("Respuesta no exitosa");
        }
        return resp.json();
      })
      .then((res) => {
        console.log("estotrae res", res);
        if (res.success) {
          setTimeout(
            () =>
              toast.success("Usuario creado con éxito", { autoClose: 5000 }),
            1500
          );
          setTimeout(() => router.push("/accounts/confirm"), 6000);
        } else {
          setTimeout(() => toast.error(res.message, { autoClose: 5000 }), 1500);
          setTimeout(() => setIsLoading(false), 5000);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        toast.error(
          "Error de conexión, favor de volver a intentar en un momento"
        );
        setTimeout(() => setIsLoading(false), 3000);
      });
  };

  return (
    <main className="mt-[90px] px-[16px] sm:pt-[40px] sm:pb-[40px] pt-[20px] pb-[20px] min-h-[calc(100vh-90px)]">
      <Head>
        <title>Domus - Regístrate</title>
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
      <div className="max-w-[400px] sm:max-w-[450px] mx-auto sm:w-[450px] sm:mx-auto bg-white shadow-xl rounded-lg sm:rounded-xl text-[#2B2E4A]">
        <div className="bg-[#FF6868] text-center text-white rounded-t-xl pt-[16px] pb-[8px] sm:pb-0 rounded-b-[12px] sm:rounded-b-[16px]">
          <div className="flex justify-center">
            <svg
              className="sm:w-32 sm:h-24 w-28 h-20"
              viewBox="0 0 76 67"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.6 18.3009C26.379 17.1124 26.0108 15.9344 25.7162 14.7563C24.8044 11.9364 23.5389 10.6108 21.9499 8.10891C21.4877 7.43394 20.9552 6.80988 20.3613 6.24721C19.6198 5.41579 18.5786 4.91235 17.4663 4.84728C16.354 4.78221 15.2613 5.16085 14.4278 5.90013C12.9547 7.02599 11.7479 8.46243 10.8929 10.1073C8.93608 13.6835 7.73673 16.1026 8.3364 20.2152C8.57972 22.2089 9.29194 24.1166 10.4147 25.7821C11.5375 27.4476 13.0389 28.8235 14.796 29.7971C15.7177 30.3642 16.7512 30.7252 17.8256 30.8552C18.9 30.9853 19.9898 30.8814 21.0202 30.5507C22.0507 30.2199 22.9973 29.6702 23.7952 28.9391C24.5931 28.2081 25.2233 27.3132 25.6426 26.3157C26.8216 23.8183 27.1576 21.0056 26.6 18.3009Z"
                fill="white"
              />
              <path
                d="M47.8717 19.5732C48.8648 17.5185 49.2908 15.236 49.1058 12.9615C48.9209 10.6871 48.1316 8.5033 46.8197 6.63598C44.279 2.85287 40.4508 1.48803 36.0467 0.314615C35.2543 0.102765 34.4367 0.000148404 33.6165 0.00959848C32.6299 -0.0582402 31.6523 0.235241 30.8663 0.835253C30.0803 1.43527 29.5396 2.3008 29.3452 3.2702C28.8456 5.4259 28.8456 6.2999 29.3452 8.4556C29.6292 10.0964 30.0185 11.7162 30.3972 13.3465C31.0457 16.3198 32.5018 19.0566 34.6054 21.2561C35.9889 22.6844 37.7706 23.663 39.7184 24.0644C41.3868 24.3689 43.1093 24.0884 44.5949 23.2701C46.0804 22.4518 47.2379 21.146 47.8717 19.5732Z"
                fill="white"
              />
              <path
                d="M61.7804 34.172C63.4272 32.784 64.6639 30.973 65.3573 28.9342C66.0506 26.8954 66.1744 24.7061 65.7151 22.6021C65.5983 22.0992 65.4507 21.6039 65.2732 21.1191C64.4253 18.0759 62.6936 15.3525 60.297 13.2937C60.0611 13.0988 59.8153 12.9162 59.5606 12.7467C57.0041 11.1164 54.7317 11.5372 52.9537 13.9984C51.7142 15.8293 50.8522 17.8889 50.4183 20.0568C49.5794 22.8261 49.3745 25.7487 49.8186 28.608C50.1554 30.3562 50.9341 31.9892 52.0805 33.3516C52.6413 34.0741 53.3459 34.6725 54.1497 35.109C54.9535 35.5456 55.8391 35.8108 56.7506 35.8878C57.662 35.9649 58.5796 35.8523 59.4453 35.5569C60.3111 35.2616 61.1062 34.79 61.7804 34.172Z"
                fill="white"
              />
              <path
                d="M16.5106 57.2808C16.5948 57.712 16.7105 58.1432 16.8473 58.7217C18.2676 62.8448 21.3816 65.0326 25.7161 65.6216C30.1291 66.1276 34.5682 64.923 38.1197 62.2558C40.4774 60.5612 43.3288 59.6923 46.231 59.7841C50.592 60.0265 54.8869 58.6352 58.277 55.8819C61.1911 53.4522 62.7903 50.3599 62.2958 46.4787C62.1027 45.0282 61.6137 43.6328 60.859 42.379C60.1044 41.1251 59.1002 40.0396 57.9088 39.1897C56.5834 38.1836 55.1424 37.3397 53.6164 36.6759C50.2921 35.2514 47.2247 33.2899 44.5372 30.8699C43.2646 29.6893 41.7635 28.7819 40.1266 28.2036C38.4896 27.6254 36.7516 27.3886 35.0195 27.5078C33.2875 27.6271 31.5983 28.0998 30.0561 28.897C28.5139 29.6941 27.1514 30.7987 26.0527 32.1426C24.6145 33.8632 23.6725 35.9432 23.3279 38.1589C22.8635 41.0921 21.6577 43.858 19.8246 46.1947C17.4835 49.0026 16.2622 52.5759 16.3949 56.2289C16.4127 56.5815 16.4513 56.9327 16.5106 57.2808Z"
                fill="white"
              />
              <path
                d="M0.656178 40.231C2.22373 45.185 5.17999 48.1616 9.76692 49.3396C14.3539 50.5176 18.3727 47.7093 18.6883 43.0288C18.7924 41.3849 18.5002 39.74 17.8361 38.2325C16.2791 34.6354 13.5122 32.0795 10.4718 29.8181C9.38313 29.004 8.18633 28.3456 6.91588 27.8617C4.3068 26.8099 2.19217 27.7881 1.03492 30.3335C0.108368 32.552 -0.20414 34.9788 0.130154 37.3595C0.26692 38.4324 0.529932 39.5473 0.656178 40.231Z"
                fill="white"
              />
              <ellipse
                cx="48.8571"
                cy="39.6531"
                rx="27.1429"
                ry="27.3469"
                fill="#2B2E4A"
                fillOpacity="0.1"
              />
              <ellipse
                cx="44.7857"
                cy="49.2244"
                rx="10.8571"
                ry="10.9388"
                fill="white"
                fillOpacity="0.8"
              />
            </svg>
          </div>
          <p className="text-[32px] sm:text-[36px] font-[Raleway] font-semibold">
            Regístrate en
          </p>
          <p className=" font-bold text-[36px] font-[Raleway] sm:text-[40px] ">
            Domus.com.mx
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-4 sm:px-10 pb-[16px] pt-[40px] sm:pt-[48px] font-[Nunito] font-medium"
        >
          <div className="pb-4">
            <label
              forlabel="NickName"
              className="block mb-2 text-lg font-medium"
            >
              Nickname <small>{`(max 10 caracteres)`}</small>:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="6"
                    r="4"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M20.4141 18.5H18.9999M18.9999 18.5H17.5857M18.9999 18.5L18.9999 17.0858M18.9999 18.5L18.9999 19.9142"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 13C14.6083 13 16.8834 13.8152 18.0877 15.024M15.5841 20.4366C14.5358 20.7944 13.3099 21 12 21C8.13401 21 5 19.2091 5 17C5 15.6407 6.18652 14.4398 8 13.717"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <input
                type="text"
                className=" rounded-lg w-full pl-10 p-3 border-[1px] border-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                placeholder="Ingresa tu NickName"
                {...register("nickname", {
                  required: {
                    value: true,
                    message: "El campo NickName es requerido",
                  },
                  maxLength: {
                    value: 10,
                    message: "Máximo 10 caracteres",
                  },
                })}
              />
            </div>
            {errors.nickname && (
              <span className="text-red-500">{errors.nickname.message}</span>
            )}
          </div>
          <div className="pb-4">
            <label forlabel="email" className="block mb-2 text-lg font-medium">
              Correo Electrónico:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="email"
                className=" rounded-lg w-full pl-10 p-3 border-[1px] border-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                placeholder="Ingresa tu Email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El campo es requerido",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "El formato no es correcto",
                  },
                })}
              />
            </div>
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          {/* <div className="pb-4">
            <label forlabel="code" className="block mb-2 text-lg font-medium">
              Código de Verificación:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
              <input
                type="text"
                className=" rounded-lg w-full  p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                placeholder="Ingresa el Código de Verificación"
                {...register("code", {
                  required: {
                    value: true,
                    message: "El campo es requerido",
                  },
                })}
              />
            </div>
            {errors.code && (
              <span className="text-red-500">{errors.code.message}</span>
            )}
          </div> */}
          <div>
            <label
              forlabel="password"
              className="block mb-2 text-lg font-medium"
            >
              Contraseña <small>{`(min 8 caracteres)`}</small>:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  fill="currentColor"
                >
                  <path d="M25,3c-6.6,0-12,5.4-12,12v5H9c-1.7,0-3,1.3-3,3v24c0,1.7,1.3,3,3,3h32c1.7,0,3-1.3,3-3V23c0-1.7-1.3-3-3-3h-4v-5	C37,8.4,31.6,3,25,3z M25,5c5.6,0,10,4.4,10,10v5H15v-5C15,9.4,19.4,5,25,5z M25,30c1.7,0,3,1.3,3,3c0,0.9-0.4,1.7-1,2.2V38	c0,1.1-0.9,2-2,2s-2-0.9-2-2v-2.8c-0.6-0.5-1-1.3-1-2.2C22,31.3,23.3,30,25,30z" />
                </svg>
              </div>
              <input
                type="password"
                className=" rounded-lg w-full pl-10 p-3 border-[1px] border-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                placeholder="Ingresa tu Contraseña"
                {...register("password", {
                  required: {
                    value: true,
                    message: `El campo password es requerido`,
                  },
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
                })}
              />
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="pt-4 mb-4">
            <label
              forlabel="repitPassword"
              className="block mb-2 text-lg font-medium"
            >
              Repetir Contraseña:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  fill="currentColor"
                >
                  <path d="M25,3c-6.6,0-12,5.4-12,12v5H9c-1.7,0-3,1.3-3,3v24c0,1.7,1.3,3,3,3h32c1.7,0,3-1.3,3-3V23c0-1.7-1.3-3-3-3h-4v-5	C37,8.4,31.6,3,25,3z M25,5c5.6,0,10,4.4,10,10v5H15v-5C15,9.4,19.4,5,25,5z M25,30c1.7,0,3,1.3,3,3c0,0.9-0.4,1.7-1,2.2V38	c0,1.1-0.9,2-2,2s-2-0.9-2-2v-2.8c-0.6-0.5-1-1.3-1-2.2C22,31.3,23.3,30,25,30z" />
                </svg>
              </div>
              <input
                type="password"
                className=" rounded-lg w-full pl-10 p-3 border-[1px] border-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                placeholder="Ingresa tu Contraseña"
                {...register("password_repeat", {
                  required: {
                    value: true,
                    message: "El campo password es requerido",
                  },
                  validate: (value) =>
                    value === password.current || "La contraseña no coincide",
                })}
              />
            </div>
            {errors.password_repeat && (
              <span className="text-red-500">
                {errors.password_repeat.message}
              </span>
            )}
          </div>
          <div>
            <label className="block  text-lg font-medium">
              Registrarse como:
            </label>
            <div className="flex justify-center items-center gap-[48px] pt-2">
              <div className="flex items-center">
                <label htmlFor="default-radio-1" className="mr-2">
                  Cliente
                </label>
                <input
                  type="radio"
                  value="client"
                  name="default-radio"
                  className="w-4 h-4 scale-[140%]"
                  {...register("radio", {
                    required: {
                      value: true,
                      message: "Selecciona un perfil",
                    },
                  })}
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="default-radio-1" className="mr-2 ">
                  Anfitrión
                </label>
                <input
                  type="radio"
                  value="host"
                  name="default-radio"
                  className="w-4 h-4 scale-[140%]"
                  {...register("radio", {
                    required: {
                      value: true,
                      message: "Selecciona un tipo de usuario",
                    },
                  })}
                />
              </div>
            </div>
          </div>
          {errors.radio && (
            <p className="text-red-500">{errors.radio.message}</p>
          )}
          <div className="flex justify-center pt-8">
            <ReCAPTCHA
              ref={captcha}
              sitekey={`${CAPTCHA_KEY}`}
              onChange={onChange}
            />
          </div>
          {captchaValid === false && (
            <p className="text-red-500 text-center">
              Por favor acepte el CAPTCHA
            </p>
          )}
          <div className="pt-[40px] sm:pt-[40px] text-center">
            <button
              type="submit"
              className="px-6 py-3.5 w-full text-base md:font-bold text-white bg-[#FF6868] hover:scale-[102%] rounded-full text-center transition border-[1px] border-[#FF6868] hover:bg-white hover:text-[#FF6868] shadow-lg active:bg-[#FF6868] disabled:opacity-25 disabled:bg-gray-400 disabled:border-gray-700 disabled:text-gray-700 disabled:border-2"
              disabled={isLoading}
            >
              Registrarse
            </button>
          </div>
        </form>

        <div className="text-center pb-[40px] sm:pb-[48px]">
          <p>
            ¿Ya tienes cuenta?&nbsp;
            <Link
              href={"/accounts/signin"}
              className="font-bold text-[#FF6868] hover:underline decoration-1"
            >
              Ingresar
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
