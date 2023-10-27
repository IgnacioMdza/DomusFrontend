import HostCard from "@/components/HostCard";
import HostSearchCard from "@/components/HostSearchCard";
import { hostsData } from "@/data/hostsData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";

export default function Search() {
  const router = useRouter();
  const [{ state, city, pettype, petsize, initialdate, enddate }, setSearchQuery] = useState({});
  const [client, setClient] = useState(null);
  const [token, setToken] = useState(null);
  const [accommodationList, setAccommodationsList] = useState([]);

  useEffect(() => {
    const { state, city, pettype, petsize, initialdate, enddate } = router.query;
    console.log(router.query);
    setSearchQuery({ state, city, pettype, petsize, initialdate, enddate });
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    fetch(`${BASE_URL}/accommodation?state=${state}&city=${city}&pettype=${pettype}&petsize=${petsize}`)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Respuesta no exitosa');
        }
        return resp.json();
      })
      .then((response) => {
        setAccommodationsList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });
  }, [router.query]);

  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    if (token && JSON.parse(atob(token.split(".")[1])).userType === "client") {
      const tokenInfo = JSON.parse(atob(token.split(".")[1]));
      setClient(tokenInfo);
      setToken(token);
    }
  }, []);

  return (
    <main className="flex flex-col lg:flex-row min-h-screen bg-white">
      <Head>
        <title>{`Busca tu anfitrión`}</title>
      </Head>
      <section className="max-w-[1024px] mx-auto mt-[90px] p-[12px] lg:p-[20px] xl:p-[40px] w-full lg:w-[38%] bg-[#F2F2F2]">
        <div className="lg:sticky lg:top-[130px] flex flex-col gap-[48px] rounded-2xl">
          <HostSearchCard />
          <Image src={"/images/seccion_hostSearch.png"} alt="map_image" height={340} width={340} className="hidden xl:inline-block rounded-full aspect-square mx-auto object-cover border"></Image>
        </div>
      </section>
      <section className="flex flex-col py-[12px] px-[16px] w-full lg:w-[62%] lg:pr-[20px] lg:ps-[10px] xl:py-[40px] xl:pr-[40px] xl:ps-[40px] lg:mt-[90px] gap-[20px] lg:gap-[32px] items-center h-full">
        <h1 className="text-[#2B2E4A] font-semibold font-[Raleway] text-center text-[20px] lg:text-[28px] ">Anfitriones disponibles</h1>
        {accommodationList && accommodationList.length > 0 ? (
          accommodationList.map((item, index) => {
            return (
              <>
                <HostCard key={index} initialDate={initialdate} endDate={enddate} hostAndHouse={item} auth={token} client={client} petsize={petsize} pettype={pettype} />
              </>
            );
          })
        ) : (
          <p className="">Lo sentimos, no encontramos ningun anfitiron que coincidiera con tus necesidades</p>
        )}
      </section>
    </main>
  );
}
