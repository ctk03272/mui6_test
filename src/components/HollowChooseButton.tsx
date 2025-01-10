import React, { ChangeEvent } from 'react'
import { Box, Button, ButtonProps, IconButton, Stack, Typography } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import CloseIcon from '@mui/icons-material/Close'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

const HollowChooseButton: React.FC<HollowButtonProps> = ({ children, fileList, setFileList, ...props }) => {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files && files.length > 0) {
            setFileList(files)
        }
    }

    const handleClearFile = () => {
        setFileList(null)
    }
    return (
        <Box sx={{ position: 'relative', display: 'inline-block', width: '100%', height: '100%' }}>
            <Button
                variant="outlined"
                component="label"
                {...props}
                sx={{
                    borderStyle: 'dashed',
                    borderColor: 'primary.main',
                    textTransform: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 2,
                    minWidth: 150,
                    position: 'relative',
                    ...props.sx,
                }}
            >
                {fileList ? (
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ textAlign: 'center' }}>
                        <InsertDriveFileIcon fontSize="small" />
                        <Typography variant="body2" noWrap sx={{ flexGrow: 1 }}>
                            {fileList[0].name}
                        </Typography>
                    </Stack>
                ) : (
                    <>
                        <UploadIcon sx={{ mb: 1, fontSize: 24 }} />
                        {children}
                    </>
                )}
                <input
                    hidden
                    accept=".xls,.xlsx"
                    type="file"
                    onChange={handleFileChange}
                    multiple={false}
                />
            </Button>
            {fileList && (
                <IconButton
                    size="small"
                    onClick={handleClearFile}
                    sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        backgroundColor: 'background.paper',
                        border: '1px solid',
                        '&:hover': {
                            backgroundColor: 'grey.200',
                        },
                        boxShadow: 1,
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            )}
        </Box>
    )
}

interface HollowButtonProps extends ButtonProps {
    children: React.ReactNode
    fileList: FileList | null
    setFileList: React.Dispatch<React.SetStateAction<FileList | null>>
}

export default HollowChooseButton
