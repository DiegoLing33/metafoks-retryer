import { ILogger } from 'js-logger';
import { ColorKey } from '../styles';
import { LoggerConfig } from './loggerConfig';

export class Logger {
    public readonly core: ILogger;
    public readonly log: (...x: any[]) => void;
    public readonly debug: (...x: any[]) => void;
    public readonly info: (...x: any[]) => void;
    public readonly warn: (...x: any[]) => void;
    public readonly error: (...x: any[]) => void;

    public constructor(name: string, color: ColorKey = 'reset') {
        const core = LoggerConfig._CoreLogger.get(name);
        LoggerConfig._ContextColors[name] = color;

        this.log = core.log.bind(core);
        this.debug = core.debug.bind(core);
        this.info = core.info.bind(core);
        this.warn = core.warn.bind(core);
        this.error = core.error.bind(core);

        this.core = core;
    }
}
