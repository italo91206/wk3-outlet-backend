import cache from '../../database/cache';

/**
 * @function cacheMIddleware - Intercepta todos os requests, verificando se a informação buscada está presente no cache do Redis
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
function cacheMiddleware(req, res, next) {
  const keyName = req.originalUrl;
  cache.redisConnection.get(keyName, (err, data) => {
    if (err) {
      console.error(`REDIS ERROR: ${err}`);
      res.status(500).json(err);
    }
    if (data !== null) {
      return res.json(JSON.parse(data));
    }
    next();
  });
}

export default cacheMiddleware;
