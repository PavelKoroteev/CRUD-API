import { database } from '../../database';
import { assertUser } from '../../middlewares/assertUser';
import { getUserFromBody } from '../../middlewares/getUserFromBody';
import { Controller } from '../../types';
import { generate } from '../../utils/id';

// Server should answer with status code 201 and newly created record
// Server should answer with status code 400 and corresponding message if request body does not contain required fields
export const createOne: Controller = async (req, res) => {
    const user = await getUserFromBody(req, res);

    assertUser(res, user);

    const uuid = generate();

    database.set(uuid, user);

    console.log(database);

    res.writeHead(201);
    res.end(JSON.stringify(Object.assign(user, { id: uuid })));
};