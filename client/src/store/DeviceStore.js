import { makeAutoObservable } from "mobx"
import {fetchBrands, fetchDevices, fetchTypes} from '../http/deviceAPI'
class DeviceStore {
    selectedType = {}
    selectedBrand = {}
    types = []
    brands = []
    items = []
    page = 1
    totalCount = 0
    limit = 8

    constructor() {
        makeAutoObservable(this);
    }
    setTypes(types) {
        this.types = types
    }
    setBrands(brands) {
        this.brands = brands
    }
    setItems(items) {
        this.items = items
    }
    setSelectedType(selectedType) {
        this.selectedType = selectedType;
    }
    setSelectedBrand(selectedBrand) {
        this.selectedBrand = selectedBrand;
    }

    setPage(page) {
        this.page = page
    }
    setTotalCount(count) {
        this.totalCount = count
    }
    setLimit(limit) {
        this.limit = limit
    }

    async initStore(){
        try {
            const types = await fetchTypes();
            this.setTypes(types);

            const brands = await fetchBrands();
            this.setBrands(brands);

            const devices = await fetchDevices(null, null, 1, 8);
            this.setItems(devices.rows);
            this.setTotalCount(devices.count)
        } catch (error) {
            console.log(error.response.data.message)
        }

    }
}

export default new DeviceStore();