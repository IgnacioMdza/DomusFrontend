import { useState, useEffect } from "react";
import { locations } from "@/data/locations";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function HostSearchCard() {

    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [petType, setPetType] = useState('')
    const [petSize, setPetSize] = useState('')
    const [initialDate, setInitialDate] = useState(dayjs())
    const [endDate, setEndDate] = useState(dayjs())
    
    const handleStateChange = (event) => {
        const seleccion = event.target.value;
        setState(seleccion);
    }
    const handleCityChange = (event) => {
        const seleccion = event.target.value;
        setCity(seleccion);
    }
    const handlePetTypeChange = (event) => {
        const seleccion = event.target.value;
        setPetType(seleccion);
    }
    const handlePetSizeChange = (event) => {
        const seleccion = event.target.value;
        setPetSize(seleccion);
    }

    return (
        <form className='bg-white rounded-xl flex flex-col p-[24px] gap-[20px]'>
            <h1 className='text-[24px] text-[#FF7068]'>¡Encuentra a un anfitrión!</h1>
            <div className='flex gap-[16px] w-full'>
                <select id="estados" onChange={handleStateChange} value={state} className='rounded-md border border-gray-300 p-[14px] text-black w-1/2'>
                    <option value="">Estado</option>
                        {
                            locations.map((item, index) => {
                                return(
                                        <option key={index} value={item.estado}>{item.estado}</option>
                                )
                        })
                    }
                </select>
                <select id="municipios" onChange={handleCityChange} value={city} className='rounded-md border border-gray-300 p-[14px] text-black w-1/2'>
                    <option value="">Municipio</option>
                    { 
                        locations
                            .filter(item => item.estado === state)[0]?.municipios.map((municipio, index) => {
                                return (
                                    <option key={index} value={municipio}>
                                        {municipio}
                                    </option>
                            )})
                    }
                </select>
            </div>
            <div className='flex gap-[16px] w-full'>
                <select id="estados" onChange={handlePetTypeChange} value={petType} className='rounded-md border border-gray-300 p-[14px] text-black w-1/2'>
                    <option value="">Tipo</option>
                    <option value="dog">Perro</option>
                    <option value="cat">Gato</option> 
                </select>
                <select id="municipios" onChange={handlePetSizeChange} value={petSize} className='rounded-md border border-gray-300 p-[14px] text-black w-1/2'>
                    <option value="">Tamaño</option>
                    <option value="small">Chico</option>
                    <option value="medium">Mediano</option> 
                    <option value="big">Grande</option> 
                </select>
            </div>
            <div className='flex gap-[16px] w-full'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        label="Fecha de entrada"
                        value={initialDate}  
                        onChange={(newValue) => {setInitialDate(newValue), setEndDate(newValue)}}
                        disablePast
                        className='w-1/2'
                    />
                    <DatePicker 
                        label="Fecha de salida"
                        value={endDate}  
                        onChange={(newValue) => setEndDate(newValue)}
                        minDate={initialDate}
                        className='w-1/2'
                    />
                </LocalizationProvider>
            </div>
            <button
                type='submit'
                className='bg-[#FF7068] rounded-xl py-[12px] text-[#F2F2F2] text-[16px] font-smibold hover:cursor-pointer transition hover:bg-[#F2F2F2] hover:text-[#FF7068] hover:border hover:border-[#FF7068] hover:py-[11px] w-full hover:shadow-xl'>
                    Realizar busqueda
            </button>
        </form>
    )
}