export interface SkuHideList{
    id:number;
    skuId: number
    hiddenCenter: string
    monitoringCenter: string[]
    nationalDoc: number
    minimumInventory: number
    startDate: string
    endDate: string
    registrant: string
    modifier: string
    reasons: string
    actions:boolean
}
