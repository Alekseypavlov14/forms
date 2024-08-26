import { ValidationConfig } from './types/validation-config'
import { FormErrors } from './types/form-errors'
import { AnyForm } from './types/any-form'

export function createFormValidator<T extends AnyForm>(config: Partial<ValidationConfig<T>>) {
  return (data: T) => {
    const errors: FormErrors<T> = {} as FormErrors<T>

    Object.keys(data).forEach(key => {
      const validator = config[key]

      if (!validator) return 

      if (!validator(data[key])) {
        errors[key as keyof T] = `${key} field is invalid`
      }
    })

    return errors
  }
}
