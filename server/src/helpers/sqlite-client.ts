import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { config } from '../environmentals/config';

export const sqliteOpen = async (dbFilePath?: string): Promise<Database> => {
    const db = await open({
        filename: dbFilePath || config.dbSQLiteFile,
        driver: sqlite3.Database
    });

    return db;
}

export const sqliteClose = async (db: Database): Promise<void> => await db.close();