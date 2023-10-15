import { Stack, Rating } from "@mui/material";
import Image from "next/image";

const imageLoader = ({ src, width, quality }) => {
  return `${src}`;
};

export default function ReviewCard({
  authorImage,
  authorName,
  reviewDate,
  value,
  review,
  anfitrionName,
  renderReceiver,
}) {
  return (
    <div
      href="/"
      className="w-full bg-white rounded-[16px] bg-opacity-70 p-[16px] md:p-[24px] flex flex-col sm:flex-row gap-[16px] backdrop-blur-[8px] shadow-xl sm:h-[200px] md:h-[180px] lg:h-[240px] xl:h-[180px] justify-between align-middle items-center transition lg:hover:scale-[102%] lg:hover:bg-opacity-[85%]"
    >
      <Image
        unoptimized
        alt="Profile Picture"
        loader={imageLoader}
        src={authorImage}
        className="rounded-full min-w-[120px] max-w-[120px] min-h-[120px] max-h-[120px] object-cover"
        width={120}
        height={120}
      />
      <div className="flex flex-col w-full items-center justify-between sm:justify-normal gap-[16px]">
        <div className="flex flex-col w-full items-center place-content-center gap-[4px]">
          <div className="w-full flex gap-[8px] items-center place-content-center sm:place-content-start">
            <p className="text-[16px] font-bold">{authorName}</p>
            {renderReceiver && (
              <>
                <p className="text-[16px]">a</p>
                <p className="text-[16px] py-[4px] px-[10px] bg-[#F2F2F2] rounded-full">
                  {anfitrionName}
                </p>
              </>
            )}
          </div>
          <div className="w-full flex sm:justify-between justify-around items-center">
            <p className="text-[16px] font-light font-[Nunito]">{reviewDate}</p>
            <Rating readOnly value={value} precision={0.5} size="large" />
          </div>
        </div>
        <div className="w-full text-center sm:text-left">
          <p className="text-[16px] font-normal font-[Nunito]">
            {review.slice(0, 130)}...
          </p>
        </div>
      </div>
    </div>
  );
}
