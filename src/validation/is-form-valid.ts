import { deepCompare } from '@oleksii-pavlov/deep-merge'
import { FormErrors } from './types/form-errors'
import { AnyForm } from './types/any-form'

export function isFormValid<T extends AnyForm>(errors: FormErrors<T>): boolean {
  return deepCompare(errors, {})
}
