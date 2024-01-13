import { getLogger } from 'log4js';
import pRetry, { Options, AbortError } from 'p-retry';

export type AbortSignal = AbortError;

export function withRetryer<T>(
    name: string,
    func: (attempt: number) => PromiseLike<T> | T,
    options: Options = { retries: 2 },
) {
    const logger = getLogger('Retryer');
    logger.level = 'DEBUG';

    return pRetry(
        attemptCount => {
            logger.debug(`retryer running attempt=${attemptCount}`);
            return func(attemptCount);
        },
        {
            ...options,
            onFailedAttempt: error => {
                logger.warn(`retryer error=${JSON.stringify(error)}`);
            },
        },
    );
}
