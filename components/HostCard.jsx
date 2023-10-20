import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import BookingForModal from "./BookingForModal";
import { Stack, Rating } from "@mui/material";

export default function HostCard({
  hostName,
  auth,
  initialDate,
  endDate,
  hostAndHouse,
  client,
  pettype,
  petsize
}) {
  const [showModal, setShowModal] = useState(false);
  const [nightPetPrice, setNightPetPrice] = useState('')
  const [userClient, setUserClient] = useState('')

  useEffect(() => {
    if(client){
    fetch(`http://localhost:8080/users/${client?.id}`)
    .then(response => response.json())
        .then(response => {
            setUserClient(response.data);
            console.log(response.data)
        })
    }
  },[client?.id, client])

  useEffect(() => {
    if (pettype === 'Gato'){
      setNightPetPrice((hostAndHouse.hosting.cat.price))
    } else if (pettype === 'Perro' && petsize === 'Pequeño'){
      setNightPetPrice(hostAndHouse.hosting.dog.small.price)
    } else if (pettype === 'Perro' && petsize === 'Mediano'){
      setNightPetPrice(hostAndHouse.hosting.dog.medium.price)
    } else if (pettype === 'Perro' && petsize === 'Grande'){
      setNightPetPrice(hostAndHouse.hosting.dog.big.price)
    } else {
      setNightPetPrice('')
    }
    console.log(nightPetPrice)
  },[hostAndHouse.hosting.cat.price, hostAndHouse.hosting.dog.big.price, hostAndHouse.hosting.dog.medium.price, hostAndHouse.hosting.dog.small.price, nightPetPrice, petsize, pettype])

  return (
    <>
      <div className="bg-[#F2F2F2] flex flex-col sm:flex-row items-center p-[16px] xl:p-[16px] rounded-[10px] gap-[20px] max-w-[1280px] border">
          <img
            src={hostAndHouse.owner.picture}
            alt="host_image"
            className="w-[140px] h-[140px] rounded-full lg:w-[220px] lg:h-[220px] object-cover aspect-square"
          />
        <div className="flex flex-col gap-[6px]">
          <div className="w-full flex justify-between items-center">
            <p className="font-[Nunito] text-[#2B2E4A] text-[20px] lg:text-[24px]  font-semibold">
              {hostAndHouse.owner.name} {hostAndHouse.owner.lastname}
            </p>
            <p className="font-[Nunito] text-[#2B2E4A] text-[24px] lg:text-[28px] font-bold">
              ${nightPetPrice}
            </p>
          </div>
          <div className="flex flex-col items-center sm:flex-row sm:justify-between lg:flex-col xl:flex-row">
            <p className="font-[Nunito] text-[#2B2E4A] text-[16px]">
              {hostAndHouse.address.city}, {hostAndHouse.address.state}
            </p>
            <div className="flex gap-[24px] items-center">
              <Rating readOnly value={hostAndHouse.owner.rate} size="large"/>
              <p className="font-[Nunito] text-[#2B2E4A] text-[16px]">
                {hostAndHouse.owner.reviews.length} Reseñas
              </p>
            </div>
          </div>
          <p className="font-[Nunito] text-[14px] text-center sm:text-start lg:text-center xl:text-start">
            Fecha del {initialDate} al {endDate}
          </p>
          <p className="text-justify text-[14px font-[Nunito] text-[#2B2E4A] md:text-[16px]">
            {hostAndHouse.owner.aboutMe.length > 245 && hostAndHouse.owner.aboutMe.slice(0, 245)}...
          </p>
          <div className={`${client ? 'w-full flex justify-between sm:justify-end sm:gap-[24px] lg:justify-between xl:justify-end' : 'w-full flex place-content-end'}`}>
            <Link
              href={`/profiles/${hostAndHouse.owner._id}`}
              target="_blank"
              className="py-[12px] w-[130px] bg-[#2B2E4A] rounded-xl text-[#F2F2F2] text-center font-[Nunito] border-[2px] hover:border-[#2B2E4A] border-[#F2F2F2] hover:shadow-lg transition"
            >
              Visitar perfil
            </Link>
            { client &&
              <button
                className="py-[12px] w-[130px] bg-[#FF7068] rounded-xl text-[#F2F2F2] text-center font-[Nunito] border-[2px] hover:border-[#FF7068] border-[#F2F2F2] hover:shadow-lg transition"
                onClick={() => setShowModal(true)}
              >
                Reservar
              </button>
            }
          </div>
          <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
            <BookingForModal
              clientId={client?.id}
              hostName={hostAndHouse.owner.name + ' ' + hostAndHouse.owner.lastname}
              location={hostAndHouse.address.city + ', ' + hostAndHouse.address.state}
              home={hostAndHouse.address.street + ' #' + hostAndHouse.address.externalNumber + ', ' + hostAndHouse.address.neighbourhood}
              nightPetPrice={nightPetPrice}
              initialDay={initialDate} 
              endDay={endDate}
              userClient={userClient}
              hostId={hostAndHouse.owner._id}
              authToken={auth}
              onClose={() => setShowModal(false)}
            />
          </Modal>
        </div>
      </div>
    </>
  );
}
