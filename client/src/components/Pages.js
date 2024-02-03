import React from "react";
import { observer } from "mobx-react-lite"
import DeviceStore from "../store/DeviceStore";
import ItemList from "./ItemList";
const DeviceList = () => {
    const pageCount = Math.ceil(DeviceStore.totalCount / DeviceStore.limit)
    let pages = []
    for(let i = 0; i < pageCount; i++){
        pages.push(i+1)
    }
    console.log(pages)
    return (
        <div className="mt-6 flex gap-1 justify-center">
            {pages.map((page) => {
                return (
                    <ItemList key={page}
                        stylesNormal={"text-[#000000bd] px-2 py-1  box-content inline font-medium text-lg rounded border border-zinc-200"}
                        stylesActive={"text-white px-2 py-1  box-content inline font-medium text-lg rounded bg-[#101237]"}
                        active={DeviceStore.page === page}
                        onClick={() => {
                            DeviceStore.setPage(page)
                        }
                        }
                    >
                        {page}
                    </ItemList>
                )
            })}
        </div>
    )
}
export default observer(DeviceList)