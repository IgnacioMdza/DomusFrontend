import Link from "next/link"
import BookingBlogDropdownMenu from "@/components/BookingBlogDropdownMenu"
import BookingBlogNavMenu from "@/components/BookingBlogNavMenu"

export default function Info(){
    return (
        <main className='min-h-screen bg-[#F2F2F2]'>
            <section className="flex flex-col items-center">
                <div className='max-w-[1024px] mt-[90px] w-full px-[24px] lg:px-0'>
                    <Link href='/bookingblog' className='text-[32px] md:text-[48px] font-[raleway] text-[#E91E63] font-bold py-[12px] inline-block'>Bitácora</Link>
                </div>
                <BookingBlogNavMenu/>
                <BookingBlogDropdownMenu/>
            </section>
            <section className='max-w-[1024px] mx-auto px-[12px] md:px-[24px] lg:px-0 py-[24px] flex flex-col gap-[24px] min-h-[calc(100vh-256px)] place-content-center'>
                <div className='flex flex-col lg:flex-row w-full gap-[24px]'>
                    <div className='rounded-xl bg-white w-full lg:w-1/2 hover:scale-[102%] hover:shadow-xl transition group'> 
                        <div className='bg-[#2B2E4A] rounded-t-xl p-[16px] text-[20px] group-hover:bg-[#E91E63] transition'>
                            <p className='text-center text-[#F2F2F2]'>
                                Datos de la reserva
                            </p>
                        </div>
                        <div className='flex flex-col gap-[16px] p-[16px] rounded-b-xl text-[16px]'>
                            <div className='flex justify-between'>
                                <p>Codigo</p>
                                <p>095FgTgds!2325</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Estatus</p>
                                <p>En proceso</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Mascota</p>
                                <p>Firulais</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Fecha inicial</p>
                                <p>13/junio/2023</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Fecha de término</p>
                                <p>13/junio/2023</p>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-xl bg-white w-full lg:w-1/2 hover:scale-[102%] hover:shadow-xl transition group'> 
                        <div className='bg-[#2B2E4A] rounded-t-xl p-[16px] text-[20px] group-hover:bg-[#E91E63] transition'>
                            <p className='text-center text-[#F2F2F2]'>
                                Contacto del anfitrion
                            </p>
                        </div>
                        <div className='flex flex-col gap-[16px] p-[16px] text-[16px]'>
                            <div className='flex justify-between'>
                                <p>Nombre</p>
                                <p>Alberto Robles</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Celular</p>
                                <p>5555555555</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Domicilio</p>
                                <p>Calle Reforma #19</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Colonia</p>
                                <p>Centro</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Ciudad</p>
                                <p>Ciudad de México</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row w-full gap-[24px]'>
                    <div className='rounded-xl bg-white w-full lg:w-1/2 hover:scale-[102%] hover:shadow-xl transition group'> 
                        <div className='bg-[#2B2E4A] rounded-t-xl p-[16px] text-[20px] group-hover:bg-[#E91E63] transition'>
                            <p className='text-center text-[#F2F2F2]'>
                                Costo de la reserva
                            </p>
                        </div>
                        <div className='flex flex-col gap-[16px] p-[16px] text-[16px]'>
                            <div className='flex justify-between'>
                                <p className='w-1/2'>Tipo de mascota</p>
                                <div className='flex w-1/2 justify-between'>
                                    <p>Perro | Pequeño</p>
                                    <p>$ 150</p>
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <p className='w-1/2'>Noches agendadas</p>
                                <div className='flex w-1/2 justify-between'>
                                    <p>6 x $ 150</p>
                                    <p>$ 900</p>
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <p>Tarifa Domus</p>
                                <p>$ 300</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Impuestos</p>
                                <p>$ 150</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Total</p>
                                <p>$ 1800</p>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-xl bg-white w-full lg:w-1/2 hover:scale-[102%] hover:shadow-xl transition group'> 
                        <div className='bg-[#2B2E4A] rounded-t-xl p-[16px] text-[20px] group-hover:bg-[#E91E63] transition'>
                            <p className='text-center text-[#F2F2F2]'>
                                Contacto del cliente
                            </p>
                        </div>
                        <div className='flex flex-col gap-[16px] p-[16px] rounded-b-xl text-[16px]'>
                            <div className='flex justify-between'>
                                <p>Nombre</p>
                                <p>José trujillo</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Celular</p>
                                <p>5555555555</p>
                            </div>
                            <div className=' bg-[#F2F2F2] w-full rounded-lg'>
                                <p className='text-center'>Contacto de emergencia</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Nombre</p>
                                <p>alfredo Torres</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Celular</p>
                                <p>5555555555</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}