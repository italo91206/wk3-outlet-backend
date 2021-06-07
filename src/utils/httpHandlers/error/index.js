import logger from '../../logger';

export async function http404Handler(req, res, next) {
  logger.error('Not found');
  res.status(404).json({
    success: false,
    httpStatusCode: 404,
    message: 'Ops, cant find that!',
  });
}

export async function http500handler(err, req, res, next) {
  logger.error(err.stack);
  res
    .status(500)
    .json({ success: false, httpStatusCode: 500, message: 'Something broke!' });
}
