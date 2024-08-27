import { ValidationConfig } from './types/validation-config'
import { FormErrors } from './types/form-errors'
import { deepMerge } from '@oleksii-pavlov/deep-merge'
import { AnyForm } from './types/any-form'

export function createFormValidator<T extends AnyForm>(
  config: Partial<ValidationConfig<T>> = {},
  ...callbacks: ((data: T) => FormErrors<T> | undefined)[]
) {
  return (data: T) => {
    const errors: FormErrors<T> = {}
    
    Object.keys(data).forEach(key => {
      const validator = config[key]

      if (!validator) return 

      if (!validator(data[key])) {
        errors[key as keyof T] = `${key} field is invalid`
      }
    })
    
    const callbacksErrors: FormErrors<T>[] = callbacks.map(callback => callback(data) || {})
    const mergedCallbacksErrors = deepMerge<FormErrors<T>>(...callbacksErrors)
    
    return deepMerge(errors, mergedCallbacksErrors)
  }
}
