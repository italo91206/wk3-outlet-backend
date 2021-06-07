import {
  jwtMiddleware,
  jwtMiddlewareRecuperaSenha,
  jwtMiddlewareValidaConta,
} from './tokenMiddleware';

import cacheMiddleware from './cacheMiddleware';

/**
 * Array de middlewares.
 */
const middlewares = [jwtMiddleware, cacheMiddleware];
const middlewaresRecupera = [jwtMiddlewareRecuperaSenha];
const middlewaresAtivaConta = [jwtMiddlewareValidaConta];
export { middlewares, middlewaresRecupera, middlewaresAtivaConta };
