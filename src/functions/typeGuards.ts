import themes from '../styles/themes'
import { Theme } from '../types/types'

// eslint-disable-next-line import/prefer-default-export
export function isTheme(num: number): num is Theme {
  return num >= 1 && num <= Object.keys(themes).length
}
