import { Controller } from '../../types';

export const getAll: Controller = (request, response) => {
    console.log('hello world');
    response.end('hello world');
};