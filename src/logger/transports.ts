import { ILogHandler, ILogLevel } from 'js-logger';
import { LoggerConfig } from './loggerConfig';
import { formattedDate } from '../formatters/formattedDate';
import { withColor } from '../styles';
import { formattedInArrows } from '../formatters/formattedInArrows';

export const getFormattedMessage = (messages: any[], context: any, clear: boolean): string => {
    const time = formattedDate(new Date(), clear);
    const level = formattedInArrows(formatLevel(context.level, clear), clear);

    if (context.name) {
        const { name } = context;
        const coloredName = LoggerConfig._ContextColors[name]
            ? withColor(name, LoggerConfig._ContextColors[name], clear)
            : name;
        return `${time} ${level} ${coloredName}: ${messages.join(' ')}`;
    } else {
        return `${time} ${level}: ${messages.join(' ')}`;
    }
};

export const processMessageWithFormat: ILogHandler = (messages, context) => {
    const time = formattedDate(new Date(), LoggerConfig.web);
    const level = formattedInArrows(formatLevel(context.level, LoggerConfig.web), LoggerConfig.web);

    if (context.name) {
        const { name } = context;
        const coloredName = LoggerConfig._ContextColors[name]
            ? withColor(name, LoggerConfig._ContextColors[name], LoggerConfig.web)
            : name;
        messages.unshift(`${time} ${level} ${coloredName}:`);
    } else {
        messages.unshift(`${time} ${level}:`);
    }
};

function formatLevel(level: ILogLevel, clear: boolean = false) {
    switch (level.name) {
        case 'LOG':
            return withColor('LOG', 'gray', clear);
        case 'DEBUG':
            return withColor('DEBUG', 'blue', clear);
        case 'INFO':
            return withColor('INFO', 'green', clear);
        case 'WARN':
            return withColor('WARN', 'yellow', clear);
        case 'ERROR':
            return withColor('ERROR', 'red', clear);
        default:
            return level.name;
    }
}
