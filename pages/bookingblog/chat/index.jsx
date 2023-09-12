import Link from "next/link"
import BookingBlogDropdownMenu from "@/components/BookingBlogDropdownMenu"
import BookingBlogNavMenu from "@/components/BookingBlogNavMenu"
import { messagesData } from "@/data/messagesData";

export default function Chat() {

    return (
        <main className='h-screen'>
                <section className="flex flex-col items-center">
                    <div className='max-w-[1024px] mt-[90px] w-full px-[24px] lg:px-0'>
                        <Link href='/bookingblog' className='text-[32px] md:text-[48px] font-[raleway] text-[#E91E63] font-bold py-[12px] inline-block'>Bitácora</Link>
                    </div>
                    <BookingBlogNavMenu/>
                    <BookingBlogDropdownMenu/>
                </section>
                <section className='max-w-[1024px] mx-auto lg:py-[12px] h-[calc(100%-224px)] md:h-[calc(100%-248px)] lg:h-[calc(100%-256px)]'>
                    <div className='bg-white h-full lg:rounded-xl p-[12px] md:p-[16px] flex flex-col gap-[16px]'>
                        <div className="h-4/5 bg-[#F2F2F2] rounded-md md:rounded-xl p-[12px] md:p-[16px] overflow-y-auto flex flex-col gap-[16px]">
                        {
                            messagesData.sort((a, b) => a.messageDate > b.messageDate).map((item, index) => {
                                return(
                                    <>
                                        <div key='index' className='flex gap-[12px]'>
                                            <img src={item.authorImage} className='rounded-full object-cover h-[52px] w-[52px]'/>
                                            {
                                                item.userType === 'client' 
                                                ? 
                                                <div className='p-[12px] bg-[#2B2E4A] flex flex-col gap-[10px] rounded-lg'>
                                                    <div className='flex flex-col gap-[2px]'>
                                                        <p className='font-bold font-[nunito] text-[#F2F2F2]'>{item.authorName}</p>
                                                        <p className='font-[nunito] text-[#F2F2F2] text-[12px]'>{item.messageDate.toDateString()} {item.messageDate.toLocaleTimeString()}</p>
                                                    </div>
                                                    <p className='text-[#F2F2F2] font-[nunito]'>{item.message}</p>
                                                </div> 
                                                : 
                                                <div className='p-[12px] bg-[#FF7068] flex flex-col gap-[10px] rounded-lg'>
                                                    <div className='flex flex-col gap-[2px]'>
                                                        <p className='font-bold font-[nunito] text-[#F2F2F2]'>{item.authorName}</p>
                                                        <p className='font-[nunito] text-[#F2F2F2] text-[12px]'>{item.messageDate.toDateString()} {item.messageDate.toLocaleTimeString()}</p>
                                                    </div>
                                                    <p className='text-[#F2F2F2] font-[nunito]'>{item.message}</p>
                                                </div> 
                                            }
                                        </div>
                                    </>
                                )
                            })
                        }
                        </div>
                        <form className='flex gap-[16px] h-1/5 items-center'>
                            <textarea className='w-4/5 resize-none rounded-md p-[12px] focus:outline-[2px] outline-[#E91E63] text-[16px] font-[nunito] h-full bg-[#F2F2F2]' placeholder='Escribe un mensaje'></textarea>
                            <button type='submit' className='w-1/5 rounded-xl bg-[#E91E63] font-[nunito] text-[20px] h-fit py-[12px] text-white hover:scale-[102%] hover:shadow-lg transition'>Enviar</button>
                        </form>
                    </div>
                </section>
        </main>
    )
}