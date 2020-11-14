"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedMatrixService = void 0;
const path = require("path");
const common_1 = require("@nestjs/common");
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
let LedMatrixService = class LedMatrixService {
    constructor() {
        this.matrix = this.buildMatrix();
        console.log('Matrix built');
    }
    async text(text) {
        this.matrix
            .clear();
        console.log('Matrix cleared');
        const font = new rpi_led_matrix_1.Font('6x10', path.join(process.cwd(), 'node_modules/rpi-led-matrix/fonts/6x10.bdf'));
        console.log('Font chosen');
        this.matrix.font(font);
        console.log('Font set on Matrix');
        const lines = rpi_led_matrix_1.LayoutUtils.textToLines(font, this.matrix.width(), text);
        console.log('Lines evaluated from text');
        for (const alignmentH of [rpi_led_matrix_1.HorizontalAlignment.Left, rpi_led_matrix_1.HorizontalAlignment.Center, rpi_led_matrix_1.HorizontalAlignment.Right]) {
            for (const alignmentV of [rpi_led_matrix_1.VerticalAlignment.Top, rpi_led_matrix_1.VerticalAlignment.Middle, rpi_led_matrix_1.VerticalAlignment.Bottom]) {
                this.matrix.fgColor(Colors.Yellow).clear();
                rpi_led_matrix_1.LayoutUtils.linesToMappedGlyphs(lines, font.height(), this.matrix.width(), this.matrix.height(), alignmentH, alignmentV)
                    .map(glyph => {
                    this.matrix.drawText(glyph.char, glyph.x, glyph.y);
                });
                this.matrix.sync();
                await this.wait(400);
            }
        }
        this.matrix
            .clear()
            .sync();
    }
    wait(t) {
        return new Promise(ok => setTimeout(ok, t));
    }
    buildMatrix() {
        return new rpi_led_matrix_1.LedMatrix(Object.assign(Object.assign({}, rpi_led_matrix_1.LedMatrix.defaultMatrixOptions()), { rows: 16, cols: 32, chainLength: 2, disableHardwarePulsing: false, hardwareMapping: rpi_led_matrix_1.GpioMapping.AdafruitHat }), Object.assign({}, rpi_led_matrix_1.LedMatrix.defaultRuntimeOptions()));
    }
};
LedMatrixService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], LedMatrixService);
exports.LedMatrixService = LedMatrixService;
//# sourceMappingURL=led-matrix.service.js.map