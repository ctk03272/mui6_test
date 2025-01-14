import React, { useEffect, useState } from 'react'
import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material'
import SkuHideDataGrid from './SkuHideDataGrid.tsx'
import { PageNationModel } from '../type/CommonType.ts'
import { useQuery } from '@tanstack/react-query'
import { fetchHideHistoryList } from '../api/inventoryHideApi.ts'
import { InventoryHide } from '../type/InventoryHide.ts'
import { mapStringToChipState } from '../type/HollowChipState.ts'

interface ChangeHistoryDialogProps {
    open: boolean
    onClose: () => void
    skuId: number | null // 전달받는 SKU ID
}

const ChangeHistoryDialog: React.FC<ChangeHistoryDialogProps> = ({ open, onClose, skuId }) => {
    const [historyData, setHistoryData] = useState<InventoryHide[]>([])
    const [paginationModel, setPaginationModel] = useState<PageNationModel>({
        page: 0,
        pageSize: 20,
    })
    const { isLoading, refetch } = useQuery({
        queryKey: ['searchHideListResponse'],
        queryFn: () => fetchHideHistoryList(skuId ?? 0),
        enabled: false,
    })
    useEffect(() => {
        if (skuId) {
            refetch().then((history) => {
                const inventoryHide = history.data?.map((it, index) => {
                    return {
                        ...it,
                        actions: true,
                        id: index,
                        registrant: `${it.createdId ?? ''}@${it.createdAt ?? ''}`,
                        modifier: `${it.modifiedId ?? ''}@${it.modifiedAt ?? ''}`,
                        hideCenterList: it.hideCenterList?.map((it) => {
                            return {
                                ...it,
                                hideStatus: mapStringToChipState(it.hideStatus),
                            }
                        }),
                    }
                })
                if (inventoryHide) {
                    setHistoryData(inventoryHide)
                }
            })
        }
        return () => {
            setHistoryData([])
        }
    }, [refetch, skuId])

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
            <DialogTitle>Change History</DialogTitle>
            <DialogContent>
                <Box sx={{ height: 700 }}>
                    <SkuHideDataGrid
                        data={historyData ?? []}
                        isLoading={isLoading}
                        rowCount={historyData?.length ?? 0}
                        selectedKeys={[
                            'id',
                            'skuId',
                            'hideCenterList',
                            'monitoringCenterCodeList',
                            'nationalDoc',
                            'minimumInventory',
                            'modifier',
                            'reason',
                        ]}
                        pageNationModel={paginationModel}
                        setPageNationModel={setPaginationModel}
                        title={'Change History'}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default ChangeHistoryDialog
