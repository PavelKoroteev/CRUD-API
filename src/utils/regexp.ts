const FORWARD_SLASH_REGEXP = /\//g;
const FORWARD_SLASH_PATTERN = '/';

const escapePattern = (pattern: string) => {
    return pattern.replace(FORWARD_SLASH_REGEXP, FORWARD_SLASH_PATTERN);
};

const PLACEHOLDER_REGEXP = /\${.+}/g;
const PLACEHOLDER_PATTERN = '(.+)';

export const generateRegexpByPath = (path: string) => {
    const escapedPath = escapePattern(path);

    const pattern = escapedPath.replace(
        PLACEHOLDER_REGEXP,
        PLACEHOLDER_PATTERN
    );

    return new RegExp(`\/${pattern}`);
};
