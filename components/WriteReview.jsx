export default function WriteReview() {
  const placeholder =
    "Utiliza este espacio para escribir una reseña sobre Michi...\n¿Cual fue tu experiencia cuidandolo?\n¿Cual fue su comportamiento?\n¿Es una mascota dificil?";

  return (
    <main className="rounded-[20px] bg-white p-[20px] flex flex-col text-center w-[460px] gap-3 min-h-[300px] max-h-[300px]">
      <p className="text-[#1F2937] text-[20px] font-medium">
        Califica a Michi y escribe una reseña sobre él!
      </p>
      <p className="text-[25px] mb-2">⭐️⭐️⭐️⭐️⭐️</p>
      <textarea
        className="bg-[#f2f2f2] p-2 mb-7 text-[14px] rounded-[12px]"
        placeholder={placeholder}
        name=""
        id=""
        cols="4"
        rows="4"
      ></textarea>
      <button className="text-white bg-[#FF7068] rounded-[12px] h-[40px] text-[14px] font-bold hover:scale-[102%]">
        Subir Comentario
      </button>
    </main>
  );
}
