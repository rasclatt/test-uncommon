import express from 'express';
import { Items } from '../models/items';
import { HTTP_RESPONSE_CODES } from '../constants/http-response-codes.constants';
import { encrypt, decrypt } from '../helpers/crypt';

const router = express.Router();
const Model = new Items();
// Fetch all items
router.get('/', async (req, res) => {
    try {
        const items = await Model.get();
        res.status(HTTP_RESPONSE_CODES.OK).json(items?.map((item: any) => {
            item.id = encrypt(item.id.toString());
            return item;
        }));
    } catch (error: any) {
        res.status(HTTP_RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

// Save a new item
router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;
        if(!name.trim())
            throw new Error('Name is required');
        const data = await Model.create(name, description);
        res.status(HTTP_RESPONSE_CODES.OK).json(data);
    } catch (error: any) {
        res.status(HTTP_RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id: string = decrypt(req.params.id);
        const items = await Model.delete(id, false);
        res.status(HTTP_RESPONSE_CODES.OK).json(items);
    } catch (error: any) {
        res.status(HTTP_RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

export default router;