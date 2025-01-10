import { DataGrid, GridColDef, GridRenderCellParams, useGridApiRef } from '@mui/x-data-grid'
import HollowChip, { StatusChip } from './HollowChip.tsx'
import { HOLLOW_CHIP_STATES } from '../type/HollowChipState.ts'
import { Box, Button, Stack, Typography } from '@mui/material'
import HollowHtmlTooltip from './HollowHtmlToolTip.tsx'
import React, { useRef, useState } from 'react'
import { SkuHideList } from '../type/SkuHide.ts'
import ChangeHistoryDialog from './HollowChangeHistoryDialog.tsx'
import ListIcon from '@mui/icons-material/List';
import DownloadIcon from '@mui/icons-material/Download'

const SkuHideDataGrid: React.FC<SkuHideDataGridProps<(keyof SkuHideList)[]>> = ({
    selectedKeys,
    data,
    title,
    useDownload,
}) => {
    const apiRef = useGridApiRef()
    const chipLabelRef = useRef<HTMLDivElement | null>(null)
    const maxVisibleChips = 10
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [selectedSkuId, setSelectedSkuId] = useState<number | null>(null)
    const renderMonitoringCenter = (centers: string[]) => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: 0,
                }}
            >
                {centers.slice(0, maxVisibleChips).map((center, index) => (
                    <HollowChip key={index} label={center} state={HOLLOW_CHIP_STATES.DEFAULT} />
                ))}
                {centers.length > maxVisibleChips && (
                    <HollowHtmlTooltip
                        title={
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    gap: 0,
                                }}
                            >
                                {centers.map((center, index) => (
                                    <HollowChip key={index} label={center} state={HOLLOW_CHIP_STATES.DEFAULT} />
                                ))}
                            </Box>
                        }
                        leaveDelay={200}
                        placement="top"
                    >
                        <StatusChip
                            label={`+${centers.length - maxVisibleChips}`}
                            state={HOLLOW_CHIP_STATES.DEFAULT}
                            ref={chipLabelRef}
                        />
                    </HollowHtmlTooltip>
                )}
            </Box>
        )
    }

    const renderActionButtos = (params: GridRenderCellParams<Pick<SkuHideList, keyof SkuHideList>>) => {
        console.dir(params.row.skuId)
        return (
            <Button
                variant="contained"
                onClick={() => {
                    setSelectedSkuId(params.row.skuId)
                    setOpenDialog(true)
                }}
            >
                History
            </Button>
        )
    }

    const columns: GridColDef<Pick<SkuHideList, (typeof selectedKeys)[number]>>[] = [
        { field: 'skuId', headerName: 'SKU ID', width: 100 },
        {
            field: 'hiddenCenter',
            headerName: 'Hidden Management Center',
            width: 200,
            headerAlign: 'center',
            renderCell: (params) => (
                <>
                    <HollowChip label={params.value} state={HOLLOW_CHIP_STATES.DEFAULT} />
                </>
            ),
        },
        {
            field: 'monitoringCenter',
            headerName: 'Monitoring Center',
            headerAlign: 'center',
            minWidth: 276,
            flex: 1,
            renderCell: (params) => renderMonitoringCenter(params.value),
        },
        {
            field: 'nationalDoc',
            headerName: 'NationalDOC',
            headerAlign: 'center',
            align: 'right',
            width: 120,
        },
        {
            field: 'minimumInventory',
            headerName: 'Minimum Inventory',
            headerAlign: 'center',
            align: 'right',
            width: 150,
        },
        {
            field: 'startDate',
            headerName: 'Start Date',
            headerAlign: 'center',
            align: 'center',
            width: 180,
        },
        {
            field: 'endDate',
            headerName: 'End Date',
            headerAlign: 'center',
            align: 'center',
            width: 180,
        },
        {
            field: 'reasons',
            headerName: 'Reasons',
            headerAlign: 'center',
            align: 'center',
            width: 100,
        },
        {
            field: 'registrant',
            headerName: 'Registrant + CreatedAt',
            headerAlign: 'center',
            align: 'center',
            width: 250,
        },
        {
            field: 'modifier',
            headerName: 'Modifier + ModifiedAt',
            headerAlign: 'center',
            align: 'center',
            width: 250,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            headerAlign: 'center',
            align: 'center',
            width: 150,
            renderCell: (params) => renderActionButtos(params),
        },
    ]
    const filteredColumns = columns.filter((col) => selectedKeys.includes(col.field as keyof SkuHideList))
    const chipStatusExampleSx = {
        width: 120,
        height : 20,
        maxWidth: 120,
        '& .MuiChip-label': {
            paddingLeft: '12px',
        },
    }
    return (
        <div style={{ height: 600 }}>
            {/* 헤더 섹션 및 칩 상태 레전드를 한 줄에 배치 */}
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                mb={1}
                sx={{
                    height: '40px',
                }}
            >
                {/* 아이콘과 타이틀 */}
                <ListIcon/>
                <Typography variant="h6" sx={{ marginRight: '16px' }}>
                    {title}
                </Typography>

                {/* 칩 상태 레전드 */}
                <Stack direction="row" alignItems="center">
                    <HollowChip label="Registration" state={HOLLOW_CHIP_STATES.REGISTRATION} sx={chipStatusExampleSx} />
                    <HollowChip
                        label="Hide Completed"
                        state={HOLLOW_CHIP_STATES.HIDE_COMPLETED}
                        sx={chipStatusExampleSx}
                    />
                    <HollowChip label="Unhiding" state={HOLLOW_CHIP_STATES.UNHIDING} sx={chipStatusExampleSx} />
                    <HollowChip
                        label="Unhiding Complted"
                        state={HOLLOW_CHIP_STATES.UNHIDE_COMPLETED}
                        sx={chipStatusExampleSx}
                    />
                </Stack>
                {useDownload && (
                    <>
                        <Box sx={{ flexGrow: 1 }} />

                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<DownloadIcon />}
                            sx={{
                                height: '40px',
                            }}
                        >
                            Download
                        </Button>
                    </>
                )}
            </Stack>
            <DataGrid
                rows={data}
                columns={filteredColumns}
                autoPageSize
                apiRef={apiRef}
                getRowHeight={(params) => {
                    const chipWidth = 64
                    const chipHeight = 20
                    const verticalSpacing = 2 * 2

                    const columnField = 'monitoringCenter'
                    const column = apiRef.current?.getColumn(columnField)

                    const columnWidth = column?.computedWidth ?? chipWidth
                    const chipsPerRow = Math.floor(columnWidth / chipWidth)
                    const chipCount = Math.min(params.model.monitoringCenter.length, maxVisibleChips + 1)
                    const rowCount = Math.ceil(chipCount / chipsPerRow)

                    return rowCount * (chipHeight + verticalSpacing)
                }}
            />
            <ChangeHistoryDialog
                open={openDialog}
                skuId={selectedSkuId}
                onClose={() => {
                    setOpenDialog(false)
                    setSelectedSkuId(null)
                }}
            />
        </div>
    )
}

interface SkuHideDataGridProps<K extends (keyof SkuHideList)[]> {
    selectedKeys: K
    data: Pick<SkuHideList, K[number]>[]
    title: string
    useDownload?: boolean
}

export default SkuHideDataGrid
