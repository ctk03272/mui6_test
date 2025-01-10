import { forwardRef, useEffect, useRef, useState } from 'react'
import { Chip, ChipProps, SxProps, Theme, Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
import SyncIcon from '@mui/icons-material/Sync'
import { HOLLOW_CHIP_STATES } from '../type/HollowChipState.ts'

type ChipState = 'default' | 'registration' | 'hideCompleted' | 'unhiding' | 'unhideCompleted'

interface StatusChipProps extends ChipProps {
    label: string
    state: ChipState
}

export const StatusChip = styled(Chip)<{ state: ChipState }>(({ theme, state }) => {
    // 상태별 스타일
    const stateStyles = {
        default: {
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
            color: theme.palette.text.primary,
        },
        registration: {
            backgroundColor: theme.palette.info.main,
            color: theme.palette.info.contrastText,
        },
        hideCompleted: {
            backgroundColor: theme.palette.info.main,
            color: theme.palette.info.contrastText,
        },
        unhiding: {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
        },
        unhideCompleted: {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
        },
    }

    return {
        ...stateStyles[state],
        height: 20,
        width: 60,
        maxWidth: 60,
        fontSize: theme.typography.pxToRem(10),
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        margin: '2px 2px',
        border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.info.main : theme.palette.info.dark}`,
        '&:hover': {
            cursor: 'default',
        },
        '& .MuiChip-icon': {
            marginLeft: '0px',
        },
        '& .MuiChip-label': {
            paddingLeft: '6px',
        },
    }
})

const HollowChip = forwardRef<HTMLDivElement, HollowChipProps>(({ label, state, sx }) => {
    const [isOverflowed, setIsOverflowed] = useState(false)
    const chipRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const checkOverflow = () => {
            if (chipRef.current) {
                const spanElement = chipRef.current.querySelector('span')
                if (spanElement && spanElement.scrollWidth > spanElement.clientWidth) {
                    setIsOverflowed(true)
                } else {
                    setIsOverflowed(false)
                }
            }
        }
        checkOverflow()

        // 윈도우 리사이즈 시 오버플로우 다시 확인
        window.addEventListener('resize', checkOverflow)
        return () => window.removeEventListener('resize', checkOverflow)
    }, [])

    const icon =
        state === HOLLOW_CHIP_STATES.REGISTRATION || state === HOLLOW_CHIP_STATES.UNHIDING ? (
            <SyncIcon
                fontSize="inherit"
                sx={{
                    fontSize: '10px',
                    marginRight: 0,
                    marginLeft: 0,
                    filter: 'brightness(0.1)',
                }}
            />
        ) : undefined

    return (
        <Tooltip title={isOverflowed ? label : ''} arrow disableHoverListener={!isOverflowed}>
            <StatusChip ref={chipRef} label={label} state={state} icon={icon} sx={sx} />
        </Tooltip>
    )
})

interface HollowChipProps extends StatusChipProps {
    sx?: SxProps<Theme>
}

HollowChip.displayName = 'HollowChip'

export default HollowChip
