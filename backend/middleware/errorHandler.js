const errorHandler = (err, req, res, next) => {
  console.error("Error 💥:", err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
