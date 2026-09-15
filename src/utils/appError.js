class AppError extends Error {
  constructor() {
    super();
  }
  create(message, statusCode,statusText) {
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.message = message;
    return this;
  }
}
module.exports = new AppError();
