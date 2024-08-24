export function matchesRegex(regex: RegExp) {
  return (value: string) => regex.test(value)
} 
