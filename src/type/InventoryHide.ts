import { HollowChipState } from './HollowChipState.ts'

export interface InventoryHideCenter {
    centerId: string
}

export interface InventoryHideStatus {
    status: string
}

export interface InventoryHideRequest {
    pageSize: number
    pageNumber: number
    skuId: number[]
    centerCode: string[]
    hideStatusList: string[]
}

export interface InventoryHide {
    id: number
    skuId: number
    hideCenterList?: InventoryHideCenter[]
    monitoringCenterCodeList: string[]
    nationalDoc: number
    minimumInventory: number
    startDate: string
    endDate: string
    registrant?: string
    modifier?: string
    reason: string
    actions?: boolean
    createdId?: string
    createdAt?: string
    modifiedId?: string
    modifiedAt?: string
}

export interface InventoryHideCenter {
    hideCenterCode: string
    hideInventory: number
    hideStatus: HollowChipState
}
