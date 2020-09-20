class HttpException extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(msg) {
    return new HttpException(400, msg);
  }

  static unauthRequest(msg) {
    return new HttpException(401, msg);
  }

  static forbidden(msg) {
    return new HttpException(403, msg);
  }

  static notFound(msg) {
    return new HttpException(404, msg);
  }

  static internalError(msg) {
    return new HttpException(500, msg);
  }
}

module.exports = HttpException;
