import { Controller } from '../../types';

export const getOne: Controller = (request, response, argument) => {
    console.log('user', argument);
    response.end();
};