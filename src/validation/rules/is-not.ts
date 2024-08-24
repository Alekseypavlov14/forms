import { deepCompare } from '@oleksii-pavlov/deep-merge'

export function isNot<Value>(value: Value) {
  return <Data>(data: Data) => !deepCompare(data, value)
}
