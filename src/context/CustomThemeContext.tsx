import { ReactNode, createContext, useState, useMemo, useCallback, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import themes from '../styles/themes'
import { CustomThemeContextValue, Theme } from '../types/types'
import { isTheme } from '../functions/typeGuards'
import { getStoredTheme } from '../functions/function'

const breakpoints = {
  tabletLandscape: '(min-width: 900px)',
}

export const CustomThemeContext = createContext<CustomThemeContextValue | null>(null)

type Props = {
  children: ReactNode
}

export function CustomThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<Theme>(getStoredTheme(1))

  const loopThroughTheme = useCallback((num: Theme): Theme => {
    const nextNum = num + 1

    if (isTheme(nextNum)) {
      return nextNum
    }

    return 1
  }, [])

  const nextTheme = useCallback(() => {
    setTheme((prev) => loopThroughTheme(prev))
  }, [loopThroughTheme])

  useEffect(() => {
    localStorage.setItem('theme', theme.toString())
  }, [theme])

  const contextValue = useMemo(
    () => ({
      theme,
      nextTheme,
      breakpoints,
    }),
    [theme, nextTheme],
  )

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  )
}
