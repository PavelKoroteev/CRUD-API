import { Controller } from '../../types';
import { getUser } from '../../middlewares/getUser';
import { database } from '../../database';
import { assertValidUuid } from '../../middlewares/assertValidUuid';

// Server should answer with status code 200 and updated record
// Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
// Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
export const deleteOne: Controller = async (req, res, uuid) => {
    assertValidUuid(req, res, uuid);

    getUser(req, res, uuid);

    database.delete(uuid);

    res.writeHead(204);
    res.end();
};