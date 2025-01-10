import { styled } from '@mui/material/styles'
import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material'

const HollowHtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? theme.palette.background.default // 다크 모드 배경
                : theme.palette.background.paper, // 라이트 모드 배경
        color: theme.palette.text.primary, // 텍스트 색상
        maxWidth: 258,
        margin: 0,
        padding: 0,
        fontSize: theme.typography.pxToRem(10),
        boxShadow:
            theme.palette.mode === "dark"
                ? "0px 4px 8px rgba(0, 0, 0, 0.7)" // 다크 모드 쉐도우
                : "0px 4px 8px rgba(0, 0, 0, 0.2)", // 라이트 모드 쉐도우
        border: `1px solid ${
            theme.palette.mode === 'dark'
                ? theme.palette.grey[700] // 다크 모드 테두리
                : theme.palette.grey[300] // 라이트 모드 테두리
        }`,
    },
}))

export default HollowHtmlTooltip
