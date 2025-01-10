import { Box, Card, CardContent, CardHeader, darken, lighten, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const SkuHideHome = () => {
    const theme = useTheme()

    const rows: AuthRowProps[] = [
        {
            team: 'Hiding Viewer(Only for View)',
            roleName: 'SKU_INVENTORY_HIDING_VIEW',
            description: 'For Hiding viewer.It allows users to acces hiding page',
            backgroundColor: theme.palette.info.main,
        },
        {
            team: 'PL Team(Whole Hiding Features)',
            roleName: 'SKU_INVENTORY_HIDING_PL',
            description: 'For PL Team. It allows users to acces hiding page and modify sku hiding',
            backgroundColor: theme.palette.success.main,
        },
        {
            team: 'CT Team(Whole Hiding Features)',
            roleName: 'SKU_INVENTORY_HIDING_CT',
            description: 'For CT Team. It allows users to acces hiding page and modify sku hiding',
            backgroundColor: theme.palette.info.main,
        },
        {
            team: 'Other Team(Whole Hiding Features)',
            roleName: 'SKU_INVENTORY_HIDING_OTHER',
            description: 'For Other Team. It allows users to acces hiding page and modify sku hiding',
            backgroundColor: theme.palette.success.main,
        },
        {
            team: 'IPC TEAM(Whole Hiding Features)',
            roleName: 'SKU_INGREDIENT_IPC',
            description: 'For IPC Team. It allows users to acces hiding page and modify sku hiding',
            backgroundColor: theme.palette.warning.main,
        },
        {
            team: 'SCM DEVELOPER',
            roleName: 'SKU_INGREDIENT_DEVELOPER',
            backgroundColor: theme.palette.error.main,
        },
    ]

    return (
        <Card sx={{ boxShadow: 3 }}>
            <CardHeader
                sx={{
                    backgroundColor: theme.palette.grey[200],
                    padding: 2,
                }}
                title={
                    <Typography variant="h6" gutterBottom color={'primary.light'}>
                        Auth List
                    </Typography>
                }
            ></CardHeader>
            <CardContent>
                {rows.map((row, index) => (
                    <AuthRow
                        key={index}
                        team={row.team}
                        roleName={row.roleName}
                        description={row.description}
                        backgroundColor={row.backgroundColor}
                    />
                ))}
                <Typography variant="body2" gutterBottom>
                    - At Okta {'->'} Identify(Saviynt) {'->'} Authweb {'->'} Applications, after select SCM_INGREDIENT, refer to above role description and apply
                </Typography>
                <Typography variant="body2" gutterBottom>
                    - If you want to use this system outside of Coupang or CPBL, please conact us via slack channel #team_jaguar.
                </Typography>
                <Typography variant="body2" gutterBottom>
                    - Okta {'->'} Identify(Saviynt) {'->'} Authweb {'->'} Applications 에서 SCM_INGREDIENT 선택 후 위
                    role 설명 참고하여 신청
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2" gutterBottom>
                        - 권한 신청 Guide :
                    </Typography>
                    <Link href="https://www.naver.com" target="_blank" rel="noopener">
                        [Guide] User guide for access request
                    </Link>
                </Stack>

            </CardContent>
        </Card>
    )
}

interface AuthRowProps {
    team: string
    roleName: string
    description?: string
    backgroundColor: string
}

const AuthRow: React.FC<AuthRowProps> = ({ team, roleName, description, backgroundColor }) => {
    return (
        <Box
            sx={{
                backgroundColor: lighten(backgroundColor, 0.85),
                borderRadius: 2,
                p: 2,
                mb: 2,
                whiteSpace: 'pre-line',
                color: darken(backgroundColor, 0.15),
            }}
        >
            <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body2">{team}</Typography>
                <ArrowForwardIcon />
                <Typography variant="body2">{roleName}</Typography>
            </Stack>
            <Typography variant="body2">{description}</Typography>
        </Box>
    )
}

export default SkuHideHome
