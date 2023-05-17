const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

router.get('/health', (req, res) => {
    res.send('OK');
    }
);
