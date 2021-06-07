import { http404Handler, http500handler } from './error';

const handlers = [http404Handler, http500handler];

export default handlers;
