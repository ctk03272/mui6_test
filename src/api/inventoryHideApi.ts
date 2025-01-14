import axios from 'axios'
import { InventoryHide, InventoryHideCenter, InventoryHideRequest, InventoryHideStatus } from '../type/InventoryHide.ts'
import { Page } from '../type/CommonType.ts'

export const fetchCenters = async (): Promise<InventoryHideCenter[]> => {
    const res = await axios.get<InventoryHideCenter[]>('http://localhost:8080/centers')
    return res.data
}

export const fetchHideStatus = async (): Promise<InventoryHideStatus[]> => {
    const res = await axios.get<InventoryHideStatus[]>('http://localhost:8080/hide-status')
    return res.data
}

export const fetchSearchHideList = async (request: InventoryHideRequest): Promise<Page<InventoryHide>> => {
    const res = await axios.post<Page<InventoryHide>>('http://localhost:8080/hide/search', request)
    return res.data
}

export const fetchHideHistoryList = async (skuId: number): Promise<InventoryHide[]> => {
    const res = await axios.get<InventoryHide[]>('http://localhost:8080/hide/history', {
        params: { skuId },
    })
    return res.data
}
