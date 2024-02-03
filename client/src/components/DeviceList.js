import React from "react";
import {observer} from "mobx-react-lite"
import DeviceStore from "../store/DeviceStore";
import DeviceItem from "./DeviceItem";
const DeviceList = () =>{
    return(
        <div className="flex gap-8 flex-wrap">
            {DeviceStore.items.map((item)=>{
                return (<DeviceItem key={item.id} device={item}>

                </DeviceItem>
                )
            })}
        </div>
    )
}
export default observer(DeviceList)