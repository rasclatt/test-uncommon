import express, { Request, Response } from 'express';
import { config } from './environmentals/config';
import firstRunRoute from './routes/firstrun';
import itemsRoute from './routes/items';
const cors = require('cors');
import fs from 'fs';
// Start the server
const app = express();
app.use(express.json());
app.use(cors({
    origin: config.frontendOrigin,
    methods: ['GET','POST','PUT','DELETE','PATCH','OPTION'].join(','),
    allowedHeaders: 'Content-Type,Authorization'
}));
// If the database file doesn't exist, allow the first run route to be accessed
if (!fs.existsSync(config.dbSQLiteFile)) {
    app.use('/firstrun', firstRunRoute);
}
// Items route
app.use('/items', itemsRoute);
// Default get route
app.get('/', (req: Request, res: Response) => {
  res.send(`Server is running on ${config.apiHost} v${config.apiVersion}`);
}).listen(config.apiPort, () => {
  console.log(`Server is running on ${config.apiHost}`);
});