export interface PaginationConfig {
    take?: number;
    skip?: number;
    orderColumn?: string;
    order: 'ASC' | 'DESC';
}
export declare function createPaginationConfig(query: any): PaginationConfig;
