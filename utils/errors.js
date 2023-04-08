class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotImageError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorisedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}
class NotFound extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class EmailInUseError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  BadRequestError,
  NotAuthorisedError,
  EmailInUseError,
  NotImageError,
  NotFound,
};
