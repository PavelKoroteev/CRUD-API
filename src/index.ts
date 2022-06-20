import * as http from 'http';
import { config } from 'dotenv';

import { getAll } from './controllers/users/getAll';
import { getOne } from './controllers/users/getOne';
import { createOne } from './controllers/users/createOne';
import { updateOne } from './controllers/users/updateOne';
import { deleteOne } from './controllers/users/deleteOne';

import { generateRegexpByPath } from './utils/regexp';

import { Controller } from './types';

process.on('uncaughtException', (err) => {
    console.error(err);
});

process.on('unhandledRejection', (reason) => {
    console.log(reason);
});

config();

const ROUTES: Record<string, Controller> = {
    'GET api/users': getAll,
    'GET api/users/${userId}': getOne,
    'POST api/users': createOne,
    'PUT api/users/${userId}': updateOne,
    'DELETE api/users/${userId}': deleteOne,
};

const routes = Object.entries(ROUTES).map(([description, controller]) => {
    const [method, path] = description.split(' ');

    return {
        method,
        regexp: generateRegexpByPath(path),
        callback: controller,
        priority: path.length,
    };
});

http.createServer(async (request, response) => {
    const { url } = request;

    if (!url) {
        console.error('Request has no url');
        response.writeHead(404);
        response.end();
        return;
    }

    const foundRoutes = routes.filter(
        ({ method, regexp }) => request.method === method && regexp.test(url)
    );

    if (foundRoutes.length) {
        const found = foundRoutes.sort((a, b) => b.priority - a.priority)[0];

        const { regexp, callback } = found;

        const [, argument] = regexp.exec(url)!;

        try {
            await callback(request, response, argument);
        } catch(e) {
            response.writeHead(500);
            response.end();
        }
    } else {
        response.writeHead(404);
        response.end();
    }
}).listen(process.env.PORT, () => {
    console.log('Listening...', process.env.PORT);
});
