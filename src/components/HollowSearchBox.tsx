import React from 'react'
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { fetchCenters, fetchHideStatus } from '../api/inventoryHideApi.ts'
import { useQuery } from '@tanstack/react-query'

const HollowSearchBox: React.FC<HollowSearchBoxProps> = ({
    skuId,
    hideCenter,
    hideStatus,
    setSkuId,
    setHideCenter,
    setHideStatus,
    onClickSearchButton,
}) => {
    const {
        data: centerList,
        isLoading: isCentersLoading,
        isError: isCentersError,
        error: centersError,
    } = useQuery({
        queryKey: ['centers'],
        queryFn: fetchCenters,
    })

    const {
        data: hideStatusList,
        isLoading: isHideStatusLoading,
        isError: isHideStatusError,
        error: hideStatusError,
    } = useQuery({
        queryKey: ['hideStatus'],
        queryFn: fetchHideStatus,
    })

    if (isCentersLoading || isHideStatusLoading) {
        return <CircularProgress />
    }
    if (isCentersError) {
        return <Typography color="error">Error: {String(centersError)}</Typography>
    }
    if (isHideStatusError) {
        return <Typography color="error">Error: {String(hideStatusError)}</Typography>
    }

    return (
        <Stack direction="row" spacing={1} mb={2} alignItems="center" flexWrap="wrap" sx={{ height: 'auto ' }}>
            <TextField
                label="SKU ID"
                variant="outlined"
                value={skuId}
                onChange={(e) => setSkuId(e.target.value)}
                sx={{ minWidth: 400 }}
                size="small"
            />
            <FormControl variant="outlined" size="small" sx={{ width: 400 }}>
                <InputLabel id="hide-center-label">Hide Center</InputLabel>
                <Select
                    labelId="hide-center-label"
                    label="Hide Center"
                    multiple
                    variant="outlined"
                    size="small"
                    value={hideCenter}
                    onChange={(e) => {
                        setHideCenter(e.target.value as string[])
                    }}
                    renderValue={(selected: string[]) => {
                        return (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value: string) => (
                                    <Chip key={value} label={value} size="small" />
                                ))}
                            </Box>
                        )
                    }}
                >
                    {centerList?.map((inventoryHideCenter) => (
                        <MenuItem key={inventoryHideCenter.centerId} value={inventoryHideCenter.centerId}>
                            {inventoryHideCenter.centerId}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="outlined" size="small" sx={{ width: 400 }}>
                <InputLabel id={'hide-status-label'}>Hide Status</InputLabel>
                <Select
                    labelId={'hide-status-label'}
                    label="Hide Status"
                    multiple
                    variant="outlined"
                    size="small"
                    value={hideStatus}
                    onChange={(e) => {
                        setHideStatus(e.target.value as string[])
                    }}
                    renderValue={(selected: string[]) => {
                        return (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value: string) => (
                                    <Chip key={value} label={value} size="small" />
                                ))}
                            </Box>
                        )
                    }}
                >
                    {hideStatusList?.map((inventoryHideStatus) => (
                        <MenuItem key={inventoryHideStatus.status} value={inventoryHideStatus.status}>
                            {inventoryHideStatus.status}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                sx={{ minWidth: '100px', height: '40px' }}
                onClick={onClickSearchButton}
            >
                Search
            </Button>
        </Stack>
    )
}

interface HollowSearchBoxProps {
    skuId: string
    hideCenter: string[]
    hideStatus: string[]
    setSkuId: (skuId: string) => void
    setHideCenter: (hideCenter: string[]) => void
    setHideStatus: (hideStatus: string[]) => void
    onClickSearchButton: () => void
}

export default HollowSearchBox
