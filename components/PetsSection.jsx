import PetCard from "./PetCard";
import NewPetCard from "./NewPetCard";

export default function PetsSection({ data, idMatch }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {data.map((item, index) => {
        return <PetCard data={item} key={index} />;
      })}
      {data.length < 4 && idMatch ? <NewPetCard /> : null}
    </div>
  );
}
