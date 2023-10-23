import JSLogger from 'js-logger';
import { getFormattedMessage, processMessageWithFormat } from './transports';
import { ColorKey } from '../styles';

export const LoggerConfig = {
    web: false,
    _CoreLogger: JSLogger,
    _ContextColors: {} as Record<string, ColorKey>,
    last50logs: [] as string[],
    onLog: [] as ((input: string) => void)[],
};

LoggerConfig._CoreLogger.useDefaults({
    defaultLevel: LoggerConfig._CoreLogger.DEBUG,
    formatter: function (messages, context) {
        if (LoggerConfig.last50logs.length > 50) {
            LoggerConfig.last50logs = LoggerConfig.last50logs.slice(
                LoggerConfig.last50logs.length - 50,
                LoggerConfig.last50logs.length,
            );
        }

        messages.forEach((value, index) => {
            if (typeof value === 'object') {
                messages[index] = JSON.stringify(value, null, 2);
            } else {
                messages[index] = value;
            }
        });

        const clearVariant = getFormattedMessage(messages, context, true);
        LoggerConfig.last50logs.push(clearVariant);
        LoggerConfig.onLog.forEach(callback => callback(clearVariant));

        processMessageWithFormat(messages, context);
    },
});
