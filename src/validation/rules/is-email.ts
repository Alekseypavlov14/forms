import { matchesRegex } from './matches-regex'

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const isEmail = matchesRegex(EMAIL_REGEX)
