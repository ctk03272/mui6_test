import React from 'react'
import { Button, MenuItem, Select, Stack, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const HollowSearchBox: React.FC<HollowSearchBoxProps> = ({
    skuId,
    hideCenter,
    hideStatus,
    setSkuId,
    setHideCenter,
    setHideStatus,
}) => {
    return (
        <Stack direction="row" spacing={1} mb={2} alignItems="center" flexWrap="wrap" sx={{ height: '40px' }}>
            <TextField
                label="SKU ID"
                variant="outlined"
                value={skuId}
                onChange={(e) => setSkuId(e.target.value)}
                sx={{ minWidth: '150px' }}
                size="small"
            />
            <Select
                value={hideCenter}
                onChange={(e) => setHideCenter(e.target.value)}
                displayEmpty
                variant="outlined"
                size="small"
                sx={{ width: '200px' }}
            >
                <MenuItem value="">Hide Center</MenuItem>
                <MenuItem value="Center A">Center A</MenuItem>
                <MenuItem value="Center B">Center B</MenuItem>
            </Select>
            <Select
                value={hideStatus}
                onChange={(e) => setHideStatus(e.target.value)}
                displayEmpty
                variant="outlined"
                sx={{ width: '200px' }}
                size="small"
            >
                <MenuItem value="">Hide Status</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>

            <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                sx={{ minWidth: '100px', height: '40px' }}
            >
                Search
            </Button>
        </Stack>
    )
}

interface HollowSearchBoxProps {
    skuId: string
    hideCenter: string
    hideStatus: string
    setSkuId: (skuId: string) => void
    setHideCenter: (hideCenter: string) => void
    setHideStatus: (hideStatus: string) => void
}

export default HollowSearchBox
