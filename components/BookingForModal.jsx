import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import XMark from "/public/icons/xmark.svg";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function BookingForModal({ hostName, location, home, nightPetPrice, initialDay, endDay, onClose, userClient, hostId, authToken, checkIn, checkOut, pettype, petsize }) {
  const [mascota, setMascota] = useState("");
  const [initialDate, setInitialDate] = useState(dayjs(initialDay));
  const [endDate, setEndDate] = useState(dayjs(endDay));
  const [token, setToken] = useState(null);

  const router = useRouter();
  const urlFetch = process.env.NEXT_PUBLIC_BASE_URL;

  let days = 0
  let priceByDays = 0
  let tarifaDomus = 0
  let impuestos = 0
  let totalPrice = 0
  if(Math.round((endDate.$d.getTime() - initialDate.$d.getTime()) / 1000 / 60 / 60 / 24) > 0){
    days = Math.round((endDate.$d.getTime() - initialDate.$d.getTime()) / 1000 / 60 / 60 / 24);
    priceByDays = days * nightPetPrice;
    tarifaDomus = Math.sign(days) === 1 ? priceByDays * 0.1 + 300 : 0;
    //const impuestos = (tarifaDomus + priceByDays) * 0.16;
    impuestos = +(Math.round(((tarifaDomus + priceByDays) * 0.16) + 'e+2') + 'e-2');
    // const totalPrice = +(Math.round((priceByDays + tarifaDomus + impuestos) + 'e+2') + 'e-2');
    totalPrice = priceByDays + tarifaDomus + impuestos;
  }

  let checkInFormated = "";
  const checkInHourNumber = parseInt(checkIn.split(":")[0]);
  if (checkInHourNumber === 12) {
    checkInFormated = checkIn + " pm";
  } else if (checkInHourNumber < 12) {
    checkInFormated = checkIn + " am";
  } else if (checkInHourNumber > 12) {
    const hours = (parseInt(checkIn.split(":")[0]) - 12).toString();
    const minutes = checkIn.split(":")[1];
    checkInFormated = hours + ":" + minutes + " pm";
  }

  let checkOutFormated = "";
  const checkOutHourNumber = parseInt(checkOut.split(":")[0]);
  if (checkOutHourNumber === 12) {
    checkOutFormated = checkOut + " pm";
  } else if (checkOutHourNumber < 12) {
    checkOutFormated = checkOut + " am";
  } else if (checkOutHourNumber > 12) {
    const hours = (parseInt(checkOut.split(":")[0]) - 12).toString();
    const minutes = checkOut.split(":")[1];
    checkOutFormated = hours + ":" + minutes + " pm";
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    if(totalPrice <= 0){
      alert("Hay un problema con el orden seleccionado para las fechas");
      return
    }
    if (mascota) {
      toast.info("Creando reservación", { autoClose: 2000 });
      // const checkInNumberHour = parseInt(checkIn.split(" ")[0].split(":")[0]);
      // const checkInPeriod = checkIn.split(" ")[1];
      const checkInMinutes = parseInt(checkIn.split(" ")[0].split(":")[1]);
      let checkInHour = parseInt(checkIn.split(":")[0]);
      // if (checkInPeriod === "am" && checkInNumberHour !== 12) {
      //   checkInHour = checkInNumberHour;
      // } else if (checkInPeriod === "am" && checkInNumberHour === 12) {
      //   checkInHour = checkInNumberHour - 12;
      // } else if (checkInPeriod === "pm" && checkInNumberHour !== 12) {
      //   checkInHour = checkInNumberHour + 12;
      // } else if (checkInPeriod === "pm" && checkInNumberHour === 12) {
      //   checkInHour = checkInNumberHour;
      // }

      // const checkOutNumberHour = parseInt(checkOut.split(" ")[0].split(":")[0]);
      // const checkOutPeriod = checkOut.split(" ")[1];
      const checkOutMinutes = parseInt(checkOut.split(" ")[0].split(":")[1]);
      let checkOutHour = parseInt(checkOut.split(":")[0]);
      // if (checkOutPeriod === "am" && checkOutNumberHour !== 12) {
      //   checkOutHour = checkOutNumberHour;
      // } else if (checkOutPeriod === "am" && checkOutNumberHour === 12) {
      //   checkOutHour = checkOutNumberHour - 12;
      // } else if (checkOutPeriod === "pm" && checkOutNumberHour !== 12) {
      //   checkOutHour = checkOutNumberHour + 12;
      // } else if (checkOutPeriod === "pm" && checkOutNumberHour === 12) {
      //   checkOutHour = checkOutNumberHour;
      // }

      fetch(`${urlFetch}/reservations`, {
        method: "POST",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${authToken}`},
        body: JSON.stringify({
          client: userClient._id,
          host: hostId,
          startDate: initialDate.set("hour", checkInHour).set("minute", checkInMinutes),
          finishDate: endDate.set("hour", checkOutHour).set("minute", checkOutMinutes),
          pet: [mascota],
          status: "pending",
          cost: {
            costPerNight: nightPetPrice,
            nights: days,
            taxes: impuestos,
            domusFee: tarifaDomus,
            total: totalPrice,
          },
        }),
      })
        .then((resp) => {
          if (!resp) {
            throw new Error('Respuesta no exitosa');
          }
          return resp.json();
        })
        .then((response) => {
          // console.log("response: ", response);
          if (response.success) {
            fetch(`${urlFetch}/mailNotifications/${response.data._id}`, { method: "POST" })
              .then((resp) => {
                if (!resp) {
                  throw new Error('Respuesta no exitosa');
                }
                return resp.json();
              })
              .then((resp) => {
                if (resp.success) {
                  toast.success("Reservación creada con éxito", { autoClose: 2000 });
                  setTimeout(() => router.push(`/profile/${userClient._id}`), 2500);
                } else {
                  toast.error("Error al enviar las notificaciones");
                }
              })
              .catch((error) => {
                console.error('Error en la solicitud:', error);
                toast.error("Error de conexión al enviar las notificaciones");
              });
          } else {
            toast.error("Error al crear reservación");
          }
        })
        .catch((error) => {
          console.error('Error en la solicitud:', error);
          toast.error("Error de conexión, favor de volver a intentar en un momento");
        });
    } else {
      alert("No has seleccionado una mascota");
    }
  }
  return (
    <>
      <ToastContainer 
        position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"
      />
      <div className="p-[24px] w-[calc(100%-24px)] md:w-[calc(100%-48px)] lg:w-[780px] h-[calc(100%-24px)] md:h-fit max-h-[calc(100%-24px)] flex flex-col gap-[12px] bg-white rounded-2xl overflow-auto">
        <div className="flex w-full justify-between h-fit">
          <h1 className="text-[32px] font-[Raleway] font-semibold text-[#2B2E4A]">Reserva</h1>
          <button
            className="group text-xl flex px-[20px] text-[20px] font-[nunito] h-full py-[4px] md:py-[8px] items-center my-auto gap-[6px] border text-[#2B2E4A] border-[#2B2E4A] rounded-full hover:bg-[#2B2E4A] hover:text-[#F2F2F2] transition"
            onClick={() => onClose()}
          >
            <p>Cancelar</p>
            <XMark className="fill-[#2B2E4A] group-hover:fill-[#F2F2F2] w-[22px] h-[22px] transition" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[12px]">
          <p className="text-[16px] font-light font-[Nunito]">Seleccionar mascota:</p>
          <FormControl className="flex flex-col gap-[12px]">
            <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group" value={mascota} onChange={(event) => setMascota(event.target.value)}>
              <div className="flex gap-[32px] flex-wrap justify-between">
                {userClient &&
                  userClient.pets.map((item, index) => {
                    if (pettype === "Gato") {
                      return item.type === pettype ? (
                        <FormControlLabel key={index} value={item._id} control={<Radio />} label={item.name} />
                      ) : (
                        <FormControlLabel key={index} value="disabled" disabled control={<Radio />} label={item.name} />
                      );
                    } else if (pettype === "Perro") {
                      return item.type === pettype && item.size === petsize ? (
                        <FormControlLabel key={index} value={item._id} control={<Radio />} label={item.name} />
                      ) : (
                        <FormControlLabel key={index} value="disabled" disabled control={<Radio />} label={item.name} />
                      );
                    }
                  })}
              </div>
            </RadioGroup>
          </FormControl>
          {/* <div className='flex gap-[32px] flex-wrap justify-between px-[24px]'>
                        {mascotas.map((item, index) => {
                            return(
                                <>
                                    <div className='flex gap-[12px]'>
                                        <input type='radio' name='mascota' id={item} value={item} className='scale-[150%]'/>
                                        <label>{item}</label>
                                    </div>
                                </>
                            )
                        })}
                    </div> */}
          <div className="flex flex-col gap-[12px]">
            <p className="text-[16px] font-light font-[Nunito] mb-[12px]">Seleccionar fechas:</p>
            <div className="flex flex-col md:flex-row w-full justify-around gap-[12px]">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de entrada"
                  value={initialDate}
                  onChange={(newValue) => {
                    setInitialDate(newValue), setEndDate(newValue);
                  }}
                  disablePast
                />
                <DatePicker label="Fecha de salida" value={endDate} onChange={(newValue) => setEndDate(newValue)} minDate={initialDate} />
              </LocalizationProvider>
            </div>
            {/* {Math.sign(days) === -1 ? <p className='text-center text-[16px] font-light font-[Nunito] text-red-500'>[Las fechas no estan en orden]</p> : null} */}
          </div>
          <div className="flex flex-col md:flex-row py-[16px] gap-[12px]">
            <div className="w-full md:w-2/5">
              <Image src={"/images/seccion_modalReserva.png"} alt="calendar_image" height={2132} width={2000} className="rounded-xl"></Image>
            </div>
            <div className="flex flex-col gap-[20px] w-full md:w-3/5">
              <div className="w-full flex flex-col items-center font-light font-[nunito] text-[16px] gap-[8px]">
                <p>Información General</p>
                <div className="h-[1px] w-full bg-[#2B2E4A]"></div>
                <div className="flex justify-between w-full border px-[6px] rounded-lg border-[#2B2E4A]">
                  <p className="font-[Nunito] text-[14px] text-center sm:text-start lg:text-center xl:text-start">
                    Check-In: <span>{checkInFormated}</span>
                  </p>
                  <p className="font-[Nunito] text-[14px] text-centersm:text-start lg:text-center xl:text-start">
                    Check-Out: <span>{checkOutFormated}</span>
                  </p>
                </div>
                <div className="flex justify-between text-[14px] w-full">
                  <p>Anfitrión</p>
                  <p>{hostName}</p>
                </div>
                <div className="flex justify-between text-[14px] w-full">
                  <p>Ubicación</p>
                  <p>{location}</p>
                </div>
                <div className="flex justify-between text-[14px] w-full">
                  <p>Domicilio</p>
                  <p>{home}</p>
                </div>
              </div>
              <div className="w-full flex flex-col items-center font-light font-[nunito] text-[16px] gap-[8px]">
                <p>Costo de Reserva</p>
                <div className="h-[1px] w-full bg-[#2B2E4A]"></div>
                <div className="flex justify-between text-[14px] w-full">
                  <p>Noches agendadas</p>
                  <p>
                    {days} x ${nightPetPrice}
                  </p>
                  <p>${priceByDays}</p>
                </div>
                <div className="flex justify-between text-[14px] w-full">
                  <p>Tarifa Domus</p>
                  <p>${tarifaDomus}</p>
                </div>
                <div className="flex justify-between text-[14px] w-full">
                  <p>Impuestos</p>
                  <p>${impuestos}</p>
                </div>
                <div className="flex justify-between text-[20px] w-full font-bold">
                  <p>TOTAL</p>
                  <p>${totalPrice} MXN</p>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#FF7068] rounded-full py-[10px] text-[#F2F2F2] text-[20px] font-[nunito] font-bold hover:cursor-pointer transition hover:bg-[#F2F2F2] hover:text-[#FF7068] hover:border hover:border-[#FF7068] hover:py-[9px] w-full hover:shadow-xl"
          >
            Enviar solicitud
          </button>
        </form>
      </div>
    </>
  );
}
