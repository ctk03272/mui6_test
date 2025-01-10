import React from 'react'
import { Typography } from '@mui/material'

const HollowSideBarFooter: React.FC<HollowSideBarFooterProps> = ({mini}) => {
    return (
        <Typography variant="caption" sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {mini ? '© IPS' : `©2025 Coupang IPS Systems`}
        </Typography>
    )
}

interface HollowSideBarFooterProps {
    mini: boolean
}

export default HollowSideBarFooter