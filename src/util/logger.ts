import { Timestamp } from '@skyra/timestamp';
import Logger from 'node-color-log';

class TesseractLogger {
    template: Timestamp;

    constructor() {
        Logger.setLevel(process.env.NODE_ENV === 'production' ? 'info' : 'debug');
        this.template = new Timestamp('HH:mm:ss');
    }

    get timestamp(): string {
        return this.template.displayUTC(new Date());
    }

    info(...args: unknown[]) {
        Logger.bgColor('green')
            .color('black')
            .bold()
            .log(`[${this.timestamp}]`)
            .joint()
            .log(' ')
            .joint()
            .log(...args);
    }

    debug(...args: unknown[]) {
        Logger.bgColor('blue')
            .color('black')
            .bold()
            .log(`[${this.timestamp}]`)
            .joint()
            .log(' ')
            .joint()
            .log(...args);
    }

    error(...args: unknown[]) {
        Logger.bgColor('red')
            .color('black')
            .bold()
            .log(`[${this.timestamp}]`)
            .joint()
            .log(' ')
            .joint()
            .log(...args);
    }
}

export default new TesseractLogger();
