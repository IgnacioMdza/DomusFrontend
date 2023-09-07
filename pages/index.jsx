import SearchCard from "@/components/SearchCard";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section id="hero" className="hero max-w-[1536px] mx-auto xl:h-[800px]">
        <div className="hero__textSide">
          <h1 className="hero__h1">DOMUS</h1>
          <h2 className="hero__h2">El alojamiento ideal para tus mascotas</h2>
          <div className="hero__textSide__textImageContainer">
            <Image
              src={"/images/seccion_principal_1.png"}
              alt="hero_image"
              className="hero__image"
              height={600}
              width={600}
            ></Image>
            <p className="hero__p">
              ¿Sales de viaje y necesitas que alguien cuide de tu mascota por
              unos días? No te preocupes, alguno de nuestros anfitriones estará
              encantado de hacerlo.
            </p>
          </div>
          <div className="hero__searchCard">
            <SearchCard />
          </div>
        </div>
      </section>
    </main>
  );
}
