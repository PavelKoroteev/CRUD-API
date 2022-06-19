import http from 'http';
import { database } from '../database';
import { User } from '../types';

const ERROR_CODE = 404;
const ERROR_MESSAGE = 'Record with id === userId doesn\'t exist';

export function getUser(request: http.IncomingMessage, response: http.ServerResponse, uuid: string): User {
    const user = database.get(uuid);

    if (!user) {
        response.writeHead(ERROR_CODE).end(ERROR_MESSAGE);
        throw new Error(ERROR_MESSAGE);
    }

    return user;
}