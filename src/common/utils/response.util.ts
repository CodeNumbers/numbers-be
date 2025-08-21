import { ResponseDto } from '../dto/response.dto';

export function success<T>(
  data: T[],
  message = 'Success.',
  statusCode = 200,
): ResponseDto<T> {
  return new ResponseDto(statusCode, message, data);
}

export function fail(
  statusCode = 400,
  message = 'Bad Request.',
): ResponseDto<null> {
  return new ResponseDto(statusCode, message, null);
}
