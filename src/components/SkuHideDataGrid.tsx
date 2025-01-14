import { DataGrid, GridColDef, GridRenderCellParams, useGridApiRef } from '@mui/x-data-grid'
import HollowChip, { StatusChip } from './HollowChip.tsx'
import { HOLLOW_CHIP_STATES } from '../type/HollowChipState.ts'
import { Box, Button, Stack, Typography } from '@mui/material'
import HollowHtmlTooltip from './HollowHtmlToolTip.tsx'
import React, { useRef, useState } from 'react'
import { InventoryHide, InventoryHideCenter } from '../type/InventoryHide.ts'
import ChangeHistoryDialog from './HollowChangeHistoryDialog.tsx'
import ListIcon from '@mui/icons-material/List'
import DownloadIcon from '@mui/icons-material/Download'
import { PageNationModel } from '../type/CommonType.ts'

const SkuHideDataGrid: React.FC<SkuHideDataGridProps<(keyof InventoryHide)[]>> = ({
    selectedKeys,
    data,
    rowCount,
    pageNationModel,
    setPageNationModel,
    title,
    useDownload,
    isLoading,
}) => {
    const apiRef = useGridApiRef()
    const chipLabelRef = useRef<HTMLDivElement | null>(null)
    const maxVisibleChips = 10
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [selectedSkuId, setSelectedSkuId] = useState<number | null>(null)

    const renderHideCenter = (inventoryHideCenters: InventoryHideCenter[]) => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: 0,
                }}
            >
                {inventoryHideCenters.slice(0, maxVisibleChips).map((inventoryHideCenters, index) => (
                    <HollowChip
                        key={index}
                        label={inventoryHideCenters.hideCenterCode}
                        state={inventoryHideCenters.hideStatus}
                    />
                ))}
                {inventoryHideCenters.length > maxVisibleChips && (
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
                                {inventoryHideCenters.map((inventoryHideCenters, index) => (
                                    <HollowChip
                                        key={index}
                                        label={inventoryHideCenters.hideCenterCode}
                                        state={inventoryHideCenters.hideStatus}
                                    />
                                ))}
                            </Box>
                        }
                        leaveDelay={200}
                        placement="top"
                    >
                        <StatusChip
                            label={`+${inventoryHideCenters.length - maxVisibleChips}`}
                            state={HOLLOW_CHIP_STATES.DEFAULT}
                            ref={chipLabelRef}
                        />
                    </HollowHtmlTooltip>
                )}
            </Box>
        )
    }

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

    const renderActionButtons = (params: GridRenderCellParams<Pick<InventoryHide, keyof InventoryHide>>) => {
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

    const columns: GridColDef<Pick<InventoryHide, (typeof selectedKeys)[number]>>[] = [
        { field: 'skuId', headerName: 'SKU ID', width: 100 },
        {
            field: 'hideCenterList',
            headerName: 'Hidden Management Center',
            width: 200,
            headerAlign: 'center',
            renderCell: (params) => <>{params.value && renderHideCenter(params.value)}</>,
        },
        {
            field: 'monitoringCenterCodeList',
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
            field: 'reason',
            headerName: 'Reason',
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
            renderCell: (params) => renderActionButtons(params),
        },
    ]
    const filteredColumns = columns.filter((col) => selectedKeys.includes(col.field as keyof InventoryHide))
    const chipStatusExampleSx = {
        width: 120,
        height: 20,
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
                <ListIcon />
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
                loading={isLoading}
                columns={filteredColumns}
                paginationMode="server"
                rowCount={rowCount}
                paginationModel={pageNationModel}
                pageSizeOptions={[10]}
                onPaginationModelChange={setPageNationModel}
                apiRef={apiRef}
                getRowHeight={(params) => {
                    const chipWidth = 64
                    const chipHeight = 20
                    const minRowCount = 2
                    const verticalSpacing = 2 * 2

                    const monitoringColumnField = 'monitoringCenterCodeList'
                    const monitoringColumn = apiRef.current?.getColumn(monitoringColumnField)

                    const monitoringColumnWidth = monitoringColumn?.computedWidth ?? chipWidth
                    const monitoringChipsPerRow = Math.floor(monitoringColumnWidth / chipWidth)
                    const monitoringChipCount = Math.min(
                        params.model.monitoringCenterCodeList.length,
                        maxVisibleChips + 1
                    )
                    const monitoringRowCount = Math.max(
                        Math.ceil(monitoringChipCount / monitoringChipsPerRow),
                        minRowCount
                    )

                    const inventoryHideColumnField = 'hideCenterList'
                    const inventoryHideColumn = apiRef.current?.getColumn(inventoryHideColumnField)

                    const inventoryHideColumnWidth = inventoryHideColumn?.computedWidth ?? chipWidth
                    const inventoryHideChipsPerRow = Math.floor(inventoryHideColumnWidth / chipWidth)
                    const inventoryHideChipCount = Math.min(params.model.hideCenterList.length, maxVisibleChips + 1)
                    const inventoryHideRowCount = Math.max(
                        Math.ceil(inventoryHideChipCount / inventoryHideChipsPerRow),
                        minRowCount
                    )

                    return Math.max(monitoringRowCount, inventoryHideRowCount) * (chipHeight + verticalSpacing)
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

interface SkuHideDataGridProps<K extends (keyof InventoryHide)[]> {
    selectedKeys: K
    data: Pick<InventoryHide, K[number]>[]
    rowCount: number
    pageNationModel: PageNationModel
    setPageNationModel: (pageNationModel: PageNationModel) => void
    title: string
    useDownload?: boolean
    isLoading?: boolean
}

export default SkuHideDataGrid
