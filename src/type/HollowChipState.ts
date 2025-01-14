// 상태 값 정의
export const HOLLOW_CHIP_STATES = {
    DEFAULT: 'default',
    REGISTRATION: 'registration',
    HIDE_COMPLETED: 'hideCompleted',
    UNHIDING: 'unhiding',
    UNHIDE_COMPLETED: 'unhideCompleted',
} as const

export function mapStringToChipState(value: string): HollowChipState {
    switch (value.toLowerCase()) {
        case 'hide':
            return HOLLOW_CHIP_STATES.HIDE_COMPLETED;

        case 'hiding':
            return HOLLOW_CHIP_STATES.REGISTRATION;

        case 'unhide':
            return HOLLOW_CHIP_STATES.UNHIDE_COMPLETED;

        case 'unhiding':
            return HOLLOW_CHIP_STATES.UNHIDING;

        default:
            // 매핑되지 않는 값이면 DEFAULT 등으로 처리
            return HOLLOW_CHIP_STATES.DEFAULT;
    }
}

// 타입 생성
export type HollowChipState = (typeof HOLLOW_CHIP_STATES)[keyof typeof HOLLOW_CHIP_STATES]
