import { Theme } from '../types/types'
import { isTheme } from './typeGuards'

// eslint-disable-next-line import/prefer-default-export
export function getStoredTheme(defaultTheme: Theme): Theme {
  const storedTheme = Number(localStorage.getItem('theme')) // Number() return 0 if null and NaN if not number
  if (isTheme(storedTheme)) {
    return storedTheme
  }

  return defaultTheme
}
