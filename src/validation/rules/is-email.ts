import { matchesRegex } from './matches-regex'
import { EMAIL_REGEX } from '@/shared/constants'

export const isEmail = matchesRegex(EMAIL_REGEX)
