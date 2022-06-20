import { validate } from 'uuid';

export const isUuid = (input: unknown): input is string => {
    return typeof input === 'string' && validate(input);
};
