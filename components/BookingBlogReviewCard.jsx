import { Rating } from "@mui/material";
import Image from "next/image";

const imageLoader = ({ src, width, quality }) => {
  return `${src}`;
};

export default function BookingBlogReviewCard({
  picture,
  authorName,
  rate,
  date,
  review,
}) {
  return (
    <main className="rounded-[20px] bg-white p-[20px] flex flex-col md:flex-row w-[460px] gap-5 items-center md:min-h-[300px] md:max-h-[300px]">
      <div className={`rounded-lg border-2 border-[#2B2E4A]`}>
        <Image
          loader={imageLoader}
          src={picture}
          width={130}
          height={190}
          alt="User Picture"
          className="min-w-[120px] max-w-[120px] min-h-[140px] max-h-[140px] md:min-w-[140px] md:max-w-[140px] md:min-h-[190px] md:max-h-[190px] object-cover rounded"
        />
      </div>

      <div className="w-full h-[190px] text-center md:text-left">
        <div className="flex justify-center mb-5">
          <Rating readOnly value={rate} precision={0.5} size="large" />
        </div>
        <p className="text-[24px] font-medium text-[#1F2937]">{authorName}</p>

        <p className="text-[14px] text-[#6B7280] mb-5">{date}</p>
        <p className="text-[16px]">{review}</p>
      </div>
    </main>
  );
}
