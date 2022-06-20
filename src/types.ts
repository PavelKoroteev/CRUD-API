import * as http from 'http';

export type Controller = (
    request: http.IncomingMessage,
    response: http.ServerResponse,
    argument: string | undefined
) => void;

export type Middleware = (
    request: http.IncomingMessage,
    response: http.ServerResponse,
    argument: string | undefined
) => boolean;

export interface User {
    // id: string; // — unique identifier (string, uuid) generated on server side
    username: string; // — user's name (string, required)
    age: number; // — user's age (number, required)
    hobbies: string[]; // — user's hobbies (array of strings or empty array, required)
}

export type New<T> = Omit<T, 'id'>;
