import React, { useEffect, useState } from 'react'
import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material'
import { SkuHideList } from '../type/SkuHide.ts'
import SkuHideDataGrid from './SkuHideDataGrid.tsx'

interface ChangeHistoryDialogProps {
    open: boolean
    onClose: () => void
    skuId: number | null // 전달받는 SKU ID
}

const ChangeHistoryDialog: React.FC<ChangeHistoryDialogProps> = ({ open, onClose, skuId }) => {
    const [historyData, setHistoryData] = useState<SkuHideList[]>([])

    useEffect(() => {
        if (skuId) {
            // Mock 데이터를 설정
            const mockData = [
                {
                    id: 1,
                    skuId: 23456,
                    hiddenCenter: 'DON1',
                    monitoringCenter: [
                        'GOY1131313',
                        'GOY1',
                        'INC1',
                        'INC4',
                        'DON1',
                        'ECH2',
                        'GOY1',
                        'INC1',
                        'INC4',
                        'DON1',
                        'ECH2',
                        'GOY1',
                        'INC1',
                        'INC4',
                        'DON1',
                        'ECH2',
                        'GOY1',
                        'INC14',
                        'INC4',
                    ],
                    nationalDoc: 1,
                    minimumInventory: 20,
                    startDate: '2023-01-01 00:00:00',
                    endDate: '2023-12-31 00:00:00',
                    reasons: 'Reason Y(Daegu2)',
                    registrant: 'User1 + 2023-01-01 00:00:00',
                    modifier: 'User2 + 2023-06-01 00:00:00',
                    actions: true,
                },
            ]
            setHistoryData(mockData)
        }
        return () => {
            setHistoryData([])
        }
    }, [skuId])

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
            <DialogTitle>Change History</DialogTitle>
            <DialogContent>
                <Box sx={{ height: 400 }}>
                    <SkuHideDataGrid
                        data={historyData}
                        selectedKeys={[
                            'id',
                            'skuId',
                            'hiddenCenter',
                            'monitoringCenter',
                            'nationalDoc',
                            'minimumInventory',
                            'modifier',
                            'reasons',
                        ]}
                        title={'Change History'}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default ChangeHistoryDialog
