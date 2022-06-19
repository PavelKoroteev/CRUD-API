import http from 'http';
import { New, User } from '../types';
import { isRecord } from '../utils/typeGuards/isRecord';

const ERROR_CODE = 400;
const ERROR_MESSAGE = 'User serializer error';
const ERROR_MESSAGE_BY_KEY = (key: string) => `User serializer error, "${key}" has incorrect value`;

const testNewUser: New<User> = {
    username: 'test',
    age: 0,
    hobbies: ['some'],
};

// Server should answer with status code 400 and corresponding message if request body does not contain required fields

export function assertUser<U extends unknown>(res: http.ServerResponse, user: U): asserts user is Extract<U, User>  {
    if (!isRecord(user)) {
        res.writeHead(ERROR_CODE).end(ERROR_MESSAGE);
        throw new Error(ERROR_MESSAGE);
    }
    Object.keys(testNewUser).some((key) => {
        if (typeof user[key] === 'undefined') {
            res.writeHead(ERROR_CODE).end(ERROR_MESSAGE_BY_KEY(key));
            throw new Error(ERROR_MESSAGE_BY_KEY(key));
        }
    });
}
