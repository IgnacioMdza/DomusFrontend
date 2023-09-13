import Image from "next/image";
import Link from "next/link";
import logo from "/public/icons/huella.png";
import facebook from "/public/icons/facebook-logo.png";
import instagram from "/public/icons/instagram-logo.png";
import whatsapp from "/public/icons/whatsapp-logo.png";
import linkedin from "/public/icons/linkedin-logo.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-white shadow-[0_-10px_25px_-5px_rgb(0,0,0,0.3)] w-full font-[Nunito]">
        <div className="max-w-screen-2xl m-auto py-10 md:py-5 gap-5 flex flex-col md:flex-row-reverse md:justify-between p-4 items-center">
          <div className="text-center">
            <div className="flex gap-4 mb-3">
              <Image
                src={facebook}
                alt="Logo Facebook"
                className="w-9 h-9"
              ></Image>
              <Image
                src={whatsapp}
                alt="Logo Whatsapp"
                className="w-9 h-9"
              ></Image>
              <Image
                src={instagram}
                alt="Logo Instagram"
                className="w-9 h-9"
              ></Image>
              <Image
                src={linkedin}
                alt="Logo LinkedIn"
                className="w-9 h-9"
              ></Image>
            </div>
            <a href="#" className="text-[#1F2937] text-[20px] hover:underline">
              domus@gmail.com
            </a>
          </div>

          <div className="border-b-4 w-[80%] border-gray-100 md:hidden"></div>

          <div className="text-center flex flex-col">
            <h2 className="mb-4 text-[#1F2937] text-[20px] font-bold">Legal</h2>
            <a href="#" className="text-[#1F2937] text-[20px] hover:underline">
              Términos de uso
            </a>
            <a href="#" className="text-[#1F2937] text-[20px] hover:underline">
              Políticas de privacidad
            </a>
            <p className="text-[#1F2937] text-[20px]">©2023</p>
          </div>

          <div className="border-b-4 w-[80%] border-gray-100 md:hidden"></div>

          <div className="flex flex-col items-center gap-3">
            <Link href={"/"}>
              <Image
                src={logo}
                alt="Domus Logo"
                className="bg-slate-900 w-40"
              ></Image>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
