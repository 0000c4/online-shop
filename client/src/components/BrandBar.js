import React from "react";
import { observer } from "mobx-react-lite"
import DeviceStore from "../store/DeviceStore";
import ItemList from "./ItemList";
const BrandBar = () => {
    return (
        <div className="flex gap-4">
            {DeviceStore.brands.map((brand) => {
                return (
                    <ItemList key={brand.id}
                        stylesNormal={"text-[#000000bd] px-2 py-1  box-content inline font-medium text-lg rounded-lg bg-zinc-100"}
                        stylesActive={"text-white px-2 py-1  box-content inline font-medium text-lg rounded-lg bg-slate-600"}
                        active={DeviceStore.selectedBrand.id === brand.id}
                        onClick={() => {
                            DeviceStore.setSelectedBrand(brand)
                        }
                        }
                    >
                        {brand.name}
                    </ItemList>
                )
            })}
        </div>
    )
}

export default observer(BrandBar)