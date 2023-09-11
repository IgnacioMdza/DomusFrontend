import HostCard from "@/components/HostCard";
import SearchCard from "@/components/SearchCard";
import { hostsData } from "@/data/hostsData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Search() {

    const router = useRouter()

    const [{city, state, animalType}, setSearchQuery] = useState({});
    useEffect(() => {
        if (router.isReady) {
            const {city, state, animalType} = router.query
            console.log(router.query);
            setSearchQuery({city, state, animalType})
        }
    }, [router.isReady, router.query]);

    return (
        <main className='flex flex-col lg:flex-row p-[0px] m-[0px] min-h-screen bg-[#2B2E4A]'>
            <section className='max-w-[1024px] mx-auto mt-[90px] p-[12px] lg:p-[20px] xl:p-[40px] w-full lg:w-5/12 bg-[#F2F2F2]'>
                <div className='lg:sticky lg:top-[130px] flex flex-col gap-[32px]'>
                    <SearchCard/>
                    <Image
                    src={"/images/seccion_hostSearch.png"}
                    alt="map_image"
                    height={1000}
                    width={1258}
                    className='hidden lg:inline-block rounded-[20px]'></Image>
                </div>
            </section>
            <section className='flex flex-col py-[12px] px-[16px] w-full lg:w-7/12 lg:p-[20px] xl:p-[40px] lg:mt-[75px] gap-[20px] lg:gap-[32px] items-center h-full'>
                <h1 className='text-[#F2F2F2] font-[Raleway] text-center text-[20px] lg:text-[28px]'>Anfitriones disponibles</h1>
                {hostsData.filter(item => item.city === city && item.state === state && item.animalToCare.includes(animalType)).map((item, index) => {
                    return(
                        <HostCard key={index} hostProfileImage={item.hostProfileImage} hostName={item.hostName} nightPrice={item.nightPrice} city={item.city} state={item.state} raiting={item.raiting} reviewsQuantity={item.reviewsQuantity} aboutHost={item.aboutHost}/>
                    )
                })}
            </section>
        </main>
    )
}