import http from 'http';

export type Controller = (request: http.IncomingMessage, response: http.ServerResponse, argument: string | undefined) => void;
