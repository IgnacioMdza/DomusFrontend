import Image from "next/image";
import Link from "next/link";
import logo from "/public/icons/huella.png";
import { Transition } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const imageLoader = ({ src, width, quality }) => {
  return `${src}`;
};

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const URL = process.env.NEXT_PUBLIC_BASE_URL;

    if (token) {
      const tokenInfo = JSON.parse(atob(token.split(".")[1]));
      fetch(`${URL}/users/${tokenInfo.id}`)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error('Respuesta no exitosa');
          }
          return resp.json();
        })
        .then((resp) => {
          if (resp.success) {
            setUser(resp.data);
          } else {
            router.push("/404");
          }
        })
        .catch((error) => {
          console.error('Error en la solicitud:', error);
        });
    }
  }, [router]);

  function onclick() {
    const rem = localStorage.removeItem("token");
    setUser();
    window.location.replace(`/`);
    // router.pathname === "/" ? router.reload() : router.push("/");
  }

  function goToProfile(profileId) {
    console.log("href", window.location.href);
    window.location.href.includes(`/profiles/${profileId}`) ? null : window.location.replace(`/profiles/${profileId}`);
  }

  return (
    <nav className="bg-white border-gray-200 w-full z-20 shadow-xl font-[Nunito] text-[16px] fixed top-0 left-0 right-0">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center gap-4">
          <Link href={"/"}>
            <Image src={logo} alt="Domus Logo" className="p-2 w-28"></Image>
          </Link>
        </div>
        <div className="hidden md:block">
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            {!user?._id ? (
              <ul className="font-medium flex items-center md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-6 md:mt-0 md:border-0 md:bg-white">
                <li className="border-b-[1px] border-white hover:border-[#2B2E4A] hover:text-[#2B2E4A] transition duration-300">
                  <Link href={"/"}>Home </Link>
                </li>
                <li className="border-b-[1px] border-white hover:border-[#2B2E4A] hover:text-[#2B2E4A] transition duration-300">
                  <Link href={"/#qs"}>Nosotros </Link>
                </li>
                <li>
                  <Link
                    href="/accounts/signup"
                    className="text-dark block py-2 px-5 border rounded-full border-[#2B2E4A] hover:bg-[#2B2E4A] hover:text-white transition duration-300"
                    aria-current="page"
                  >
                    Únete a nuestra comunidad
                    <i className="fa fa-home ml-3"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/accounts/signin"
                    className="text-dark block py-2 px-5 border rounded-full md:bg-transparent  border-[#2B2E4A] hover:bg-[#2B2E4A] hover:text-white transition duration-300"
                  >
                    Ingresar
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="font-medium flex md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700 justify-center items-center ">
                {!user.isInfoCompleted && (
                  <li>
                    <Link
                      href={`/accounts/register/${user._id}`}
                      className="text-[#e91e63] block py-2 px-5 border rounded-full border-[#e91e63] hover:text-white hover:bg-[#e91e63] transition duration-300"
                      aria-current="page"
                    >
                      Completar Registro
                    </Link>
                  </li>
                )}
                <li className="border-b-[1px] border-white hover:border-[#2B2E4A] hover:text-[#2B2E4A] transition duration-300">
                  <Link href={"/"}>Home </Link>
                </li>
                <li className="border-b-[1px] border-white hover:border-[#2B2E4A] hover:text-[#2B2E4A] transition duration-300">
                  <Link href={"/#qs"} className="">
                    Nosotros{" "}
                  </Link>
                </li>
                <li className="flex px-3 border rounded-full border-[#2B2E4A] justify-center items-center py-[1px] gap-2">
                  <button onClick={(e) => goToProfile(user._id)} className="text-dark flex items-center gap-[10px]" aria-current="page">
                    <p>{user.name.split(" ")[0]}</p>
                    <Image unoptimized loader={imageLoader} src={user.picture} width={100} height={100} alt="Domus Logo" className="w-10 h-10 object-cover rounded-full"></Image>
                  </button>
                </li>
                <li className=" ml-0">
                  <button type="submit" onClick={onclick} className="text-dark text-center hover:text-[#e91e63] transition duration-300">
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            )}
            {/* */}
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text- hover:text-white rounded-lg md:hidden hover:bg-[#FF6868] focus:ring-1 focus:ring-[#FF6868] hover:focus:ring-white"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          {!isOpen ? (
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg className="block h-6 w-6 stroke-[#FF6868] hover:stroke-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      </div>
      <Transition show={isOpen}>
        <div className="md:hidden z-50 border-0 navbar" id="mobile-menu">
          <div className="w-full " id="navbar-default">
            {!user?._id ? (
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                <li>
                  <Link onClick={() => setIsOpen(!isOpen)} href={"/"} className="text-dark block py-2 px-5 rounded-full hover:bg-[#2B2E4A] hover:text-white " aria-current="page" id="pepe">
                    Home
                    <i className="fa fa-home ml-3"></i>
                  </Link>
                </li>
                <li>
                  <a onClick={() => setIsOpen(!isOpen)} href={"/#qs"} className="text-dark block py-2 px-5 rounded-full hover:bg-[#2B2E4A] hover:text-white " aria-current="page">
                    Nosotros
                  </a>
                </li>
                <li>
                  <Link onClick={() => setIsOpen(!isOpen)} href="/accounts/signup" className="text-dark block py-2 px-5 rounded-full hover:bg-[#2B2E4A] hover:text-white " aria-current="page">
                    Únete a nuestra comunidad
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setIsOpen(!isOpen)} href="/accounts/signin" className="text-dark block py-2 px-5 rounded-full hover:bg-[#2B2E4A] hover:text-white ">
                    Ingresar
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="font-medium flex flex-col py-4 md:p-0 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:border-0 justify-center items-center gap-5 ">
                <li className="text-dark block py-2 px-5  rounded-full border-[#2B2E4A] hover:border-white hover:bg-[#FF6868] hover:text-white w-full text-center ">
                  <Link href={"/"}>Home </Link>
                </li>
                <li className="text-dark block py-2 px-5  rounded-full border-[#2B2E4A] hover:border-white hover:bg-[#FF6868] hover:text-white w-full text-center ">
                  <Link href={"/#qs"} className="">
                    Nosotros{" "}
                  </Link>
                </li>
                {!user.isInfoCompleted && (
                  <li className="text-dark block py-2 px-5 border rounded-full border-[#2B2E4A] hover:border-white hover:bg-[#FF6868] hover:text-white w-full text-center ">
                    <Link
                      href={`/accounts/register/${user._id}`}
                      // className="text-dark block py-2 px-5 border rounded-full border-[#2B2E4A] hover:border-white hover:bg-[#FF6868] hover:text-white w-full text-center bg-red-500"
                      aria-current="page"
                    >
                      Completar Registro
                    </Link>
                  </li>
                )}
                <li className="flex px-3 border rounded-full border-[#2B2E4A] justify-center items-center py-[1px] gap-2 mb-4">
                  <button onClick={(e) => goToProfile(user._id)} className="text-dark " aria-current="page">
                    perfil
                  </button>
                  <Image unoptimized loader={imageLoader} src={user.picture} width={100} height={100} alt="Domus Logo" className="w-10 h-10 object-cover rounded-full"></Image>
                </li>
                <li className=" ml-0">
                  <button type="submit" onClick={onclick} className="text-dark text-center">
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </Transition>
    </nav>
  );
}
