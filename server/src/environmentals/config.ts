import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

interface IConfig {
    apiPort: number
    apiHost: string
    dbSQLiteFile: string
    apiVersion?: string
    frontendOrigin: string
    secreteKey?: string
}

const port: number = process.env.API_PORT ? parseInt(process.env.API_PORT) : 3000;
const isLocalhost: boolean = process.env.ENV === 'development' || process.env.ENV === 'localhost';

export const config: IConfig = {
    apiPort: port,
    apiHost: `${process.env.API_HOST || 'http://localhost'}${isLocalhost? `:${port}` : ''}`,
    dbSQLiteFile: `${path.join(__dirname, `..\\..\\${process.env.API_SQLITE_FILE || 'database.db'}`)}`,
    apiVersion: process.env.API_VERSION || '1',
    frontendOrigin: process.env.FRONTEND_HOST || '',
    secreteKey: process.env.SECRET_KEY || ''
}