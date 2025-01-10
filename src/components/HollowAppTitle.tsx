import React from 'react'
import { Stack, Typography } from '@mui/material'
import BoltIcon from '@mui/icons-material/Bolt'
import { useNavigate } from 'react-router-dom'

const HollowAppTitle: React.FC = () => {
    const navigate = useNavigate()
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            onClick={() => {
                navigate('/')
            }}
            sx={{
                cursor: 'pointer',
            }}
        >
            <BoltIcon fontSize="large" color="primary" />
            <Typography variant="h6" >SCM Inventory Planning</Typography>
        </Stack>
    )
}

export default HollowAppTitle
