import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import SkuHideDataGrid from '../components/SkuHideDataGrid.tsx'
import HollowSearchBox from '../components/HollowSearchBox.tsx'
import { InventoryHide } from '../type/InventoryHide.ts'
import { useQuery } from '@tanstack/react-query'
import { fetchSearchHideList } from '../api/inventoryHideApi.ts'
import { PageNationModel } from '../type/CommonType.ts'
import { mapStringToChipState } from '../type/HollowChipState.ts'

const SkuHideList = () => {
    const [skuId, setSkuId] = useState('')
    const [hideCenter, setHideCenter] = useState<string[]>([])
    const [hideStatus, setHideStatus] = useState<string[]>([])
    const [rowCount, setRowCount] = useState<number>(0)
    const [rows, setRows] = useState<InventoryHide[]>([])
    const [paginationModel, setPaginationModel] = useState<PageNationModel>({
        page: 0,
        pageSize: 10,
    })

    const { isLoading, refetch } = useQuery({
        queryKey: ['searchHideListResponse'],
        queryFn: () =>
            fetchSearchHideList({
                pageSize: paginationModel.pageSize,
                pageNumber: paginationModel.page,
                skuId: skuId.length == 0 ? [] : skuId.split(',').map(Number),
                centerCode: hideCenter,
                hideStatusList: hideStatus,
            }),
        enabled: false,
    })
    const refetchData = () => {
        refetch().then((result) => {
            setRowCount(result.data?.totalElements ?? 0)
            const inventoryHide = result.data?.content.map((it, index) => {
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
                setRows(inventoryHide)
            }
        })
    }
    const onClickSearchButton = () => {
        refetchData()
    }

    useEffect(() => {
        if (paginationModel.page != 0) {
            refetchData()
        }
    }, [paginationModel])
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
                onClickSearchButton={onClickSearchButton}
            />
            {/* Result Table */}
            <SkuHideDataGrid
                data={rows}
                selectedKeys={[
                    'id',
                    'skuId',
                    'hideCenterList',
                    'monitoringCenterCodeList',
                    'nationalDoc',
                    'minimumInventory',
                    'startDate',
                    'endDate',
                    'registrant',
                    'modifier',
                    'reason',
                    'actions',
                ]}
                rowCount={rowCount}
                pageNationModel={paginationModel}
                setPageNationModel={(t) => {
                    setPaginationModel(t)
                    console.log(t)
                    console.log('pageNationModel')
                }}
                title={'Result'}
                isLoading={isLoading}
                useDownload
            />
        </Box>
    )
}

export default SkuHideList
