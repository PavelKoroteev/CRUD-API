import * as http from 'http';
import { validate } from 'uuid';

const ERROR_CODE = 400;
const ERROR_MESSAGE = 'UserId is invalid (not uuid)';

export function assertValidUuid<A extends string | undefined>(
    request: http.IncomingMessage,
    response: http.ServerResponse,
    argument: A
): asserts argument is NonNullable<A> {
    if (typeof argument === 'undefined') {
        response.writeHead(ERROR_CODE).end(ERROR_MESSAGE);
        throw new Error(ERROR_MESSAGE);
    }

    if (!validate(argument)) {
        response.writeHead(ERROR_CODE).end(ERROR_MESSAGE);
        throw new Error(ERROR_MESSAGE);
    }
}
