import Image from "next/image";
import { useEffect, useState, useRef } from "react";

import Modal from "./Modal";
import PhotoForModal from "./PhotoForModal";
export default function DayEvidence({ day, date }) {
  const photosDiv = useRef();
  const buttonUp = useRef();
  const buttonDown = useRef();

  const [showModal1, setShowModal1] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [showModal3, setShowModal3] = useState(false)

  function DropDown() {
    if (photosDiv.current.classList.value.includes("hidden")) {
      const divClassList = photosDiv.current.classList.value.replace(
        "hidden",
        "grid "
      );
      const buttonUpClasstList = buttonUp.current.classList.value.replace(
        "hidden",
        ""
      );
      const buttonDownClassList =
        buttonDown.current.classList.value + " hidden";
      photosDiv.current.classList.value = divClassList;
      buttonUp.current.classList.value = buttonUpClasstList;
      buttonDown.current.classList.value = buttonDownClassList;
    } else {
      const divClassList =
        photosDiv.current.classList.value.replace("grid ", "") + "hidden";
      const buttonUpClasstList = buttonUp.current.classList.value + "hidden";
      const buttonDownClassList = buttonDown.current.classList.value.replace(
        "hidden",
        ""
      );
      photosDiv.current.classList.value = divClassList;
      buttonUp.current.classList.value = buttonUpClasstList;
      buttonDown.current.classList.value = buttonDownClassList;
    }
  }
  return (
    <card>
      <div className="bg-white rounded-[10px] mb-8">
        <button
          className="bg-[#2B2E4A] rounded-[10px] w-full py-3 px-6 flex items-center justify-between mb-10"
          onClick={DropDown}
        >
          <div className="flex gap-6 items-center">
            <p className="font-bold text-[28px] text-white">DÍA {day}</p>
            <p className="font-light text-[20px] text-white ">{date}</p>
          </div>
          <i
            ref={buttonDown}
            className="fa fa-caret-down text-[30px] text-white "
          ></i>
          <i
            ref={buttonUp}
            className="fa fa-caret-up text-[30px] text-white hidden"
          ></i>
        </button>
        <div
          ref={photosDiv}
          className="grid-cols-2 md:grid-cols-3 gap-8 pb-8 hidden"
        >
          <div className="max-w-[287px] m-auto">
            <p className="text-center mb-3 md:text-left">[6:00 - 11:59]</p>
            <div className=" flex flex-col lg:flex-row p-4 bg-[#f2f2f2] items-center gap-3 rounded-[10px]">
              <button className="w-[140px] h-[140px] flex justify-center items-center bg-white border-2 border-[#2B2E4A] rounded-[10px]" onClick={() => setShowModal1(true)}>
                <Image
                  src={"/images/newPetPic.png"}
                  width={140}
                  height={100}
                  alt="New Pet Image"
                />
              </button>
              <p className="font-semibold">
                Hora: <span className="font-normal">9:30</span>
              </p>
            </div>
            <Modal isVisible={showModal1} onClose={() => setShowModal1(false)}>
              <PhotoForModal onClose={() => setShowModal1(false)}/>
            </Modal>
          </div>
          <div className="max-w-[287px] m-auto">
            <p className="text-center mb-3">[12:00 - 17:59]</p>
            <div className=" flex flex-col lg:flex-row p-4 bg-[#f2f2f2] items-center gap-3 rounded-[10px]">
              <button className="w-[140px] h-[140px] flex justify-center items-center bg-white border-2 border-[#2B2E4A] rounded-[10px]" onClick={() => setShowModal2(true)}>
                <Image
                  src={"/images/newPetPic.png"}
                  width={140}
                  height={100}
                  alt="New Pet Image"
                />
              </button>
              <p className="font-semibold">
                Hora: <span className="font-normal">9:30</span>
              </p>
            </div>
            <Modal isVisible={showModal2} onClose={() => setShowModal2(false)}>
              <PhotoForModal onClose={() => setShowModal2(false)}/>
            </Modal>
          </div>
          <div className="col-span-2 md:col-span-1 max-w-[287px] m-auto">
            <p className="text-center md:text-right mb-3">[18:00 - 23:59]</p>
            <div className=" flex flex-col lg:flex-row p-4 bg-[#f2f2f2] items-center gap-3 rounded-[10px]">
              <button className="w-[140px] h-[140px] flex justify-center items-center bg-white border-2 border-[#2B2E4A] rounded-[10px]" onClick={() => setShowModal3(true)}>
                <Image
                  src={"/images/newPetPic.png"}
                  width={140}
                  height={100}
                  alt="New Pet Image"
                />
              </button>
              <p className="font-semibold">
                Hora: <span className="font-normal">9:30</span>
              </p>
            </div>
            <Modal isVisible={showModal3} onClose={() => setShowModal3(false)}>
              <PhotoForModal onClose={() => setShowModal3(false)}/>
            </Modal>
          </div>
        </div>
      </div>
    </card>
  );
}
