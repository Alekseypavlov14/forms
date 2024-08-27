import { ValidationConfig } from './types/validation-config'
import { FormErrors } from './types/form-errors'
import { deepMerge } from '@oleksii-pavlov/deep-merge'
import { AnyForm } from './types/any-form'

export function createFormValidator<T extends AnyForm>(
  config: Partial<ValidationConfig<T>> = {},
  ...callbacks: ((data: T) => Partial<FormErrors<T>> | undefined)[]
) {
  return (data: T) => {
    const errors: Partial<FormErrors<T>> = {}
    
    Object.keys(data).forEach(key => {
      const validator = config[key]

      if (!validator) return 

      if (!validator(data[key])) {
        errors[key as keyof T] = `${key} field is invalid`
      }
    })
    
    const callbacksErrors: Partial<FormErrors<T>>[] = callbacks.map(callback => callback(data) || {})
    const mergedCallbacksErrors = deepMerge<Partial<FormErrors<T>>>(...callbacksErrors)
    
    return deepMerge(errors, mergedCallbacksErrors)
  }
}

import { hasMinLength, isEmail } from './rules'

interface MyForm {
  email: string
  password: string
  confirmPassword: string
}

const validateMyForm = createFormValidator<MyForm>({
  email: isEmail,
  password: hasMinLength(6),
}, comparePasswords)

function comparePasswords(data: MyForm): Partial<FormErrors<MyForm>> | undefined {
  if (data.password !== data.confirmPassword) return ({
    password: 'Password is not valid',
    confirmPassword: 'Password is not valid',
  })
}
