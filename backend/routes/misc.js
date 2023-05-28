import express from 'express';

//fancy way of getting the current directory name in ES6
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();

router.get('/health', (req, res) => {
    res.send('OK');
    }
);

export default router;