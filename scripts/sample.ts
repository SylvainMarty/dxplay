import * as path from 'path';
import {
    LedMatrix,
    LedMatrixInstance,
    LedMatrixUtils,
    LayoutUtils,
    GpioMapping,
    PixelMapperType,
    Font,
    HorizontalAlignment,
    VerticalAlignment,
} from 'rpi-led-matrix';

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

const wait = (t: number): Promise<void> => {
    return new Promise(ok => setTimeout(ok, t));
}

const buildMatrix = (): LedMatrixInstance => {
    return new LedMatrix(
        {
            ...LedMatrix.defaultMatrixOptions(),
            rows: 16,
            cols: 32,
            chainLength: 2,
            disableHardwarePulsing: false,
            hardwareMapping: GpioMapping.AdafruitHat,
            // pixelMapperConfig: LedMatrixUtils.encodeMappers({ type: PixelMapperType.U }),
        },
        {
            ...LedMatrix.defaultRuntimeOptions(),
            // gpioSlowdown: 1,
        }
    );
}

const displayOnMatrix = async (text: string): Promise<void> => {
    const matrix = buildMatrix();
    console.log('Matrix built');
    matrix
        .clear();
    console.log('Matrix cleared');

    // helvR12
    const font = new Font('6x10', path.join(process.cwd(), 'node_modules/rpi-led-matrix/fonts/6x10.bdf'));
    console.log('Font chosen');
    matrix.font(font);
    console.log('Font set on Matrix');
    const lines = LayoutUtils.textToLines(font, matrix.width(), text);
    console.log('Lines evaluated from text');
    for (const alignmentH of [HorizontalAlignment.Left, HorizontalAlignment.Center, HorizontalAlignment.Right]) {
        for (const alignmentV of [VerticalAlignment.Top, VerticalAlignment.Middle, VerticalAlignment.Bottom]) {
            matrix.fgColor(Colors.Yellow).clear();
            LayoutUtils.linesToMappedGlyphs(lines, font.height(), matrix.width(), matrix.height(), alignmentH, alignmentV)
                .map(glyph => {
                    matrix.drawText(glyph.char, glyph.x, glyph.y);
                });
            matrix.sync();
            await wait(400);
        }
    }

    matrix
        .clear()
        .sync();
}

const sample = async () => {
    const matrix = buildMatrix();
    console.log('Matrix built');

    matrix
        .clear()            // clear the display
        .brightness(100)    // set the panel brightness to 100%
        .fgColor(0x0000FF)  // set the active color to blue
        .fill()             // color the entire diplay blue
        .fgColor(0xFFFF00)  // set the active color to yellow
        // draw a yellow circle around the display
        .drawCircle(matrix.width() / 2, matrix.height() / 2, matrix.width() / 2 - 1)
        // draw a yellow rectangle
        .drawRect(matrix.width() / 4, matrix.height() / 4, matrix.width() / 2, matrix.height() / 2)
        // sets the active color to red
        .fgColor({ r: 255, g: 0, b: 0 })
        // draw two diagonal red lines connecting the corners
        .drawLine(0, 0, matrix.width(), matrix.height())
        .drawLine(matrix.width() - 1, 0, 0, matrix.height() - 1);

    console.log('Matrix setted up');
    matrix.sync();
    console.log('Matrix sync done');

    console.log('Waiting...');
    await wait(120000);
    console.log('Terminating');
}

const value = process.argv[2];
if (!value) {
    console.log('You must provide a text in argument!')
    process.exit(1)
} else {
    displayOnMatrix(process.argv[2]);
    //sample();
}
