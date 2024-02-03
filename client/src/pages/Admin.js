import React, { useState } from "react";
import {observer} from 'mobx-react-lite'
import Modal from "../components/Modal/Modal"
import DeviceStore from "../store/DeviceStore"
import { createBrand, createDevice, createType } from "../http/deviceAPI";
const Admin = () => {
    //{ name, price, brandId, typeId, info }
    
    const [modalActiveType, setModalActiveType] = useState(false);
    const [modalActiveBrand, setModalActiveBrand] = useState(false);
    const [modalActiveDevice, setModalActiveDevice] = useState(false);

    const [type, setType] = useState('');
    const [brand, setbrand] = useState('');
    //device states
    const [info, setInfo] = useState([]);
    const [device, setDevice] = useState({});
    const [file, setFile] = useState(null);

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const editInfo = (edit) => {
        setInfo(info.map(elem => elem.number == edit.number ? elem = edit : elem))
    }

    const sendDevice = async () => {
        const formData = new FormData();
        formData.append('name', device.name);
        formData.append('price', device.price);
        formData.append('img', file);
        formData.append('brandId', device.brandId);
        formData.append('typeId', device.typeId);
        formData.append('info', JSON.stringify(info));
        await createDevice(formData);
        setModalActiveDevice(false);
    }

    return (
        <div className="mx-auto mt-12 flex flex-col items-center gap-4">
            <button className="button_outline w-[200px]" onClick={() => setModalActiveType(true)}>Добавить тип</button>
            <button className="button_outline w-[200px]" onClick={() => setModalActiveBrand(true)}>Добавить бренд</button>
            <button className="button_outline w-[200px]" onClick={() => setModalActiveDevice(true)}>Добавить устройство</button>
            {/*type modal*/}
            <Modal isActive={modalActiveType} onClick={() => { setModalActiveType(false) }}>
                <div className="flex flex-col gap-5 w-96">
                    <h3 className="text-[26px]">Добавить тип</h3>
                    <input
                        value={type}
                        onChange={e => setType(e.target.value)}
                        className="border border-gray-300 rounded-md text-xl px-1 py-0.5" type="text" placeholder="Введите название типа" />
                    <div className="flex gap-2 justify-end">
                        <button
                            onClick={() => setModalActiveType(false)}
                            className="text-red-500 rounded-md px-4 py-1 border border-red-500 transition-all hover:text-white hover:bg-red-500">Закрыть</button>
                        <button
                            onClick={async () => {
                                await createType({ name: type });
                                setModalActiveType(false);
                                setType('');
                            }}

                            className="text-green-600 rounded-md px-4 py-1 border border-green-600 transition-all hover:text-white hover:bg-green-600">Добавить</button>
                    </div>
                </div>
            </Modal>
            {/*brand modal*/}
            <Modal isActive={modalActiveBrand} onClick={() => { setModalActiveBrand(false) }}>
                <div className="flex flex-col gap-5 w-96">
                    <h3 className="text-[26px]">Добавить бренд</h3>
                    <input
                        value={brand}
                        onChange={e => setbrand(e.target.value)}
                        className="border border-gray-300 rounded-md text-xl px-1 py-0.5" type="text" placeholder="Введите название бренда" />
                    <div className="flex gap-2 justify-end">
                        <button className="text-red-500 rounded-md px-4 py-1 border border-red-500 transition-all hover:text-white hover:bg-red-500"
                            onClick={() => setModalActiveBrand(false)}
                        >Закрыть</button>
                        <button
                            onClick={async () => {
                                await createBrand({ name: brand });
                                setModalActiveBrand(false);
                                setbrand('');
                            }}
                            className="text-green-600 rounded-md px-4 py-1 border border-green-600 transition-all hover:text-white hover:bg-green-600">Добавить</button>
                    </div>
                </div>
            </Modal>
            {/*device modal*/}
            <Modal isActive={modalActiveDevice} onClick={() => { setModalActiveDevice(false) }}>
                <div className="flex flex-col gap-5 w-96">
                    <h3 className="text-[26px]">Добавить устройство</h3>
                    <select name="type" className="py-2 px-3" id="">
                        <option hidden>Выберите тип</option>
                        {DeviceStore.types.map(type => {
                            return <option value={type.name} onClick={()=>setDevice({ ...device, typeId: type.id })}>{type.name}</option>
                        })}
                    </select>
                    <select
                        name="type" className="py-2 px-3" id="">
                        <option hidden>Выберите тип</option>
                        {DeviceStore.brands.map(brand => {
                            return <option value={brand.name} onClick={()=>setDevice({ ...device, brandId: brand.id })}>{brand.name}</option>
                        })}
                    </select>
                    <input type="file"
                    onChange={e=>setFile(e.target.files[0])}
                    />
                        
                    <input
                        value={device.name}
                        onChange={e => { setDevice({ ...device, name: e.target.value }) }}
                        className="border border-gray-300 rounded-md text-xl px-1 py-0.5" type="text" placeholder="Введите название устройства" />

                    <input
                        value={device.price}
                        onChange={e => { setDevice({ ...device, price: Number(e.target.value) }) }}
                        className="border border-gray-300 rounded-md text-xl px-1 py-0.5" type="text" placeholder="Введите стоимость устройства" />
                    <hr />
                    {info.map((elem) => {
                        return (
                            <div key={elem.number} className="flex flex-col gap-2">
                                <input
                                    value={elem.title}
                                    onChange={(event) => editInfo({ title: event.target.value, description: elem.description, number: elem.number })}
                                    className="border border-gray-300 rounded-md text-xl px-1 py-0.5" type="text" placeholder="Введите название свойства" />
                                <input
                                    value={elem.description}
                                    onChange={(event) => editInfo({ title: elem.title, description: event.target.value, number: elem.number })}
                                    className="border border-gray-300 rounded-md text-xl px-1 py-0.5" type="text" placeholder="Введите описание свойства" />
                                <button
                                    onClick={() => { removeInfo(elem.number) }}
                                    className="hover:text-red-500 hover:bg-white rounded-md px-4 py-1 border border-red-500 transition-all text-white bg-red-500">Удалить</button>
                            </div>
                        )
                    })}
                    <button
                        className="text-[#000000bd] px-2 py-1  box-content inline font-medium text-lg rounded-lg border-[2px] transition bg-white hover:bg-gray-100"
                        onClick={() => { addInfo() }}
                    >Добавить свойство</button>
                    <div className="flex gap-2 justify-end">
                        <button className="text-red-500 rounded-md px-4 py-1 border border-red-500 transition-all hover:text-white hover:bg-red-500"
                            onClick={() => setModalActiveDevice(false)}
                        >Закрыть</button>
                        <button 
                        onClick={()=>sendDevice()}
                        className="text-green-600 rounded-md px-4 py-1 border border-green-600 transition-all hover:text-white hover:bg-green-600">Добавить</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default observer(Admin)