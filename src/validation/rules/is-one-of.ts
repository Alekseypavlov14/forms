import { deepCompare } from '@oleksii-pavlov/deep-merge'

export function isOneOf<T, V = any>(options: T[]) {
  return (value: V) => options.some(option => deepCompare(option, value))
}
