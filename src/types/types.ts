import { RuleSet } from 'styled-components'
import themes from '../styles/themes'

export type CSS = RuleSet<object>

export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
export type Operator = '+' | '-' | '/' | 'x'
export type SpecialKey = 'RESET' | 'DEL' | '=' | '.'

export type Keys = Digit | Operator | SpecialKey
export type Type = 'primary' | 'secondary' | 'tertiary'
export type Size = 1 | 2
export type KeysListItem = {
  content: Keys
  // TODO: Créer un type qui accepte tout ce que peut accepter un KeyboardEvent.key
  onKeyboard: string
  type: Type
  size: Size
}

export type CalculContextValue = {
  display: string
  handleKey: (keyContent: Keys) => void
}

export type Theme = keyof typeof themes

export type CustomThemeContextValue = {
  theme: Theme
  nextTheme: () => void
  breakpoints: {
    tabletLandscape: string
  }
}
