import Link from "next/link";
import BookingBlogDropdownMenu from "@/components/BookingBlogDropdownMenu";
import BookingBlogNavMenu from "@/components/BookingBlogNavMenu";
import PetCard from "@/components/PetCard";

export default function Pets() {
  return (
    <main className="min-h-screen bg-[#2B2E4A]">
      <section className="flex flex-col items-center bg-[#F2F2F2]">
        <div className="max-w-[1024px] mt-[90px] w-full px-[24px] lg:px-0">
          <Link
            href="/bookingblog"
            className="text-[32px] md:text-[48px] font-[raleway] text-[#E91E63] font-bold py-[12px] inline-block"
          >
            Bitácora
          </Link>
        </div>
        <BookingBlogNavMenu />
        <BookingBlogDropdownMenu />
      </section>
      <section className="max-w-[1024px] mx-auto px-[12px] md:px-[24px] lg:px-0 py-[24px] flex gap-[24px] min-h-[calc(100vh-256px)] place-content-center items-center">
        <div className="lg:w-1/2">{/* <PetCard/> */}</div>
      </section>
    </main>
  );
}
