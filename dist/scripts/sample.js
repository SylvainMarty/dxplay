"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
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
    return new rpi_led_matrix_1.LedMatrix(Object.assign(Object.assign({}, rpi_led_matrix_1.LedMatrix.defaultMatrixOptions()), { rows: 16, cols: 32, chainLength: 2, hardwareMapping: rpi_led_matrix_1.GpioMapping.AdafruitHatPwm, pixelMapperConfig: rpi_led_matrix_1.LedMatrixUtils.encodeMappers({ type: rpi_led_matrix_1.PixelMapperType.U }) }), Object.assign(Object.assign({}, rpi_led_matrix_1.LedMatrix.defaultRuntimeOptions()), { gpioSlowdown: 1 }));
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
};
const sample = async () => {
    const matrix = buildMatrix();
    console.log('Matrix built');
    matrix
        .clear()
        .brightness(100)
        .fgColor(0x0000FF)
        .fill()
        .fgColor(0xFFFF00)
        .drawCircle(matrix.width() / 2, matrix.height() / 2, matrix.width() / 2 - 1)
        .drawRect(matrix.width() / 4, matrix.height() / 4, matrix.width() / 2, matrix.height() / 2)
        .fgColor({ r: 255, g: 0, b: 0 })
        .drawLine(0, 0, matrix.width(), matrix.height())
        .drawLine(matrix.width() - 1, 0, 0, matrix.height() - 1);
    console.log('Matrix setted up');
    matrix.sync();
    console.log('Matrix sync done');
    console.log('Waiting...');
    await wait(100000);
};
const value = process.argv[2];
if (!value) {
    console.log('You must provide a text in argument!');
    process.exit(1);
}
else {
    sample();
}
//# sourceMappingURL=sample.js.map