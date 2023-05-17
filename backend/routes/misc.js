const router = require('express').Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    //res.send('Hello World!');
    }
);

router.get('/health', (req, res) => {
    res.send('OK');
    }
);

module.exports = router;
