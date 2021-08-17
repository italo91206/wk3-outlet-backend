/* eslint-disable consistent-return */
/** @module tokenMiddleware */
/** @description Import das dependências */
import jwt from 'jsonwebtoken';
import config from '../../config';

/**
 * @function jwtMiddleware - Middleware de verificação do Token de autenticação
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
async function jwtMiddleware(req, res, next) {
  const token = req.headers['x-access-token'] || req.headers.authorization;

  if (!token) {
    return res.status(403).json({ auth: false, msg: 'Token não informado' });
  }
  try {
    // console.log(config.token.SECRET_KEY);
    jwt.verify(token, config.token.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          auth: false,
          msg: 'Token informado é inválido ou expirado',
        });
      }
      req.body.user = decoded.user;
      next();
    });
  } catch (err) {
    console.error(
      `Erro: middlewares/tokenMiddleware.js (jwtMiddleware): ${err}`
    );
  }
}
/**
 * @function jwtMiddlewareRecuperaSenha - Middleware de verificação do Token de autenticação para recuperar a senha
 */

async function jwtMiddlewareRecuperaSenha(req, res, next) {
  const token = req.headers['x-access-token'] || req.headers.authorization;

  if (!token) {
    return res.status(403).json({ auth: false, msg: 'Token não informado' });
  }
  try {
    jwt.verify(
      token,
      config.tokenRecuperaSenha.SECRET_KEY,
      async (err, decoded) => {
        if (err) {
          return res.status(401).json({
            auth: false,
            msg: 'Token informado é inválido ou expirado',
          });
        }

        // req.body.email = decoded.email;
        next();
      }
    );
  } catch (err) {
    console.error(
      `Erro: middlewares/tokenMiddleware.js (jwtMiddlewareRecuperaSenha): ${err}`
    );
  }
}

async function jwtMiddlewareValidaConta(req, res, next) {
  const token = req.headers['x-access-token'] || req.headers.authorization;

  if (!token) {
    return res.status(403).json({ auth: false, msg: 'Token não informado' });
  }
  try {
    jwt.verify(
      token,
      config.tokenAtivaConta.SECRET_KEY,
      async (err, decoded) => {
        if (err) {
          return res.status(401).json({
            auth: false,
            msg: 'Token informado é inválido ou expirado',
          });
        }

        // req.body.email = decoded.email;
        next();
      }
    );
  } catch (err) {
    console.error(
      `Erro: middlewares/tokenMiddleware.js (jwtMiddlewareValidaConta): ${err}`
    );
  }
}

export { jwtMiddleware, jwtMiddlewareRecuperaSenha, jwtMiddlewareValidaConta };
