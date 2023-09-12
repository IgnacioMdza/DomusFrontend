import BookingBlogReviewCard from "@/components/BookingBlogReviewCard";
import BookingBlogNavMenu from "@/components/BookingBlogNavMenu";
import BookingBlogDropdownMenu from "@/components/BookingBlogDropdownMenu";
import WriteReview from "@/components/WriteReview";
import Link from "next/link";

export default function Reviews() {
  return (
    <>
      <section className="flex flex-col items-center">
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
      <main className="mt-[30px] p-[12px] md:p-[24px] lg:p-[32px] xl:p-[40px] max-w-screen-2xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
          <WriteReview />
          <BookingBlogReviewCard />
        </div>
      </main>
    </>
  );
}
