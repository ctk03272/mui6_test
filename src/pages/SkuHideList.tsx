import { useState } from 'react'
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material'
import SkuHideDataGrid from '../components/SkuHideDataGrid.tsx'
import HollowSearchBox from '../components/HollowSearchBox.tsx'

const SkuHideList = () => {
    const [skuId, setSkuId] = useState('')
    const [hideCenter, setHideCenter] = useState('')
    const [hideStatus, setHideStatus] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)

    const rows = [
        {
            id: 1,
            skuId: 123456,
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

    return (
        <Box>
            {/* SearchBox Section */}
            <HollowSearchBox
                skuId={skuId}
                hideCenter={hideCenter}
                hideStatus={hideStatus}
                setSkuId={setSkuId}
                setHideCenter={setHideCenter}
                setHideStatus={setHideStatus}
            />
            {/* Result Table */}
            <SkuHideDataGrid
                data={rows}
                selectedKeys={[
                    'id',
                    'skuId',
                    'hiddenCenter',
                    'monitoringCenter',
                    'nationalDoc',
                    'minimumInventory',
                    'startDate',
                    'endDate',
                    'registrant',
                    'modifier',
                    'reasons',
                    'actions',
                ]}
                title={'Result'}
                useDownload
            />

            {/* History Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Change History</DialogTitle>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>2023-01-01</TableCell>
                                <TableCell>Created</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>2023-06-01</TableCell>
                                <TableCell>Updated</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default SkuHideList
