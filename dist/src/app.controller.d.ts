import { AppService } from './app.service';
import { LedMatrixService } from './led-matrix/led-matrix.service';
export declare class AppController {
    private readonly appService;
    private readonly ledMatrixService;
    constructor(appService: AppService, ledMatrixService: LedMatrixService);
    getHello(): string;
    postText(text: string): Promise<void>;
}
