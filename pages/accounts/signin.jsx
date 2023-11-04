import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();

  const URL = process.env.NEXT_PUBLIC_BASE_URL;
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      // window.location.replace(`/profile/${JSON.parse(atob(token.split(".")[1])).id}`);
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      router.push(`/profile/${decodedToken.id}`);
    }
  }, [router, token]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    fetch(`${URL}/auth`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => {
        if (!resp) {
          throw new Error("Respuesta no exitosa");
        }
        return resp.json();
      })
      .then((resp) => {
        if (resp.success) {
          localStorage.setItem("token", resp.token);
          const decodedToken = JSON.parse(atob(resp.token.split(".")[1]));
          router.push(`/profile/${decodedToken.id}`);
        } else {
          toast.error(resp.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        toast.error("Error de conexión, favor de volver a intentar en un momento");
        setIsLoading(false);
      });
  };

  return (
    <main className="min-h-[calc(100vh-90px)] flex mt-[90px] p-[20px]">
      <Head>
        <title>Domus - Inicia Sesión</title>
      </Head>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      {token === null ? (
        <div className="w-full m-auto rounded-xl max-w-[400px] sm:max-w-[580px] md:max-w-[620px] lg:max-w-[700px] sm:px-0 sm:flex sm:items-center sm:justify-center">
          <div className="sm:flex lg:w-full bg-white shadow-xl px-0 sm:py-0 rounded-xl">
            <div className="sm:bg-[#2F2E43] sm:flex sm:items-center py-5 px-5 rounded-t-xl sm:rounded-tr-none sm:rounded-tl-xl sm:rounded-bl-xl sm:w-[47%]">
              <div className="px-2">
                <div className="flex justify-center ">
                  <Image src={"/images/huella-signin.png"} alt="Huella Mobile" height={200} width={200} className="w-[100px] sm:w-[160px]"></Image>
                </div>
                <div className="sm:pb-10">
                  <h1 className="text-3xl sm:text-4xl font-normal sm:font-medium text-center border-y-[1px] border-[#E91E63] sm:border-white py-[12px] mt-8 text-[#FF6868] sm:text-white font-[Raleway]">
                    Bienvenido a <span className="text-[#FF6868] sm:text-[#E91E63] font-semibold sm:font-bold">DOMUS</span>
                  </h1>
                </div>
              </div>
            </div>
            <div className="sm:w-[53%] pb-[28px] sm:pb-[72px]">
              <div className="sm:bg-[#FF6868] sm:text-center sm:text-white sm:py-[12px] rounded-tr-xl">
                <h1 className="sm:font-medium sm:text-3xl sm:mt-0 md:pt-0 invisible sm:visible font-[Raleway] font-bold">Login</h1>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="font-[Nunito] font-medium sm:pt-[72px] sm:px-[24px] px-5">
                <div className="sm:pb-[20px]">
                  <label forlabel="email" className="block mb-2 text-lg font-medium">
                    Correo Electrónico:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
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
                          message: "El campo email es requerido",
                        },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "El formato email no es correcto",
                        },
                      })}
                    />
                  </div>
                  {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </div>
                <div>
                  <label forlabel="email-address-icon" className="block mb-2 text-lg font-medium">
                    Contraseña:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="currentColor">
                        <path d="M25,3c-6.6,0-12,5.4-12,12v5H9c-1.7,0-3,1.3-3,3v24c0,1.7,1.3,3,3,3h32c1.7,0,3-1.3,3-3V23c0-1.7-1.3-3-3-3h-4v-5	C37,8.4,31.6,3,25,3z M25,5c5.6,0,10,4.4,10,10v5H15v-5C15,9.4,19.4,5,25,5z M25,30c1.7,0,3,1.3,3,3c0,0.9-0.4,1.7-1,2.2V38	c0,1.1-0.9,2-2,2s-2-0.9-2-2v-2.8c-0.6-0.5-1-1.3-1-2.2C22,31.3,23.3,30,25,30z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      id="email-address-icon"
                      className=" rounded-lg w-full pl-10 p-3 border-[1px] border-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868]  bg-[#F2F2F2]"
                      placeholder="Ingresa tu Contraseña"
                      {...register("password", {
                        required: {
                          value: true,
                          message: `El campo password es requerido`,
                        },
                        minLength: {
                          value: 6,
                          message: "La contraseña debe tener al menos 6 caracteres",
                        },
                      })}
                    />
                  </div>
                  {errors.password && <span className="text-red-500 ">{errors.password.message}</span>}
                </div>
                <div className="mt-[28px] sm:mt-[48px] text-center">
                  <button
                    type="submit"
                    className="px-6 py-[14px] w-4/5 text-base font-medium text-white bg-[#FF6868] shadow-lg rounded-full text-center text-[16px] transition hover:bg-[#E91E63] active:text-[#E91E63] disabled:opacity-25 disabled:bg-gray-400 disabled:border-gray-700 disabled:text-gray-700"
                    disabled={isLoading}
                  >
                    Ingresar
                  </button>
                </div>
              </form>
              <div className="text-center mt-[16px] sm:mt-[44px]">
                <p className="pb-2 text-[16px]">¿Olvidaste tu contraseña?</p>
                <p>
                  ¿Ya tienes cuenta?&nbsp;
                  <Link href={"/accounts/signup"} className="font-bold text-[#FF6868] text-[16px] hover:underline decoration-1">
                    Registrate
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
