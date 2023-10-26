import Link from "next/link"
import { useRouter } from "next/router"

export default function BookingBlogNavMenu() {
    const router = useRouter()
    const id = router.query.id
    const className= 'text-center py-[8px] px-[16px] rounded-full hover:bg-[#2B2E4A] text-[#F2F2F2] transition hover:shadow-lg self-center'
    const classNameSelected = 'text-center py-[8px] px-[16px] rounded-full bg-[#2B2E4A] text-[#F2F2F2] transition shadow-lg self-center' 

    return(
        <> 
            <nav className='hidden lg:inline-block bg-[#FF7068] w-full'>
                <div className='flex justify-between max-w-[1024px] text-[20px] py-[12px] mx-auto font-[nunito]'>
                    <Link href={ `/bookingblog/info/${id}` } className={router.pathname.includes('info') ? classNameSelected : className}>
                        Datos de reserva
                    </Link>
                    <Link href={ `/bookingblog/pets/${id}` } className={router.pathname.includes('pets') ? classNameSelected : className}>
                        Mascotas
                    </Link>
                    <Link href={ `/bookingblog/evidence/${id}` } className={router.pathname.includes('evidence') ? classNameSelected : className}>
                        Evidencia fotográfica
                    </Link>
                    <Link href={ `/bookingblog/chat/${id}` } className={router.pathname.includes('chat') ? classNameSelected : className}>
                        Comunicación
                    </Link>
                    <Link href={ `/bookingblog/reviews/${id}` } className={router.pathname.includes('reviews') ? classNameSelected : className}>
                        Reseñas
                    </Link>
                </div>
            </nav>    
        </>
    )
}