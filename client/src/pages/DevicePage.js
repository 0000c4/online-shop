import React, { useEffect, useState } from "react";
import { fetchOneDevice } from '../http/deviceAPI'
import { useParams } from "react-router-dom";
const DevicePage = () => {
    const [device, setDevice] = useState({});
    const [info, setInfo] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        fetchOneDevice(id).then(data => { setDevice(data); setInfo(data.device_infos) });
    }, [])
    return (
        <div className="mx-auto mt-10 max-w-[1400px]">
            <div className="grid grid-cols-[1.5fr__2.5fr] gap-4">
                <div className="mx-auto">
                    <img className="max-h-96" src={process.env.REACT_APP_API_URL + device.img} alt="" srcset="" />
                </div>
                <div className="flex flex-col gap-6">
                    <div className="text-[#000000bd] text-[26px] grid grid-cols-2 break-words">
                        <h2>{device.name}</h2>
                        <span className="flex items-start justify-end gap-1">
                            Рейтинг:
                            <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15" fill="none">
                                    <path d="M7.68606 0.907272L9.26509 4.25286C9.37489 4.48555 9.5872 4.64679 9.8328 4.68404L13.3638 5.22057C13.9823 5.31462 14.2291 6.10919 13.7817 6.5651L11.2267 9.16926C11.0491 9.35034 10.9679 9.61143 11.01 9.86702L11.613 13.5442C11.7187 14.1883 11.0722 14.6793 10.5191 14.3754L7.36103 12.6394C7.14142 12.5188 6.87888 12.5188 6.65928 12.6394L3.50123 14.3754C2.94812 14.6796 2.30156 14.1883 2.40727 13.5442L3.01032 9.86702C3.05238 9.61143 2.97119 9.35034 2.79363 9.16926L0.238637 6.5651C-0.208758 6.10888 0.03801 5.31432 0.656536 5.22057L4.18751 4.68404C4.43311 4.64679 4.64542 4.48555 4.75522 4.25286L6.33424 0.907272C6.61051 0.321274 7.40951 0.321274 7.68606 0.907272Z" fill="#ED8A19" />
                                </svg>
                                {device.rating}</span>
                        </span>
                    </div>
                    <div className="text-[#000000bd] flex flex-col">
                        {info.map(e => {
                            return (<div className="flex justify-center gap-32">
                                <span>{e.title}</span>
                                <span>{e.description}</span>
                            </div>)
                        })}
                        {/*String(device.device_infos.length) > 0 ?
                            device.device_infos.map((info)=>{
                                <div className="flex justify-between">
                                    <span>{info.title}</span>
                                    <span>{info.description}</span>
                                </div>
                            })
                            :
                            <div></div>
                        */}
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[#000000bd] text-[32px] font-semibold">{device.price} ₽</span>

                        <div className="text-white text-[20px] px-4 py-2 border-[2px] border-[#101237] font-medium text-lg rounded-lg bg-[#101237] transition-all hover:bg-white hover:text-[#101237]">
                            В корзину
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DevicePage 