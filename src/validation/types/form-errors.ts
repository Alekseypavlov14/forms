import { AnyForm } from './any-form'

export type FormErrors<T extends AnyForm> = {
  [k in keyof T]: string
}
