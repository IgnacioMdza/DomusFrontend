import DayEvidence from "@/components/DayEvidence";
import { bookingsData } from "@/data/bookingsData";

export default function Evidence() {
  const startDay = Number(bookingsData[0].start_date.slice(0, 2));
  const finishDay = Number(bookingsData[0].finish_date.slice(0, 2));
  const totalDays = finishDay - startDay;
  const daysArray = [];
  for (let i = 0; i < totalDays; i++) {
    const dateToAdd = `${startDay + i}${bookingsData[0].start_date.slice(2)}`;
    daysArray.push(dateToAdd);
  }

  return (
    <main className="max-w-[1280px] p-[12px] md:p-[24px] lg:p-[32px] xl:p-[40px] min-h-screen">
      <h2 className="mt-[200px] text-center font-[Raleway] text-[32px] font-light mb-8">
        Evidencia Fotográfica
      </h2>
      <div className="p-6 bg-white rounded-[10px] max-w-fit m-auto mb-6">
        <button className="h-[140px] w-[140px] rounded-[10px] border-[6px] border-[#FF7068] text-[16px] bg-[#2B2E4A] text-white font-bold">
          <i className="fa fa-camera text-[#FF7068] text-[30px] mb-4"></i>
          <p>Firulais</p>
        </button>
      </div>
      <div className="flex flex-col gap-10">
        {daysArray.map((item, index) => (
          <DayEvidence key={index} day={index + 1} date={item} />
        ))}
      </div>
    </main>
  );
}
