"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matrixled_1 = require("../src/matrixled");
const value = process.argv[2];
if (!value) {
    console.log('You must provide a text in argument!');
    process.exit(1);
}
else {
    matrixled_1.display(process.argv[2]);
}
//# sourceMappingURL=sample.js.map