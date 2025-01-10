// 상태 값 정의
export const HOLLOW_CHIP_STATES = {
    DEFAULT: 'default',
    REGISTRATION: 'registration',
    HIDE_COMPLETED: 'hideCompleted',
    UNHIDING: 'unhiding',
    UNHIDE_COMPLETED: 'unhideCompleted',
} as const

// 타입 생성
export type HollowChipState = (typeof HOLLOW_CHIP_STATES)[keyof typeof HOLLOW_CHIP_STATES]
