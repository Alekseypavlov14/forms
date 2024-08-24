import { deepCompare } from '@oleksii-pavlov/deep-merge'

export function isOneOf<T>(options: T[]) {
  return (value: T) => options.some(option => deepCompare(option, value))
}
