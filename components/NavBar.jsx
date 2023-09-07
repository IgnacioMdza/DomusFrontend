import Image from "next/image";
import Link from "next/link";
import logo from "/public/icons/huella.png";

export default function NavBar() {
  return (
    <nav className="bg-white border-gray-200 w-full z-20 shadow-xl font-[Nunito]text-[20px] fixed top-0 left-0 right-0">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center gap-4">
          <Image src={logo} alt="Domus Logo" className="p-2 w-28"></Image>

          <Link href="#">Home </Link>
          <Link href="#">Nosotros </Link>
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white  dark:border-gray-700">
            <li>
              <a
                href="#"
                className="text-dark block py-2 px-5 border rounded-full border-[#2B2E4A] hover:bg-[#2B2E4A] hover:text-white "
                aria-current="page"
              >
                Únete a nuestra comunidad
                <i className="fa fa-home ml-3"></i>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-dark block py-2 px-5 border rounded-full md:bg-transparent  border-[#2B2E4A] hover:bg-[#2B2E4A] hover:text-white"
              >
                Ingresar
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
