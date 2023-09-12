import Image from "next/image";

const imageLoader = ({ src, width, quality }) => {
  return `https://leadership.ng/${src}`;
};

export default function BookingBlogReviewCard() {
  return (
    <main className="rounded-[20px] bg-white p-[20px] flex flex-col md:flex-row w-[460px] gap-5 items-center md:min-h-[300px] md:max-h-[300px]">
      <div className="rounded-full bg-[url('https://leadership.ng/wp-content/uploads/2023/03/davido.png')] bg-center bg-cover min-h-[110px] max-h-[110px] min-w-[110px] max-w-[110px] border-2 border-[#2B2E4A]"></div>
      <div className="w-full text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between">
          <p className="text-[24px] font-medium text-[#1F2937]">
            Julián Grajales
          </p>
          <p className="text-[24px]">⭐️⭐️⭐️⭐️⭐️</p>
        </div>
        <p className="text-[14px] text-[#6B7280] mb-5">12/Noviembre/2022</p>
        <p className="text-[14px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit
          amet.
        </p>
      </div>
    </main>
  );
}
