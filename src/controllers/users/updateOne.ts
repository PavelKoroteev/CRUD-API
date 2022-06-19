import { Controller } from '../../types';
import { getUser } from '../../middlewares/getUser';
import { getUserFromBody } from '../../middlewares/getUserFromBody';
import { database } from '../../database';
import { assertValidUuid } from '../../middlewares/assertValidUuid';
import { assertUser } from '../../middlewares/assertUser';

// Server should answer with status code 200 and updated record
// Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
// Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
export const updateOne: Controller = async (req, res, uuid) => {
    const updateFields = await getUserFromBody(req, res);

    assertValidUuid(req, res, uuid);

    const user = getUser(req, res, uuid);

    const copy = { ...user } as Record<string, unknown>;

    Object.keys(copy).forEach((key: keyof typeof copy) => {
        const updatedValue = updateFields[key];
        if (typeof updatedValue === 'undefined') { // bug if user has nullish values
            return;
        }
        copy[key] = updatedValue;
    })

    assertUser(res, copy);

    database.set(uuid, copy);

    res.writeHead(200);
    res.end(JSON.stringify(Object.assign(copy, { id: uuid })));
};