export default function HomeSection() {
  return (
    <div>
      <h1 className="w-full border-4 border-red-600 text-center">Images</h1>
      <div className="flex gap-5 text-[20px] p-5 bg-white rounded-[10px] font-bold">
        <div className="flex flex-col gap-7 basis-1/3">
          <p>
            Recibe: <span className="font-normal">Perros</span>
          </p>
          <div>
            <p>Amenidades:</p>
            <ol className="list-disc list-inside text-[16px]">
              <li className="font-normal">Lorem ipsum dolor sit amet.</li>
              <li className="font-normal">Consectetur adipiscing elit.</li>
              <li className="font-normal">
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </li>
            </ol>
          </div>
        </div>
        <div className="flex flex-col gap-7 basis-1/3">
          <p>
            Tamaño: <span className="font-normal">Grande</span>
          </p>
          <div>
            <p>Restricciones:</p>
            <ol className="list-disc list-inside text-[16px]">
              <li className="font-normal">Lorem ipsum dolor sit amet.</li>
              <li className="font-normal">Consectetur adipiscing elit.</li>
              <li className="font-normal">
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </li>
            </ol>
          </div>
        </div>
        <div className="flex flex-col gap-7 basis-1/3 font">
          <p>
            Tiene Mascota: <span className="font-normal">Sí</span>
          </p>
          <div>
            <p>Descripción:</p>
            <p className="text-[16px] font-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
