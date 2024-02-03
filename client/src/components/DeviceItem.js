import React from "react";
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react-lite"
import { DEVICE_ROUTE } from "../utils/consts";
const DeviceItem = ({ device }) => {
    const navigate = useNavigate();
    return (
        <div className="mt-6 flex flex-col gap-2 max-w-[200px]"
            onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
                {/*<img className="h-[240px] w-[360px]" src={process.env.REACT_APP_API_URL + device.img}  alt="" srcset="" />*/}
            <div style={{
                width: 200 + 'px',
                height: 200 + 'px',
                backgroundImage: `url(${process.env.REACT_APP_API_URL + device.img})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}></div>

            <span className="font-semibold text-lg">{device.price} ₽</span>
            <span className="overflow-hidden">{device.name}</span>
            <div className="flex justify-between items-center">
                <span className="flex items-center gap-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M7.68606 0.907272L9.26509 4.25286C9.37489 4.48555 9.5872 4.64679 9.8328 4.68404L13.3638 5.22057C13.9823 5.31462 14.2291 6.10919 13.7817 6.5651L11.2267 9.16926C11.0491 9.35034 10.9679 9.61143 11.01 9.86702L11.613 13.5442C11.7187 14.1883 11.0722 14.6793 10.5191 14.3754L7.36103 12.6394C7.14142 12.5188 6.87888 12.5188 6.65928 12.6394L3.50123 14.3754C2.94812 14.6796 2.30156 14.1883 2.40727 13.5442L3.01032 9.86702C3.05238 9.61143 2.97119 9.35034 2.79363 9.16926L0.238637 6.5651C-0.208758 6.10888 0.03801 5.31432 0.656536 5.22057L4.18751 4.68404C4.43311 4.64679 4.64542 4.48555 4.75522 4.25286L6.33424 0.907272C6.61051 0.321274 7.40951 0.321274 7.68606 0.907272Z" fill="#ED8A19" />
                    </svg>
                    {device.rating}
                </span>
                <div className="text-white px-2 py-1  box-content inline font-medium text-lg rounded-lg bg-[#101237]">
                    В корзину
                </div>
            </div>
        </div>
    )
}
export default observer(DeviceItem)