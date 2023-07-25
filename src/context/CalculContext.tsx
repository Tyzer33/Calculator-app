import { createContext, useState, ReactNode, useMemo, useCallback, useEffect } from 'react'
import { evaluate } from 'mathjs'
import { CalculContextValue, Digit, Keys, Operator } from '../types/types'
import keysList from '../keysList'

export const CalculContext = createContext<CalculContextValue | null>(null)

type Props = {
  children: ReactNode
}

export function CalculProvider({ children }: Props) {
  const [activeTerm, setActiveTerm] = useState<string>('')
  const [calcul, setCalcul] = useState<string[]>([])
  const [result, setResult] = useState<string | null>(null)
  const display = result || `${calcul.join(' ')} ${activeTerm}`

  const resetState = useCallback(() => {
    setActiveTerm('')
    setCalcul([])
    setResult(null)
  }, [])

  const handleDigit = useCallback(
    (digit: Digit) => {
      if (result) {
        resetState()
      }
      if (activeTerm === '0') {
        setActiveTerm(digit)
      } else {
        setActiveTerm((prev) => prev + digit)
      }
    },
    [result, resetState, activeTerm],
  )

  const handlePoint = useCallback(() => {
    if (activeTerm.includes('.')) return
    if (activeTerm === '') {
      setActiveTerm('0.')
    } else {
      setActiveTerm((prev) => `${prev}.`)
    }
  }, [activeTerm])

  const handleOperator = useCallback(
    (operator: Operator) => {
      if (result === '∞') return
      const termToPush = result?.replaceAll(',', '') || activeTerm
      if (termToPush === '') return
      if (result) {
        resetState()
      }

      // Format string to number standard keeping string type
      const numberTerm = Number(termToPush)
      const stringTerm = numberTerm.toLocaleString('en-US')

      setCalcul((prev) => [...prev, stringTerm, operator])
      setActiveTerm('')
    },
    [activeTerm, result, resetState],
  )

  const handleDel = useCallback(() => {
    if (activeTerm === '' && calcul.length === 0) return
    if (activeTerm === '') {
      setActiveTerm(calcul[calcul.length - 2])
      setCalcul((prev) => prev.slice(0, -2))
    } else {
      setActiveTerm((prev) => prev.slice(0, -1))
    }
  }, [activeTerm, calcul])

  const handleEqual = useCallback(() => {
    if (calcul.length === 0) return

    const strCalcul = calcul.join('').replaceAll('x', '*').replaceAll(',', '')
    const expression = activeTerm === '' ? strCalcul.slice(0, -1) : strCalcul + activeTerm // If activeTerm is empty last member of calcul is an operator because calcul isn't empty

    const evaluation = evaluate(expression)
    const strEval = typeof evaluation === 'number' ? evaluation.toLocaleString('en-US') : evaluation

    if (typeof strEval === 'string') {
      setResult(strEval)
    }
  }, [activeTerm, calcul])

  const handleKey = useCallback(
    (keyContent: Keys) => {
      switch (keyContent) {
        case 'RESET':
          resetState()
          break
        case 'DEL':
          handleDel()
          break
        case '=':
          handleEqual()
          break
        case '.':
          handlePoint()
          break
        case '+':
        case '-':
        case '/':
        case 'x':
          handleOperator(keyContent)
          break
        default:
          handleDigit(keyContent)
          break
      }
    },
    [resetState, handleDel, handleEqual, handlePoint, handleOperator, handleDigit],
  )

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      keysList.forEach(({ onKeyboard, content }) => {
        if (e.key === onKeyboard) {
          handleKey(content)
        }
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKey])

  const contextValue = useMemo(
    () => ({
      display,
      handleKey,
    }),
    [display, handleKey],
  )

  return <CalculContext.Provider value={contextValue}>{children}</CalculContext.Provider>
}
