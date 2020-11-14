"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const matrixled_1 = require("./matrixled");
const app = express();
app.get('', (req, res) => {
    res.send('Hello express!');
});
app.post('', (req, res) => {
    console.log('postText', req.body);
    matrixled_1.display(req.body);
    res.send('Ok');
});
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
//# sourceMappingURL=app.js.map