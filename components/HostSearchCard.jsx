import { locations } from "@/data/locations";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function HostSearchCard({isLanding}) {
    const router = useRouter()
    const {
        register, 
        control, 
        watch, 
        handleSubmit, 
        formState: { errors },
    } = useForm();

    function onRoute(data){
        router.push({ pathname: '/search', query: { 
            state: data.state, 
            city: data.city, 
            pettype: data.petType, 
            petsize: data.petSize, 
            initialdate: data.initialDate.format('YYYY-MM-DD'), 
            enddate: data.endDate.format('YYYY-MM-DD') 
        }})
    }

    return (
        <form onSubmit={handleSubmit(onRoute)} className={`${isLanding 
                ?'bg-white rounded-2xl flex flex-col p-[28px] gap-[12px] md:gap-[20px] shadow-xl bg-opacity-70 backdrop-blur-md border'
                :'bg-white rounded-xl flex flex-col p-[24px] gap-[12px] md:gap-[20px] shadow-xl'}`}>
            { isLanding 
                ? <h1 className='text-[24px] text-[#2B2E4A] text-center font-semibold'>¡Realiza tu primer busqueda!</h1> 
                : <h1 className='text-[24px] text-[#FF7068]'>¡Encuentra a un anfitrión!</h1>}
            <div className='flex flex-col md:flex-row lg:flex-col xl:flex-row gap-[12px] md:gap-[16px] w-full'>
                <div className='w-full md:w-1/2 lg:w-full xl:w-1/2'>
                    <select {...register("state", {required: {value: true, message: 'Selecciona un estado'}} )} className={`${isLanding ? 'rounded-md border border-gray-300 p-[14px] text-black w-full bg-[#F2F2F2]' : 'rounded-md border border-gray-300 p-[14px] text-black w-full'}`}>
                        <option value="">Estado</option>
                            {
                                locations.map((item, index) => {
                                    return(
                                            <option key={index} value={item.estado}>{item.estado}</option>
                                    )
                            })
                        }
                    </select>
                    {errors.state && (
                        <p className="text-[#2B2E4A]">{errors.state.message}</p>
                    )}
                </div>
                <div className='w-full md:w-1/2 lg:w-full xl:w-1/2'>
                    <select {...register("city", {required: {value: true, message: 'Selecciona un municipio'}})} className={`${isLanding ? 'rounded-md border border-gray-300 p-[14px] text-black w-full bg-[#F2F2F2]' : 'rounded-md border border-gray-300 p-[14px] text-black w-full'}`}>
                        <option value="">Municipio</option>
                        { 
                            locations
                                .filter(item => item.estado === watch('state'))[0]?.municipios.map((municipio, index) => {
                                    return (
                                        <option key={index} value={municipio}>
                                            {municipio}
                                        </option>
                                )})
                        }
                    </select>
                    {errors.city && (
                        <p className="text-[#2B2E4A]">{errors.city.message}</p>
                    )}
                </div>
            </div>
            <div className='flex gap-[16px] w-full'>
                <div className='w-1/2'>
                    <select {...register("petType", {required: {value: true, message: 'Selecciona un tipo de mascota'}})} className={`${isLanding ? 'rounded-md border border-gray-300 p-[14px] text-black w-full bg-[#F2F2F2]' : 'rounded-md border border-gray-300 p-[14px] text-black w-full'}`}>
                        <option value="">Tipo</option>
                        <option value="Perro">Perro</option>
                        <option value="Gato">Gato</option> 
                    </select>
                    {errors.petType && (
                        <p className="text-[#2B2E4A]">{errors.petType.message}</p>
                    )}
                </div>
                <div className='w-1/2'>
                    <select {...register("petSize", {required: {value: true, message: 'Selecciona un tamaño de mascota'}})} className={`${isLanding ? 'rounded-md border border-gray-300 p-[14px] text-black w-full bg-[#F2F2F2]' : 'rounded-md border border-gray-300 p-[14px] text-black w-full'}`}>
                    <option value="">Seleccionar</option>
                        { watch('petType') === 'Gato' 
                        ?
                            <option value="Pequeño">Chico (2-10 kilos)</option>
                        :
                        <>
                            <option value="Pequeño">Chico (2-10 kilos)</option>
                            <option value="Mediano">Mediano (10-25 kilos)</option>
                            <option value="Grande">Grande (25-50 kilos)</option>
                        </>
                        } 
                    </select>
                    {errors.petType && (
                        <p className="text-[#2B2E4A]">{errors.petType.message}</p>
                    )}
                </div>
            </div>
            <div className='flex flex-col md:flex-row lg:flex-col xl:flex-row gap-[12px] md:gap-[16px] w-full'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className='w-full md:w-1/2 lg:w-full xl:w-1/2'>
                        <Controller
                            name="initialDate"
                            control={control}
                            rules={{ required: 'Selecciona una fecha de inicio' }}
                            render={({ field }) => (
                                <DatePicker
                                    label="Fecha de entrada"
                                    value={field.value}
                                    onChange={field.onChange}
                                    minDate={dayjs()}
                                    maxDate={watch('endDate') && watch('endDate').subtract(1,"day")}
                                    className={` ${isLanding ? 'w-full bg-[#F2F2F2]' : 'w-full'}`}
                                    sx = {{
                                        label: { color: 'black'},
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'rgb(209, 213, 219)',},
                                            },
                                    }}
                                />
                            )}
                        />
                        {errors.initialDate && (
                            <p className="text-[#2B2E4A]">{errors.initialDate.message}</p>
                        )}
                    </div>
                    <div className='w-full md:w-1/2 lg:w-full xl:w-1/2'>
                        <Controller
                            name="endDate"
                            control={control}
                            rules={{ required: 'Selecciona una fecha de término' }}
                            render={({ field }) => (
                                <DatePicker
                                    label="Fecha de salida"
                                    value={field.value}
                                    onChange={field.onChange}
                                    minDate={watch('initialDate') ? watch('initialDate').add(1,"day") : dayjs().add(1,"day")}
                                    className={` ${isLanding ? 'w-full bg-[#F2F2F2]' : 'w-full'}`}
                                    sx = {{
                                            label: { color: 'black'},
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'rgb(209, 213, 219)',},
                                                },
                                    }}
                                />
                            )}
                        />
                        {errors.endDate && (
                            <p className="text-[#2B2E4A]">{errors.endDate.message}</p>
                        )}
                    </div>
                </LocalizationProvider>
            </div>
            <input
                type='submit' 
                className={` ${isLanding 
                    ? 'bg-[#2B2E4A] rounded-full py-[12px] text-[#F2F2F2] text-[20px] font-semibold hover:cursor-pointer transition hover:bg-[#F2F2F2] hover:text-[#2B2E4A] hover:border hover:border-[#2B2E4A] hover:py-[11px] w-full hover:shadow-xl' 
                    : 'bg-[#FF7068] rounded-xl py-[12px] text-[#F2F2F2] text-[16px] font-semibold hover:cursor-pointer transition hover:bg-[#F2F2F2] hover:text-[#FF7068] hover:border hover:border-[#FF7068] hover:py-[11px] w-full hover:shadow-xl'}`}
                value={` ${isLanding ? 'Buscar' : 'Realizar busqueda' }`}
            />
        </form>
    )
}