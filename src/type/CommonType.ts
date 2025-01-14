export interface PageNationModel {
    page: number
    pageSize: number
}

export interface Page<T> {
    content: T[];            // 실제 데이터 목록
    pageable: Pageable;      // 페이징/정렬 정보
    last: boolean;
    totalElements: number;   // 전체 아이템 개수
    totalPages: number;      // 전체 페이지 수
    size: number;            // 한 페이지 당 개수
    number: number;          // 현재 페이지 (0-based)
    sort: Sort;              // 정렬 정보
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}