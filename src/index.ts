import http from 'http';
// import { router } from './router/index.js';

import { getAll } from './controllers/users/getAll';
import { getOne } from './controllers/users/getOne';
import { createOne } from './controllers/users/createOne';
import { updateOne } from './controllers/users/updateOne';
import { deleteOne } from './controllers/users/deleteOne';

const ROUTES = {
    // Implemented endpoint api/users:
    'GET api/users': getAll, // is used to get all persons
    // Server should answer with status code 200 and all users records
    'GET api/users/${userId}': getOne,
    // Server should answer with status code 200 and and record with id === userId if it exists
    // Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
    // Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
    'POST api/users': createOne, // is used to create record about new user and store it in database
    // Server should answer with status code 201 and newly created record
    // Server should answer with status code 400 and corresponding message if request body does not contain required fields
    'PUT api/users/{userId}': updateOne, // is used to update existing user
    // Server should answer with status code 200 and updated record
    // Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
    // Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
    'DELETE api/users/${userId}': deleteOne, // is used to delete existing user from database
    // Server should answer with status code 204 if the record is found and deleted
    // Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
    // Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
};

http.createServer((req, res) => {
    
}).listen(8080, () => {
    console.log('Listening...');
})
