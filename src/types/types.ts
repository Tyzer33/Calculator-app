import React from 'react'
import themes from '../styles/themes'

export type Theme = keyof typeof themes

export type CustomThemeContextValue = {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
  breakpoints: {
    tabletLandscape: string
  }
}

export type Calcul = {
  expressionArr: (string | number)[]
  activeTerm: number
  result: undefined | number
}

export type CalculContextValue = {
  calcul: Calcul
  updateCalcul: React.Dispatch<React.SetStateAction<Calcul>>
  toDisplay: () => string | undefined
  handleReset: () => void
  handleDel: () => void
  handleDigitAndPoint: (digit: number | '.') => void
  handleOperator: (oper: string) => void
  handleEqual: () => void
}

// TODO: Rassembler les types ici
