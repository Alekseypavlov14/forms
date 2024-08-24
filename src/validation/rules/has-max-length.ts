export function hasMaxLength(max: number) {
  return (value: string) => value.length <= max
}
