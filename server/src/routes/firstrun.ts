import express, { Request, Response } from 'express';
import { sqliteOpen } from '../helpers/sqlite-client';
import { config } from '../environmentals/config';

const router = express.Router();
// Initialize database and create table if it doesn't exist
const initializeDatabase = async () => {
    const db = await sqliteOpen(config.dbSQLiteFile);
    await db.exec(`
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP DEFAULT NULL
        )
    `);
    await db.close();
}

router.get('/init', (req: Request, res: Response) => {
    initializeDatabase().catch((error) => console.error('Failed to initialize database:', error));
    res.send('First run route');
});

export default router;