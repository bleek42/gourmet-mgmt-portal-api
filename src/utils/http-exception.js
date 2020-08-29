class HttpException {
  constructor(statusCode, message, error) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}

module.exports = HttpException;
