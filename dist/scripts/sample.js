"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const led_matrix_service_1 = require("../src/led-matrix/led-matrix.service");
const rpi_led_matrix_1 = require("rpi-led-matrix");
const Colors = {
    Aquamarine: 0x7FFFD4,
    Black: 0x000000,
    Blue: 0x0000FF,
    Cyan: 0x00FFFF,
    Green: 0x00FF00,
    Magenta: 0xFF00FF,
    Purple: 0x800080,
    Red: 0xFF0000,
    White: 0xFFFFFF,
    Yellow: 0xFFFF00,
};
const wait = (t) => {
    return new Promise(ok => setTimeout(ok, t));
};
const buildMatrix = () => {
    return new rpi_led_matrix_1.LedMatrix(Object.assign(Object.assign({}, rpi_led_matrix_1.LedMatrix.defaultMatrixOptions()), { rows: 16, cols: 32, chainLength: 2, disableHardwarePulsing: false, hardwareMapping: rpi_led_matrix_1.GpioMapping.AdafruitHat }), Object.assign({}, rpi_led_matrix_1.LedMatrix.defaultRuntimeOptions()));
};
const displayOnMatrix = async (text) => {
    const matrix = buildMatrix();
    console.log('Matrix built');
    matrix
        .clear();
    console.log('Matrix cleared');
    const font = new rpi_led_matrix_1.Font('6x10', path.join(process.cwd(), 'node_modules/rpi-led-matrix/fonts/6x10.bdf'));
    console.log('Font chosen');
    matrix.font(font);
    console.log('Font set on Matrix');
    const lines = rpi_led_matrix_1.LayoutUtils.textToLines(font, matrix.width(), text);
    console.log('Lines evaluated from text');
    for (const alignmentH of [rpi_led_matrix_1.HorizontalAlignment.Left, rpi_led_matrix_1.HorizontalAlignment.Center, rpi_led_matrix_1.HorizontalAlignment.Right]) {
        for (const alignmentV of [rpi_led_matrix_1.VerticalAlignment.Top, rpi_led_matrix_1.VerticalAlignment.Middle, rpi_led_matrix_1.VerticalAlignment.Bottom]) {
            matrix.fgColor(Colors.Yellow).clear();
            rpi_led_matrix_1.LayoutUtils.linesToMappedGlyphs(lines, font.height(), matrix.width(), matrix.height(), alignmentH, alignmentV)
                .map(glyph => {
                matrix.drawText(glyph.char, glyph.x, glyph.y);
            });
            matrix.sync();
            await wait(400);
        }
    }
    console.log('Clearing matrix');
    matrix
        .clear()
        .sync();
    console.log('Matrix cleared');
};
const value = process.argv[2];
if (!value) {
    console.log('You must provide a text in argument!');
    process.exit(1);
}
else {
    const service = new led_matrix_service_1.LedMatrixService();
    service.text(process.argv[2]);
}
//# sourceMappingURL=sample.js.map