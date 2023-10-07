import Image from "next/image"
import Link from "next/link"
import BookingBlogDropdownMenu from "@/components/BookingBlogDropdownMenu"
import BookingBlogNavMenu from "@/components/BookingBlogNavMenu"

export default function Bookingblog({ reservation }) {
    return (
        <main className='min-h-screen'>
            <section className="flex flex-col items-center">
                <div className='max-w-[1024px] mx-auto mt-[90px] bg-[#F2F2F2]'>
                    <h1 className='text-[32px] md:text-[48px] font-[raleway] font-normal py-[12px] text-center'>Bienvenido a <span className='text-[#E91E63] font-bold'>Bitácora</span></h1>
                </div>
                <BookingBlogNavMenu/>
                <BookingBlogDropdownMenu/>
            </section>
            <section className='bg-[#2B2E4A] w-full'>
                <div className='flex flex-col lg:flex-row py-[24px] md:py-[40px] px-[16px] md:px-[24px] max-w-[1280px] mx-auto items-center gap-[40px] md:gap-[40px] min-h-[calc(100vh-202px)] md:min-h-[calc(100vh-250px)]'>
                    <div className='flex flex-col gap-[28px] md:gap-[40px] lg:w-1/2 items-center'>
                        <p className='text-[#F2F2F2] font-[nunito] text-[20px] md:text-[24px] text-center'>Este es un espacio donde puedes encontrar información relevante sobre tu reserva y seguir su curso.</p>
                        <Link href={`/profiles/${reservation.data.client._id}`} className='text-[16px] md:text-[20px] font-[nunito] text-[#F2F2F2] p-[8px] text-center bg-[#FF7068] rounded-[12px] border-[3px] border-[#FF7068] hover:scale-[105%] hover:bg-opacity-50 transition shadow-xl w-full md:w-4/5'>Da click aquí para regresar a tu perfil</Link>
                    </div>
                    <Image 
                        src={"/images/seccion_bitacora.png"}
                        alt="reviews_image"
                        height={2000}
                        width={2000}
                        className='aspect-square md:w-10/12 lg:w-1/2 object-cover rounded-full mx-auto bg-[#F2F2F2] border-solid border-[4px] md:border-[8px] border-[#F2F2F2]'
                    ></Image>
                </div>
            </section>
        </main>
    )
}

export async function getServerSideProps(context) {
    const id = context.params.id;
    const response = await fetch(`http://localhost:8080/reservations/${id}`);
    if (response.status === 200) {
        const reservation = await response.json();
        return {
            props: {
                reservation,
            },
        };
    } else {
        return {
            notFound: true, 
        };
    }
}