
export interface ISearchResult<T>  {
    count:number  // 查询数量
    data:T[]   // 查询数据
    errors: string[]
}