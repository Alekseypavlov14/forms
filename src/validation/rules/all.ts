import { ValidationRule } from '../types/validation-rule'

export function all<T extends []>(rule: ValidationRule<T>): ValidationRule<T> {
  return (array: T) => array.every(value => rule(value))
}
