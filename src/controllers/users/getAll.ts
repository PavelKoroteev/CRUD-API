import { database } from '../../database';
import { Controller } from '../../types';
import { Readable } from 'stream';

// Server should answer with status code 200 and all users records
export const getAll: Controller = (request, response) => {
    const users = Array.from(database.values());

    const jsonString = JSON.stringify(users);

    const readable = Readable.from(jsonString);

    response.writeHead(200);

    readable.pipe(response);
};