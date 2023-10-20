export default function PendingReviewCard({ name }) {
  return (
    <main className="rounded-[20px] bg-white p-[20px] flex flex-col w-[460px] gap-5 justify-center items-center md:min-h-[300px] md:max-h-[300px] min-h-[375px]">
      <i className="fa fa-paw text-[80px] text-[#2c2e4a]"></i>
      <p className="text-center text-[20px] text-[#6B7280]">
        {name} aún no ha subido su reseña pero tan pronto lo haga la podrás ver
        aquí
      </p>
    </main>
  );
}
