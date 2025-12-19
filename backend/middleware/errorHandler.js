export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  let error = {
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  if (err.name === 'ValidationError') {
    error.message = 'Validation failed';
    error.errors = err.errors;
    return res.status(400).json(error);
  }

  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token';
    return res.status(401).json(error);
  }

  if (err.name === 'TokenExpiredError') {
    error.message = 'Token expired';
    return res.status(401).json(error);
  }

  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json(error);
};
