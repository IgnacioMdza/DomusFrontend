import { useState } from "react";
import Image from "next/image";
import XMark from "/public/icons/xmark.svg";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


export default function BookingForModal({hostName, onClose}){
    const [mascota, setMascota] = useState('')
    const [initialDate, setInitialDate] = useState(dayjs())
    const [endDate, setEndDate] = useState(dayjs())

    const mascotas = ['Firulais', 'Michi', 'Nala', 'Rocky']
    const days = Math.round((endDate.$d.getTime() - initialDate.$d.getTime()) / 1000 / 60 / 60 / 24)
    // const validateDays = Math.sign(days) === 1 ? days : 0
    const priceByDay = 150.00
    const priceByDays = days * priceByDay
    const tarifaDomus = Math.sign(days) === 1 ? (priceByDays * 0.10) + 300 : 0
    const impuestos = ((tarifaDomus + priceByDays) * 0.16)
    const totalPrice = priceByDays + tarifaDomus + impuestos

    function handleSubmit(event) {
        event.preventDefault();
        if (mascota && initialDate && endDate) {
            const data = {
                mascota,
                initialDate,
                endDate
            };
            console.log(data)
            console.log(data.initialDate.$d)
            console.log(data.endDate.$d)
        } else {
            alert("Falta llenar un campo");
        }
    }
    return(
            <div className='p-[24px] w-[calc(100%-24px)] md:w-[calc(100%-48px)] lg:w-[780px] h-[calc(100%-24px)] md:h-fit max-h-[calc(100%-24px)] flex flex-col gap-[12px] bg-white rounded-2xl overflow-auto'>
                <div className='flex w-full justify-between h-fit'>
                    <h1 className='text-[32px] font-[Raleway] font-semibold text-[#2B2E4A]'>Reserva</h1>
                    <button className='group text-xl flex px-[20px] text-[20px] font-[nunito] h-full py-[4px] md:py-[8px] items-center my-auto gap-[6px] border text-[#2B2E4A] border-[#2B2E4A] rounded-full hover:bg-[#2B2E4A] hover:text-[#F2F2F2] transition' onClick={() => onClose()
                    }><p>Cancelar</p><XMark className='fill-[#2B2E4A] group-hover:fill-[#F2F2F2] w-[22px] h-[22px] transition'/></button>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-[12px]'>
                    <p className='text-[16px] font-light font-[Nunito]'>Seleccionar mascota:</p>
                    <FormControl className='flex flex-col gap-[12px]' >
                            <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={mascota}
                            onChange={(event) => setMascota(event.target.value)}
                            >
                                <div className='flex gap-[32px] flex-wrap justify-between'>
                                    {mascotas.map((item, index) => {
                                        return(
                                            <>
                                                <FormControlLabel key={index} value={item} control={<Radio />} label={item} />
                                            </>
                                        )
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
                    <div className='flex flex-col gap-[12px]'>
                        <p className='text-[16px] font-light font-[Nunito] mb-[12px]'>Seleccionar fechas:</p>
                        <div className='flex flex-col md:flex-row w-full justify-around gap-[12px]'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                    label="Fecha de entrada"
                                    value={initialDate}  
                                    onChange={(newValue) => {setInitialDate(newValue), setEndDate(newValue)}}
                                    disablePast
                                />
                                <DatePicker 
                                    label="Fecha de salida"
                                    value={endDate}  
                                    onChange={(newValue) => setEndDate(newValue)}
                                    minDate={initialDate}
                                />
                            </LocalizationProvider>
                        </div>
                        {/* {Math.sign(days) === -1 ? <p className='text-center text-[16px] font-light font-[Nunito] text-red-500'>[Las fechas no estan en orden]</p> : null} */}
                    </div>
                    <div className='flex flex-col md:flex-row py-[16px] gap-[12px]'>
                        <div className='w-full md:w-2/5'>
                            <Image
                                src={'/images/seccion_modalReserva.png'}
                                alt="calendar_image"
                                height={2132}
                                width={2000}
                                className='rounded-xl'
                            ></Image>
                        </div>
                        <div className='flex flex-col gap-[20px] w-full md:w-3/5'>
                            <div className='w-full flex flex-col items-center font-light font-[nunito] text-[16px] gap-[8px]'>
                                <p>Información General</p>
                                <div className='h-[1px] w-full bg-[#2B2E4A]'></div>
                                <div className='flex justify-between text-[14px] w-full'>
                                    <p>Anfitrión</p>
                                    <p>{hostName}</p>
                                </div>
                                <div className='flex justify-between text-[14px] w-full'>
                                    <p>Ubicación</p>
                                    <p>Guadalajara, Jalisco</p>
                                </div>
                                <div className='flex justify-between text-[14px] w-full'>
                                    <p>Domicilio</p>
                                    <p>Colonia Centro Av X no.19</p>
                                </div>
                            </div>
                            <div className='w-full flex flex-col items-center font-light font-[nunito] text-[16px] gap-[8px]'>
                                <p>Costo de Reserva</p>
                                <div className='h-[1px] w-full bg-[#2B2E4A]'></div>
                                <div className='flex justify-between text-[14px] w-full'>
                                    <p>Noches agendadas</p>
                                    <p>{days} x ${priceByDay}</p>
                                    <p>${priceByDays}</p>
                                </div>
                                <div className='flex justify-between text-[14px] w-full'>
                                    <p>Tarifa Domus</p>
                                    <p>${tarifaDomus}</p>
                                </div>
                                <div className='flex justify-between text-[14px] w-full'>
                                    <p>Impuestos</p>
                                    <p>${impuestos}</p>
                                </div>
                                <div className='flex justify-between text-[20px] w-full font-bold'>
                                    <p>TOTAL</p>
                                    <p>${totalPrice} MXN</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                    type='submit'
                    className='bg-[#FF7068] rounded-full py-[10px] text-[#F2F2F2] text-[20px] font-[nunito] font-bold hover:cursor-pointer transition hover:bg-[#F2F2F2] hover:text-[#FF7068] hover:border hover:border-[#FF7068] hover:py-[9px] w-full hover:shadow-xl'>Enviar solicitud</button>
                </form>
            </div>
    )
}