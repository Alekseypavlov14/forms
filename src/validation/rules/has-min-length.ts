export function hasMinLength(min: number) {
  return (value: string) => value.length >= min
}
