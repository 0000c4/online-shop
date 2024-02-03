import React, { useEffect } from "react";
import {observer} from 'mobx-react-lite' 
import DeviceStore from "../store/DeviceStore";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import Pages from "../components/Pages";
import { fetchDevices } from "../http/deviceAPI";
const Shop = () => {
    useEffect(()=>{
        DeviceStore.initStore()
    },[])
    useEffect(()=>{
        fetchDevices(DeviceStore.selectedType.id, DeviceStore.selectedBrand.id, DeviceStore.page, DeviceStore.limit).then(data=>{
            DeviceStore.setItems(data.rows)
            DeviceStore.setTotalCount(data.count)
        })
    },[DeviceStore.page])
    return (
        <div className="mx-auto mt-10 max-w-[1400px] flex gap-6">
            <TypeBar />
            <div className="mx-auto">
                <BrandBar />
                <DeviceList />
                <Pages/>
            </div>


        </div>
    )
}
export default observer(Shop)