"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const matrixled_1 = require("./matrixled");
const app = express();
app.use(bodyParser.json());
app.get('', (req, res) => {
    res.send('Hello express!');
});
app.post('', (req, res) => {
    console.log('postText', req.body);
    if (!req.body || !req.body.text) {
        res.status(400).send('No text given.');
        return;
    }
    matrixled_1.display(req.body.text);
    res.send('Ok');
});
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
//# sourceMappingURL=app.js.map