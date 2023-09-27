import HostCard from "@/components/HostCard";
import HostSearchCard from "@/components/HostSearchCard";
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
            <main className='flex flex-col lg:flex-row min-h-screen'>
                <section className='max-w-[1024px] mx-auto mt-[90px] p-[12px] lg:p-[20px] xl:p-[40px] w-full lg:w-[38%]'>
                    <div className='lg:sticky lg:top-[130px] flex flex-col gap-[24px] bg-[#2B2E4A] p-[24px] rounded-2xl shadow-xl'>
                        <HostSearchCard/>
                        <Image
                            src={"/images/seccion_hostSearch.png"}
                            alt="map_image"
                            height={360}
                            width={360}
                            className='hidden lg:inline-block rounded-full aspect-square mx-auto object-cover border'>
                        </Image>
                    </div>
                </section>
                <section className='flex flex-col py-[12px] px-[16px] w-full lg:w-[62%] lg:pr-[20px] lg:ps-[10px] xl:py-[40px] xl:pr-[40px] xl:ps-[10px] lg:mt-[90px] gap-[20px] lg:gap-[32px] items-center h-full'>
                    <h1 className='text-[#2B2E4A] font-semibold font-[Raleway] text-center text-[20px] lg:text-[28px] '>Anfitriones disponibles</h1>
                    {hostsData.filter(item => item.city === city && item.state === state && item.animalToCare.includes(animalType)).map((item, index) => {
                        return(
                            <HostCard key={index} hostProfileImage={item.hostProfileImage} hostName={item.hostName} nightPrice={item.nightPrice} city={item.city} state={item.state} raiting={item.raiting} reviewsQuantity={item.reviewsQuantity} aboutHost={item.aboutHost}/>
                        )
                    })}
                </section>
            </main>
    )
}