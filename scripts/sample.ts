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
            hardwareMapping: GpioMapping.AdafruitHatPwm,
            pixelMapperConfig: LedMatrixUtils.encodeMappers({ type: PixelMapperType.U }),
        },
        {
            ...LedMatrix.defaultRuntimeOptions(),
            gpioSlowdown: 1,
        }
    );
}

const displayOnMatrix = async (text: string): Promise<void> => {
    const matrix = buildMatrix();
    console.log('Matrix built');
    matrix
        .clear();
    console.log('Matrix cleared');

    const font = new Font('helvR12', `${process.cwd()}/fonts/helvR12.bdf`);
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
}

displayOnMatrix(process.argv[2]);
