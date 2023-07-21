import { ReactNode, createContext, useState, useMemo } from 'react'
import { ThemeProvider } from 'styled-components'
import themes from '../styles/themes'
import { CustomThemeContextValue, Theme } from '../types/types'

const breakpoints = {
  tabletLandscape: '(min-width: 900px)',
}

export const CustomThemeContext = createContext<CustomThemeContextValue | null>(null)

type Props = {
  children: ReactNode
}

export function CustomThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<Theme>('first')

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      breakpoints,
    }),
    [theme, setTheme],
  )

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  )
}
