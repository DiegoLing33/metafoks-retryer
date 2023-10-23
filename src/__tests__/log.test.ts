import { Logger } from '../logger/logger';
import { LoggerConfig } from '../logger/loggerConfig';

describe('testing logger', () => {
    it('should print to console with colors', () => {
        LoggerConfig._CoreLogger.setLevel(LoggerConfig._CoreLogger.DEBUG);
        startLogging();
    });

    it('should print to console without colors', () => {
        LoggerConfig.web = true;
        startLogging();
    });

    it('should use different colors', () => {
        const lg0 = new Logger('redfg', 'red');
        const lg1 = new Logger('redbg', 'bgRed');
        const lg2 = new Logger('cyanfg', 'cyan');

        baseLoggerTest(lg0);
        baseLoggerTest(lg1);
        baseLoggerTest(lg2);
    });

    it('should save last 50 logs', () => {
        startLogging();
        console.log(LoggerConfig.last50logs);
    });

    it('should print objects correctly', () => {
        startLogging();
        console.log(LoggerConfig.last50logs);
    });
});

function startLogging() {
    const webLogger = new Logger('app');
    baseLoggerTest(webLogger);
}

function baseLoggerTest(logger: Logger) {
    logger.log('This is', 1, 'thing', { name: 'same', home: true });
    logger.debug('This is', 1, 'thing');
    logger.info('This is', 1, 'thing');
    logger.warn('This is', 1, 'thing');
    logger.error('This is', 1, 'thing');
}
