import { Injectable } from '@nestjs/common';
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

@Injectable()
export class LedMatrixService {
    private matrix: LedMatrixInstance;

    constructor () {
        // this.matrix = new LedMatrix(
        //     {
        //         ...LedMatrix.defaultMatrixOptions(),
        //         rows: 16,
        //         cols: 32,
        //         chainLength: 2,
        //         hardwareMapping: GpioMapping.AdafruitHatPwm,
        //         pixelMapperConfig: LedMatrixUtils.encodeMappers({ type: PixelMapperType.U }),
        //     },
        //     {
        //         ...LedMatrix.defaultRuntimeOptions(),
        //         gpioSlowdown: 1,
        //     }
        // );
    }

    public async text(text: string): Promise<void>
    {
        this.matrix = this.buildMatrix();
        this.matrix
            .clear();
        
        const font = new Font('helvR12', `${process.cwd()}/fonts/helvR12.bdf`);
        this.matrix.font(font);
        const lines = LayoutUtils.textToLines(font, this.matrix.width(), text);
        for (const alignmentH of [HorizontalAlignment.Left, HorizontalAlignment.Center, HorizontalAlignment.Right]) {
            for (const alignmentV of [VerticalAlignment.Top, VerticalAlignment.Middle, VerticalAlignment.Bottom]) {
                this.matrix.fgColor(Colors.Yellow).clear();
                LayoutUtils.linesToMappedGlyphs(lines, font.height(), this.matrix.width(), this.matrix.height(), alignmentH, alignmentV)
                .map(glyph => {
                    this.matrix.drawText(glyph.char, glyph.x, glyph.y);
                });
                this.matrix.sync();
                await this.wait(400);
            }
        }
    }

    private wait (t: number): Promise<void> {
        return new Promise(ok => setTimeout(ok, t));
    }

    private buildMatrix(): LedMatrixInstance
    {
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
}
