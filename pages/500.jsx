import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Custom500() {
    const router = useRouter();
    const [backRoute, setBackRoute] = useState(null)

    useEffect(() => {
        setBackRoute(router.query.back);
    }, [router]);

    return (
        <>
            <section className='min-h-[calc(100vh-90px)] font-[nunito] lg:max-h-[calc(100vh-90px)] bg-[#F2F2F2] flex flex-col-reverse lg:flex-row items-center w-full place-content-center mt-[90px] gap-[48px] p-[16px] md:p-[24px] lg:p-[28px]'>
                <div className='rounded-full h-3/4 border-[4px]'>
                    <Image 
                        src='/images/seccion_500.png' 
                        alt='not-found-image' 
                        priority 
                        width={500} 
                        height={500}
                        className = 'rounded-full h-full w-fit object-cover aspect-square'
                    ></Image>
                </div>
                <div className='flex flex-col gap-[12px] lg:w-1/2 xl:w-1/3'>
                    <h1 className='text-[#2B2E4A] text-[28px] sm:text-[38px] md:text-[40px] lg:text-[44px] font-[Raleway] text-center mb-[8px]'>
                        ¡Oh no! Tuvimos un &nbsp;
                        <span className='font-semibold text-[#E91E63] text-[32px] sm:text-[40px] lg:text-[48px]'>
                            Error de conexión
                        </span>
                    </h1>
                    <Link 
                        href='/' 
                        className='bg-white hover:shadow-xl text-center p-[10px] rounded-2xl border-[3px] border-white text-[#2B2E4A] text-[20px] md:text-[24px] hover:border-[#2B2E4A] active:bg-[#2B2E4A] hover:scale-[102%]  transition duration-300'>
                            Ir a inicio
                    </Link>
                    { backRoute && 
                        <Link 
                            href={ backRoute}
                            className='bg-white hover:shadow-xl text-center p-[10px] rounded-2xl border-[3px] border-white text-[#FF6868] text-[20px] md:text-[24px] hover:border-[#FF6868] active:bg-[#FF6868] hover:scale-[102%] transition duration-300'>
                                Regresar
                        </Link>
                    }
                </div>
            </section>
        </>
    )
}