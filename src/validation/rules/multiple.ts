import { ValidationRule } from '../types/validation-rule'

export function multiple<T>(rules: ValidationRule<T>[]): ValidationRule<T> {
  return (value: T) => rules.every(rule => rule(value))
}
