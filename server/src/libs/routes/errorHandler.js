/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  const { error, message, status } = err;
  const resStatus = status || 500;
  res
    .status(resStatus)
    .json({
      error: error || 'Something went wrong',
      message: message || err,
      timestamp: new Date(),
    });
};

export default errorHandler;
