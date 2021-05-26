
export interface PaginateType<TModel> {
  page: number;
  total: number;
  pages: number;
  perPage: number;
  data: TModel[];
}
