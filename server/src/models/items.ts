import { sqliteOpen as sqlite } from '../helpers/sqlite-client';
import { IItem } from '../../../client/src/services/items.service';

export class Items
{
    protected db: any;
    protected data: any;
    async get(id?: number) {
        this.db = await sqlite();
        try {
            this.data = await this.db.all(`SELECT * FROM items WHERE deleted_at IS NULL ${id? ' AND id = ? ' : ''}`, id? id : undefined) || [];
        } catch (error) {
            this.data = { error: 'Failed to fetch items' };
        }
        this.db.close();
        return this.data;
    }

    async create(name: string, description: string): Promise<{error?: string, id: number | string, name: string, description: string}> {
        this.db = await sqlite();
        try {
            const result = await this.db.run('INSERT INTO items (name, description) VALUES (?, ?)', name, description);
            this.data = { id: result.lastID, name, description };
        } catch (error) {
            this.data = { error: 'Failed to save item' };
        }
        this.db.close();
        return this.data;
    }

    async delete(id: string, softDelete: boolean = false): Promise<{error?: string, id: number | string}> {
        try {
            if(softDelete) {
                this.db = await sqlite();
                await this.db.run('DELETE FROM items WHERE id = ?', id);
                this.db.close();
            } else {
                await this.update({ id, deleted_at: new Date().toISOString() }, { id: parseInt(id) });
            }
            this.data = { id };
        } catch (error) {
            this.data = { error: 'Failed to delete item' };
        }
        return this.data;
    }

    async update(item: IItem, where: {[k: string]: string | number}): Promise<{error?: string, id: number | string, name: string, description: string}> {
        this.db = await sqlite();
        const sql: string[] = [];
        const whereSql: string[] = [];
        const bind: any[] = [];
        for(const key in item) {
            bind.push(item[key as keyof IItem]);
            sql.push(`${key} = ?`);
        }
        for(const key in where) {
            bind.push(where[key]);
            whereSql.push(`${key} = ?`);
        }
        const final = [`UPDATE items SET ${sql.join(', ')} WHERE ${whereSql.join(' AND ')}`, ...bind] 
        try {
            await this.db.run(...final);
            this.data = this.get(parseInt(item.id as string));
        } catch (error) {
            this.data = { error: 'Failed to update item' };
        }
        this.db.close();
        return this.data;
    }
}