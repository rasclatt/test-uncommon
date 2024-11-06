import { query } from "./base.service";

export interface IItem {
    id?: string | number,
    name?: string,
    description?: string,
    deleted_at?: string
}

export const createItem = async (item: IItem) => {
    const resp = await query<IItem, IItem>('POST', 'items', item);
    return resp?.data;
};

export const getItem = async (id?: string) => {
    const resp = await query<IItem | IItem[], IItem>('GET', `items${id? `/${id}` : ''}`);
    return resp?.data;
};

export const deleteItem = async (id: string) => {
    const resp = await query<IItem, IItem>('DELETE', `items/${id}`);
    return resp?.data;
}