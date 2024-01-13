import { withRetryer } from '../../lib/index';

describe('testing retryer', () => {
    const badPromise = () =>
        new Promise((_, reject) => {
            reject(new Error('Error code 1'));
        });

    it('should retry', () => {
        withRetryer('test', () => badPromise());
        expect(badPromise).toHaveBeenCalledTimes(3);
    });
});
