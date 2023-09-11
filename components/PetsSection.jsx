import PetCard from "./PetCard";
import NewPetCard from "./NewPetCard";

export default function PetsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <PetCard />
      <PetCard />
      <PetCard />
      <NewPetCard />
    </div>
  );
}
