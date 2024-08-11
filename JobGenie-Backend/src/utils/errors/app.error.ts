enum ErrorStatus {
  GOOD = 'Good',
  BAD = 'Bad',
  FAIL = 'Fail',
}

class ApiError extends Error {
  public statusCode: number;
  public status: string;

  constructor(message: string, statusCode: number, additional_info = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4')
      ? ErrorStatus['BAD']
      : ErrorStatus['GOOD'];
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
