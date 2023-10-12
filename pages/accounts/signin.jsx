import Image from "next/image";
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const [user, setUser] = useState({});

  const URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.replace(
        `/profiles/${JSON.parse(atob(token.split(".")[1])).id}`
      );
    }
  }, [user]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch(`${URL}/auth`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.success) {
          localStorage.setItem("token", resp.token);
          const decodedToken = JSON.parse(atob(resp.token.split(".")[1]));
          setUser(decodedToken);
        } else {
          toast.error(resp.message);
        }
      });
  };

  return (
    <main className="min-h-[calc(100vh-90px)] flex">
      <ToastContainer />
      <div className="w-full m-auto mt-36 rounded-md sm:max-w-xl sm:mt-36 sm:mb-20 lg:max-w-3xl  lg:mt-28 lg:mb-10 md:px-0 lg:flex lg:items-center lg:justify-center">
        <div className="lg:flex lg:border-[2px] lg:w-full bg-white drop-shadow-xl px-5 py-7 lg:px-0 lg:py-0">
          <div className="lg:bg-[#2F2E43] lg:flex lg:items-center px-5">
            <div className="px-2">
              <div className="flex justify-center ">
                <Image
                  src={"/images/huella-mobile.png"}
                  alt="Huella Mobile"
                  height={150}
                  width={150}
                ></Image>
              </div>
              <div className="pb-10">
                <h1 className="text-4xl font-bold text-center border-y-2 border-[#D90062] text-[#FF6868] py-2 mt-8 lg:text-white font-[Raleway]">
                  Bienvenido a <span className=" lg:text-[#FF6868]">DOMUS</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="lg:pb-6 w-full">
            <div className="lg:bg-[#FF6868] lg:rounded-sm lg:text-center lg:text-white lg:py-2 lg:lg:mb-20 ">
              <h1 className="lg:font-normal lg:text-3xl lg:mt-0 lg:pt-0 invisible lg:visible font-[Raleway] font-bold">
                Login
              </h1>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="px-1 lg:px-10 lg:pb-10 font-[Nunito] font-medium "
            >
              <div className="pb-4">
                <label
                  forlabel="email"
                  className="block mb-2 text-lg font-medium"
                >
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
                    className=" rounded-lg w-full pl-10 p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
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
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div>
                <label
                  forlabel="email-address-icon"
                  className="block mb-2 text-lg font-medium"
                >
                  Contraseña:
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
                    id="email-address-icon"
                    className=" rounded-lg w-full pl-10 p-3 border-[2px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868]  bg-[#F2F2F2]"
                    placeholder="Ingresa tu Contraseña"
                    {...register("password", {
                      required: {
                        value: true,
                        message: `El campo password es requerido`,
                      },
                      minLength: {
                        value: 6,
                        message:
                          "La contraseña debe tener al menos 6 caracteres",
                      },
                    })}
                  />
                </div>
                {errors.password && (
                  <span className="text-red-500 ">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="pt-5 text-center">
                <button
                  type="submit"
                  className="px-6 py-3.5 w-full text-base font-medium text-white bg-[#FF6868] hover:scale-[102%] rounded-lg text-center"
                >
                  Ingresar
                </button>
              </div>
            </form>
            <div className="text-center my-3">
              <h4 className="pb-2">¿Olvidaste tu contraseña?</h4>
              <p>
                ¿Ya tienes cuenta?&nbsp;
                <Link
                  href={"/accounts/signup"}
                  className="font-bold text-[#FF6868] underline decoration-1"
                >
                  Registrate
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
