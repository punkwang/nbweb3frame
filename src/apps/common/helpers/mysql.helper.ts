import {Transaction} from "sequelize/types/transaction";
import {Model} from "sequelize-typescript";

export async function transaction<T>(callback: (t: Transaction) => Promise<any>): Promise<T> {
    let result: any = null;
    await global.sequelize.transaction(async (t) => {
        result = await callback(t);
    });
    return result;
}

export interface PaginateEntityResult<T> {
    items: T[],
    pageCount: number,
    totalCount: number
}

export const paginateEntity = async <T extends Model>(
    EntityClass: any,
    currentPage: number,
    pageSize: number,
    findOptions: any = {},
): Promise<PaginateEntityResult<T>> => {
    const pageInfo = paginateQuery({
        page: currentPage,
        limit: pageSize
    },)


    const items = await EntityClass.findAll({
        ...findOptions,
        limit: pageInfo.limit,
        offset: pageInfo.offset
    })

    const totalCount = await EntityClass.count({
        ...findOptions,
    })

    return {
        items: items,
        pageCount: Math.floor((totalCount + pageSize - 1) / pageSize),
        totalCount: totalCount
    };
}

const paginateQuery = (query) => {
    let page = query.page ? query.page - 1 : 0;
    page = page < 0 ? 0 : page;
    let limit = parseInt(query.limit || 10);
    limit = limit < 0 ? 10 : limit;
    const offset = page * limit;
    return {
        offset,
        limit,
    };
};