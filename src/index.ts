import http from 'http';
// import { router } from './router/index.js';
import { config } from 'dotenv';

import { getAll } from './controllers/users/getAll';
import { getOne } from './controllers/users/getOne';
import { createOne } from './controllers/users/createOne';
import { updateOne } from './controllers/users/updateOne';
import { deleteOne } from './controllers/users/deleteOne';

import { Controller } from './types';

process.on('uncaughtException', (err) => {
    console.error(err);
});

process.on('unhandledRejection', (reason) => {
    console.log(reason);
});

config();

const ROUTES: Record<string, Controller>  = {
    // Implemented endpoint api/users:
    'GET api/users': getAll, // is used to get all persons
    'GET api/users/${userId}': getOne,
    'POST api/users': createOne, // is used to create record about new user and store it in database
    'PUT api/users/${userId}': updateOne, // is used to update existing user
    // Server should answer with status code 200 and updated record
    // Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
    // Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
    'DELETE api/users/${userId}': deleteOne, // is used to delete existing user from database
    // Server should answer with status code 204 if the record is found and deleted
    // Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
    // Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
};

const FORWARD_SLASH_REGEXP = /\//g;
const FORWARD_SLASH_PATTERN = '\/';

const escape = (pattern: string) => {
    return pattern.replace(FORWARD_SLASH_REGEXP, FORWARD_SLASH_PATTERN);
}

const PLACEHOLDER_REGEXP = /\${.+}/g;
const PLACEHOLDER_PATTERN = '(.+)';

const generateRegexp = (path: string) => {
    const escapedPath = escape(path);

    const pattern = escapedPath.replace(PLACEHOLDER_REGEXP, PLACEHOLDER_PATTERN);

    return new RegExp(`\/${pattern}`);
}

const routes = Object.entries(ROUTES).map(([description, controller]) => {
    const [method, path] = description.split(' ');

    return {
        method,
        regexp: generateRegexp(path),
        callback: controller,
        priority: path.length,
    }
});

http.createServer((request, response) => {
    process.on('uncaughtException', (err) => {
        console.error(err);
        response.writeHead(500);
        response.end();
    });
    
    process.on('unhandledRejection', (reason) => {
        console.log(reason);
        response.writeHead(500);
        response.end();
    });

    const { url } = request;

    if (!url) {
        console.error('Request has no url');
        response.writeHead(404);
        response.end();
        return;
    }

    const foundRoutes = routes.filter(({ method, regexp }) => request.method === method && regexp.test(url));

    if (foundRoutes.length) {
        const found = foundRoutes.sort((a,b) => b.priority - a.priority)[0];

        const { regexp, callback, } = found;

        const [, argument] = regexp.exec(url)!;

        callback(request, response, argument);
    } else {
        response.writeHead(404);
        response.end();
    }
}).listen(process.env.PORT, () => {
    console.log('Listening...', process.env.PORT);
})
