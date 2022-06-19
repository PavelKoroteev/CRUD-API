import { Controller } from '../../types';
import { getUser } from '../../middlewares/getUser';
import { assertValidUuid } from '../../middlewares/assertValidUuid';

// Server should answer with status code 200 and and record with id === userId if it exists
// Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
// Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
export const getOne: Controller = (request, response, uuid) => {
    assertValidUuid(request, response, uuid);

    const user = getUser(request, response, uuid);

    response.writeHead(200);
    response.write(JSON.stringify(user));
    response.end();
};