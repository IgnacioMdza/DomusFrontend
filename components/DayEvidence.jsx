import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";

import Modal from "./Modal";
import PhotoForModal from "./PhotoForModal";
export default function DayEvidence(props) {
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
      <div className="bg-white rounded-[10px] mb-8 shadow-lg">
        <button
          className="bg-[#2B2E4A] rounded-[10px] w-full py-3 px-6 flex items-center justify-between mb-10 hover:bg-[#222438] transition duration-500"
          onClick={DropDown}
        >
          <div className="flex gap-[12px] md:gap-6 items-center">
            <p className="font-bold text-[20px] md:text-[28px] text-white">DÍA {props.day}</p>
            <p className="font-light text-[14px] md:text-[20px] text-white ">{new Date(props.evidencePerDay.intervalDate).toDateString()}</p>
            {
              dayjs().isSame((new Date(props.evidencePerDay.intervalDate)), 'day') &&
              <p className="font-normal text-[16px] md:text-[20px] text-white text-center bg-[#31BB00] rounded-full px-[10px] md:px-[12px]">En curso</p>
            }
          </div>
          <i
            ref={buttonDown}
            className="fa fa-caret-down text-[24px] md:text-[30px] text-white "
          ></i>
          <i
            ref={buttonUp}
            className="fa fa-caret-up text-[30px] text-white hidden"
          ></i>
        </button>
        <div
          ref={photosDiv}
          className="col-auto grid-cols-2 md:grid-cols-3 w-full gap-8 md:gap-0 md:px-8 pb-8 hidden"
        >
          <div className="w-[150px] sm:w-[220px] md:w-[200px] lg:w-[220px] m-auto">
            <p className="text-center text-[14px] md:text-[16px] mb-3 md:text-left">[5:00 am - 11:59 am]</p>
            <div 
              className={`
                ${props.evidencePerDay.first.status === 'pending' && 
                "flex flex-col p-[16px] md:p-[20px] bg-[#F2F2F2] border border-[#757575] items-center gap-3 rounded-[10px]"}
                ${props.evidencePerDay.first.status === 'available' && 
                "flex flex-col p-[16px] md:p-[20px] bg-[#F2F2F2] border border-[#f2a94a] items-center gap-3 rounded-[10px]"}
                ${props.evidencePerDay.first.status === 'success' && 
                "flex flex-col p-[16px] md:p-[20px] bg-[#F2F2F2] border border-[#5a9545] items-center gap-3 rounded-[10px]"}
                ${props.evidencePerDay.first.status === 'defaulted' && 
                "flex flex-col p-[16px] md:py-[20px] md:px-[14px] bg-[#F2F2F2] border border-[#ab3131] items-center gap-3 rounded-[10px]"}
              `}
            >
              <button 
                className="w-[125px] h-[125px] sm:w-[160px] sm:h-[160px] flex justify-center items-center bg-white rounded-[10px] shadow-lg" 
                onClick={() => setShowModal1(true)}
              >
                {props.evidencePerDay.first.url === "" 
                ?
                  <p className='text-[16px]'>N / A</p>
                : 
                  <img src={props.evidencePerDay.first.url} alt="New Pet Image" className="w-full h-full object-cover aspect-square rounded-lg"/>
                }
              </button>
              { props.evidencePerDay.first.status === 'pending' &&
                <p className="font-medium text-[14px] lg:text-[16px] text-center text-[#757575] py-[4px] px-[10px] bg-white rounded-full">
                  Periodo no abierto
                </p>
              }
              { props.evidencePerDay.first.status === 'available' &&
                <p className="font-medium text-[14px] lg:text-[16px] text-center text-white py-[4px] px-[10px] bg-[#f2a94a] rounded-full">
                  Periodo abierto
                </p>
              }
              { props.evidencePerDay.first.status === 'success' &&
                <p className="font-medium text-[14px] lg:text-[16px] text-center text-white py-[4px] px-[10px] bg-[#5a9545] rounded-full">
                  Requisito cumplido
                </p>
              }
              { props.evidencePerDay.first.status === 'defaulted' &&
                <p className="font-medium text-[14px] lg:text-[16px] text-center text-white py-[4px] px-[10px] bg-[#ab3131] rounded-full">
                  Requisito inclumplido
                </p>
              }
            </div>
            <Modal isVisible={showModal1} onClose={() => setShowModal1(false)}>
              <PhotoForModal 
                onClose={() => setShowModal1(false)} 
                photo={props.evidencePerDay.first}
              />
            </Modal>
          </div>
          <div className="w-[150px] sm:w-[220px] md:w-[200px] lg:w-[220px] m-auto">
            <p className="text-center text-[14px] md:text-[16px] mb-3">[12:00 pm - 17:59 pm]</p>
            <div 
              className={`
                ${props.evidencePerDay.second.status === 'pending' && 
                "flex flex-col p-[16px] md:p-[20px] bg-[#F2F2F2] border border-[#757575] items-center gap-3 rounded-[10px]"}
                ${props.evidencePerDay.second.status === 'available' && 
                "flex flex-col p-[16px] md:p-[20px] bg-[#F2F2F2] border border-[#f2a94a] items-center gap-3 rounded-[10px]"}
                ${props.evidencePerDay.second.status === 'success' && 
                "flex flex-col p-[16px] md:p-[20px] bg-[#F2F2F2] border border-[#5a9545] items-center gap-3 rounded-[10px]"}
                ${props.evidencePerDay.second.status === 'defaulted' && 
                "flex flex-col p-[16px] md:py-[20px] md:px-[14px] bg-[#F2F2F2] border border-[#ab3131] items-center gap-3 rounded-[10px]"}
              `}
            >
              <button 
                className="w-[125px] h-[125px] sm:w-[160px] sm:h-[160px] flex justify-center items-center bg-white rounded-[10px] shadow-lg" 
                onClick={() => setShowModal2(true)}
              >
                {props.evidencePerDay.second.url === "" 
                ?
                  <p className='text-[16px]'>N / A</p>
                : 
                  <img src={props.evidencePerDay.second.url} alt="New Pet Image" className="w-full h-full object-cover aspect-square rounded-lg"/>
                }
              </button>
              { props.evidencePerDay.second.status === 'pending' &&
                <p className="font-medium text-[14px] lg:text-[16px] text-center text-[#757575] py-[4px] px-[10px] bg-white rounded-full">
                  Periodo no abierto
                </p>
              }
              { props.evidencePerDay.second.status === 'available' &&
                <p className="font-medium text-[14px] lg:text-[16px] text-center text-white py-[4px] px-[10px] bg-[#f2a94a] rounded-full">
                  Periodo abierto
                </p>
              }
              { props.evidencePerDay.second.status === 'success' &&
                <p className="font-medium text-[14px] lg:text-[16px] text-center text-white py-[4px] px-[10px] bg-[#5a9545] rounded-full">
                  Requisito cumplido
                </p>
              }
              { props.evidencePerDay.second.status === 'defaulted' &&
                <p className="font-medium text-[14px] lg:text-[16px] text-center text-white py-[4px] px-[10px] bg-[#ab3131] rounded-full">
                  Requisito inclumplido
                </p>
              }
            </div>
            <Modal isVisible={showModal2} onClose={() => setShowModal2(false)}>
              <PhotoForModal 
                onClose={() => setShowModal2(false)} 
                photo={props.evidencePerDay.second}
              />
            </Modal>
          </div>
          <div className="col-span-2 md:col-span-1 w-[150px] sm:w-[220px] md:w-[200px] lg:w-[220px] m-auto">
            <p className="text-center text-[14px] md:text-[16px] md:text-right mb-3">[18:00 pm - 22:59 pm]</p>
            <div 
              className={`
                ${props.evidencePerDay.third.status === 'pending' && 
                "flex flex-col p-[16px] md:p-[20px] bg-[#F2F2F2] border border-[#757575] items-center gap-3 rounded-[10px]"}
                ${props.evidencePerDay.third.status === 'available' && 
                "flex flex-col p-[16px] md:p-[20px] bg-[#F2F2F2] border border-[#f2a94a] items-center gap-3 rounded-[10px]"}
                ${props.evidencePerDay.third.status === 'success' && 
                "flex flex-col p-[16px] md:p-[20px] border bg-[#F2F2F2] border-[#5a9545] items-center gap-3 rounded-[10px]"}
                ${props.evidencePerDay.third.status === 'defaulted' && 
                "flex flex-col p-[16px] md:py-[20px] md:px-[14px] bg-[#F2F2F2] border border-[#ab3131] items-center gap-3 rounded-[10px]"}
              `}
            >
              <button 
                className="w-[125px] h-[125px] sm:w-[160px] sm:h-[160px] flex justify-center items-center bg-white rounded-[10px] shadow-lg" 
                onClick={() => setShowModal3(true)}
              >
                {
                props.evidencePerDay.third.url === "" 
                ?
                  <p className='text-[16px]'>N / A</p>
                : 
                  <img src={props.evidencePerDay.third.url} alt="New Pet Image" className="w-full h-full object-cover aspect-square rounded-lg"/>
                }
              </button>
              { props.evidencePerDay.third.status === 'pending' &&
                <p className="font-medium text-[14px] lg:text-[16px] text-center text-[#757575] py-[4px] px-[10px] bg-white rounded-full">
                  Periodo no abierto
                </p>
              }
              { props.evidencePerDay.third.status === 'available' &&
                <p className="font-medium text-[14px] lg:text-[16px] text-center text-white py-[4px] px-[10px] bg-[#f2a94a] rounded-full">
                  Periodo abierto
                </p>
              }
              { props.evidencePerDay.third.status === 'success' &&
                <p className="font-medium text-[14px] lg:text-[16px] text-center text-white py-[4px] px-[10px] bg-[#5a9545] rounded-full">
                  Requisito cumplido
                </p>
              }
              { props.evidencePerDay.third.status === 'defaulted' &&
                <p className="font-medium text-[14px] lg:text-[16px] text-center text-white py-[4px] px-[10px] bg-[#ab3131] rounded-full">
                  Requisito inclumplido
                </p>
              }
            </div>
            <Modal isVisible={showModal3} onClose={() => setShowModal3(false)}>
              <PhotoForModal 
                onClose={() => setShowModal3(false)} 
                photo={props.evidencePerDay.third}
              />
            </Modal>
          </div>
        </div>
      </div>
    </card>
  );
}
