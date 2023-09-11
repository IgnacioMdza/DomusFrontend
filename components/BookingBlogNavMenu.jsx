import Link from "next/link"

export default function BookingBlogNavMenu() {

    return(
        <> 
            <nav className='hidden lg:inline-block bg-[#FF7068] w-full'>
                <div className='flex justify-between max-w-[1024px] text-[20px] py-[12px] mx-auto font-[nunito]'>
                    <Link href='binnacle' className='text-center py-[8px] px-[16px] rounded-full hover:bg-[#2B2E4A] text-[#F2F2F2] transition hover:shadow-lg self-center'>Datos de reserva</Link>
                    <Link href='binnacle' className='text-center py-[8px] px-[16px] rounded-full hover:bg-[#2B2E4A] text-[#F2F2F2] transition hover:shadow-lg self-center'>Mascotas</Link>
                    <Link href='binnacle' className='text-center py-[8px] px-[16px] rounded-full hover:bg-[#2B2E4A] text-[#F2F2F2] transition hover:shadow-lg self-center'>Evidencia fotográfica</Link>
                    <Link href='binnacle/message' className='text-center py-[8px] px-[16px] rounded-full hover:bg-[#2B2E4A] text-[#F2F2F2] transition hover:shadow-lg self-center'>Comunicación</Link>
                    <Link href='binnacle' className='text-center py-[8px] px-[16px] rounded-full hover:bg-[#2B2E4A] text-[#F2F2F2] transition hover:shadow-lg self-center'>Reseñas</Link>
                </div>
            </nav>    
        </>
    )

}