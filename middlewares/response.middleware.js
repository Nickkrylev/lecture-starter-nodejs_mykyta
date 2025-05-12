const responseMiddleware = (req, res, next) => {
  res.success = (data) => {
    res.status(200).json(data);
  };

  res.error = (message, status = 400) => {
    res.status(status).json({ error: true, message });
  };

  next();
};

export { responseMiddleware };

