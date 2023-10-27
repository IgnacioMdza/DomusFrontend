import Link from "next/link"
import Image from "next/image"

export default function Custom500() {
    return (
        <>
            <section className='min-h-[calc(100vh-90px)] lg:max-h-[calc(100vh-90px)] bg-[#F2F2F2] flex flex-col-reverse lg:flex-row items-center w-full place-content-center mt-[90px] gap-[48px] p-[16px] md:p-[24px] lg:p-[28px]'>
                <div className='rounded-full h-3/4 border-[5px]'>
                    <Image 
                        src='/images/seccion_500.png' 
                        alt='not-found-image' 
                        priority 
                        width={500} 
                        height={500}
                        className = 'rounded-full h-full w-fit object-cover aspect-square '
                    ></Image>
                </div>
                <div className='flex flex-col gap-[12px] lg:w-1/2 xl:w-1/3'>
                    <h1 className='text-[#2B2E4A] text-[24px] sm:text-[36px] lg:text-[44px] font-[Raleway] text-center mb-[8px]'>
                        ¡Oh no! Tuvimos un &nbsp;
                        <span className='font-semibold text-[#FF6868] text-[32px] sm:text-[40px] lg:text-[48px]'>
                            Error interno de conexión
                        </span>
                    </h1>
                    <Link 
                        href='/' 
                        className='bg-white shadow-xl text-center p-[10px] border-[3px] border-white rounded-full text-[#2B2E4A] text-[16px] md:text-[20px] hover:border-[#2B2E4A] hover:scale-[102%] transition active:bg-[#2B2E4A] active:border-[#2B2E4A]'>
                            Regresar a inicio
                    </Link>
                </div>
            </section>
        </>
    )
}