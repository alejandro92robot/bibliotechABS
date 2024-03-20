const express = require('express');
const arduinoController = require('../controllers/arduinoController');
const router = express.Router();

router.get('/', function (req, res) {
    return res.send('Working');
});

router.get('/:action', function (req, res) {
    const action = req.params.action || req('action');

    if (action === 'led') {
        arduinoController.write("w");
        return res.send('Led light is on!');
    }
    if (action === 'off') {
        arduinoController.write("t");
        return res.send("Led light is off!");
    }

    return res.send('Action: ' + action);
});

module.exports = router;
