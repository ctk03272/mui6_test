import { Box, Card, CardContent, CardHeader, darken, Link, Stack, Typography } from '@mui/material'
import HollowChooseArea from '../components/HollowChooseArea.tsx'
import ListIcon from '@mui/icons-material/List'
import { styled } from '@mui/material/styles'

const InfoTypography = styled(Typography)(({ theme }) => ({
    backgroundColor: '#FBF8E3',
    border: `1px solid ${darken('#FBF8E3', 0.1)}`,
    color: '#A58D62',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
}))

function SkuHideUnhiddenUpload() {
    return (
        <Box>
            <Card sx={{ mb: 2, boxShadow: 0 }}>
                <CardHeader
                    sx={{
                        padding: 0,
                    }}
                    title={
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <ListIcon />
                            <Typography variant="h6">Result</Typography>
                        </Stack>
                    }
                ></CardHeader>
                <CardContent
                    sx={{
                        padding: 1,
                    }}
                >
                    <InfoTypography variant="body1">
                        After uploading, please check the result of the registration file through Slack
                        #inventory_hiding_resp.
                        <br /> I f an error occurs when uploading Excel, please check if the sensitivity is not saved as
                        “Internal”.
                        <br />
                        It will work properly if you save it as “Public”.
                        <br />
                        <Link href="https://www.naver.com" target="_blank" rel="noopener">
                            Wiki
                        </Link>
                    </InfoTypography>
                </CardContent>
            </Card>

            <HollowChooseArea
                title={'Hide registration v3'}
                titleColor={'info.main'}
                templateText={'Template dowlnload for hide registration(v2.0)'}
                onClickUpload={() => {
                    console.log('clicked upload')
                }}
            />
            <HollowChooseArea
                title={'Force unhiding registration3'}
                titleColor={'error.main'}
                templateText={'Template dowlnload for unhiding registration(v1.1)'}
                onClickUpload={() => {
                    console.log('clicked upload')
                }}
            />
        </Box>
    )
}

export default SkuHideUnhiddenUpload
