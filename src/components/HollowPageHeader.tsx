import { Divider, Typography } from '@mui/material'
import React from 'react'
import { useActivePage } from '@toolpad/core/useActivePage'
import { useTheme } from '@mui/material/styles'

const HollowPageHeader: React.FC = () => {
    const theme = useTheme()
    const activePage = useActivePage()
    const defaultTitle = 'SCM Inventory Planning'
    return (
        <>
            <Typography variant={'h6'} color={theme.palette.primary.light}>
                {activePage?.title ?? defaultTitle}
            </Typography>
            <Divider />
        </>
    )
}

export default HollowPageHeader
