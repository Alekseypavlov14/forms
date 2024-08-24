export function isNotEmptyString<T>(value: T) {
  return typeof value === 'string' && value.length > 0
}
