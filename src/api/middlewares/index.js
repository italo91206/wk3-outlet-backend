import {
  jwtMiddleware,
  jwtMiddlewareRecuperaSenha,
  jwtMiddlewareValidaConta,
} from './tokenMiddleware';

import cacheMiddleware from './cacheMiddleware';

/**
 * Array de middlewares.
 */
//const middlewares = [jwtMiddleware, cacheMiddleware];
const middlewares = [jwtMiddleware];
const middlewaresRecupera = [jwtMiddlewareRecuperaSenha];
const middlewaresAtivaConta = [jwtMiddlewareValidaConta];
export { middlewares, middlewaresRecupera, middlewaresAtivaConta };
