const notFoundRoutes = (req, res, next) => {
  const error = {
    error: 'Bad Request',
    message: 'No Route Found',
    status: 404,
  };
  next(error);
};

export default notFoundRoutes;
