export function isRecord<T extends Record<string, unknown> | unknown>(input: T): input is Extract<T, Record<string, unknown>> {
    return typeof input === 'object' && input !== null;
}