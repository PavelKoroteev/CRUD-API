import http from 'http';
import { User } from '../types';
import { assertUser } from './assertUser';

// Server should answer with status code 201 and newly created record

const ERROR_CODE = 400;
const ERROR_MESSAGE = 'User serializer error, invalid JSON';

export async function getUserFromBody(req: http.IncomingMessage, res: http.ServerResponse) {
    const buffers: Uint8Array[] = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }
  
    const data = Buffer.concat(buffers).toString();

    let userJson;

    try {
        userJson = JSON.parse(data);
    } catch (e) {
        res.writeHead(ERROR_CODE).end(ERROR_MESSAGE);
        throw new Error(ERROR_MESSAGE);
    }

    return userJson;
}