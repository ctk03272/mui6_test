import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import HollowChooseButton from './HollowChooseButton.tsx'
import React, { useState } from 'react'
import UploadIcon from '@mui/icons-material/Upload'

const HollowChooseArea: React.FC<HollowChooseAreaProps> = ({ title, titleColor, onClickUpload, templateText }) => {
    const [fileList, setFileList] = useState<FileList | null>(null)
    const onClickUploadButton = () => {
        if (fileList != null) {
            onClickUpload(fileList)
        } else {
            alert('You Need To Choose File')
        }
    }

    return (
        <Card sx={{ mb: 2, boxShadow: 3 }}>
            <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <UploadIcon color="info" sx={{ color: titleColor }} />
                    <Typography variant="h6" color={titleColor}>
                        {title}
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Button variant="contained" onClick={onClickUploadButton}>
                        Upload
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            color: 'success.light',
                            borderColor: 'success.light',
                        }}
                    >
                        {templateText}
                    </Button>
                </Stack>
                <HollowChooseButton setFileList={setFileList} fileList={fileList}>
                    Choose
                </HollowChooseButton>
            </CardContent>
        </Card>
    )
}

interface HollowChooseAreaProps {
    title: string
    titleColor: string
    onClickUpload: (files: FileList) => void
    templateText: string
}

export default HollowChooseArea
