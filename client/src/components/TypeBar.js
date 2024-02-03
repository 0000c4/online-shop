import React from "react";
import {observer} from 'mobx-react-lite'
import DeviceStore from "../store/DeviceStore";
import ItemList from "./ItemList";
const TypeBar = () => {
    return (
        <div className="px-5 py-3 inline-blocks">
            <div className="flex flex-col gap-4">
                {DeviceStore.types.map(type => {
                    return <ItemList
                        key={type.id}
                        stylesActive={"px-2 py-1 text-white inline font-medium text-lg rounded-lg bg-slate-600"}
                        stylesNormal={"px-2 py-1 text-[#000000bd] inline font-medium text-lg hover:text-blue-900"}
                        active={DeviceStore.selectedType.id === type.id}
                        onClick={() => {
                            DeviceStore.setSelectedType(type)
                        }}
                    >{type.name}</ItemList>
                })}
            </div>
        </div>
    )
}
export default observer(TypeBar)