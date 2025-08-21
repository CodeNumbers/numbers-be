import { DeprecatedResponseDto } from '../dto/response.dto';

export function success<T>(
  data: T[],
  message = 'Success.',
  statusCode = 200,
): DeprecatedResponseDto<T> {
  return new DeprecatedResponseDto(statusCode, message, data);
}
