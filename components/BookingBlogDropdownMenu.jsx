import BarsMenu from '/public/icons/bars-menu.svg'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router';
import XMark from "/public/icons/xmark.svg";

export default function BookingBlogDropdownMenu() {

    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    return(
        <> 
            <div className='lg:hidden bg-[#FF7068] w-full flex flex-col items-center'>
                <button 
                onClick={() => setIsOpen((prev) => !prev)}
                href='Bookingblog' 
                className='w-full py-[16px] px-[16px] flex gap-[20px] items-center place-content-center active:bg-[#d15751]'>
                    <p className='text-[20px] font-[nunito] text-[#F2F2F2]'>Menú</p>
                    {!isOpen ? <BarsMenu className='fill-[#F2F2F2] h-[24px] w-[24px]'/> : <XMark className='fill-[#F2F2F2] h-[24px] w-[24px]'/>}
                </button>

                { isOpen && 
                    <div className='bg-white w-full shadow-2xl text-[#2B2E4A] flex flex-col text-center px-[12px] text-[20px] font-[nunito]'>
                        <Link href={router.pathname === '/bookingblog' ? 'bookingblog/info' : 'info'} className='border-b py-[12px] border-[#F2F2F2]'><p>Datos de reserva</p></Link>
                        <Link href={router.pathname === '/bookingblog' ? 'bookingblog/pets' : 'pets'} className='border-b py-[12px] border-[#F2F2F2]'><p>Mascotas</p></Link>
                        <Link href={router.pathname === '/bookingblog' ? 'bookingblog/evidence' : 'evidence'} className='border-b py-[12px] border-[#F2F2F2]'><p>Evidencia fotográfica</p></Link>
                        <Link href={router.pathname === '/bookingblog' ? 'bookingblog/chat' : 'chat'} className='border-b py-[12px] border-[#F2F2F2]'><p>Comunicación</p></Link>
                        <Link href={router.pathname === '/bookingblog' ? 'bookingblog/reviews' : 'reviews'} className='py-[12px] '><p>Reseñas</p></Link>
                    </div>
                }
            </div>
        </>
    )
}