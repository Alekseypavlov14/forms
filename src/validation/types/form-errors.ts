import { AnyForm } from './any-form'

export type FormErrors<T extends AnyForm> = Partial<Record<keyof T, string>>
