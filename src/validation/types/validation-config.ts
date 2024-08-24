import { ValidationRule } from './validation-rule'
import { AnyForm } from './any-form'

export type ValidationConfig<T extends AnyForm> = {
  [K in keyof T]: ValidationRule<T[K]>
}
