import { createContext, useState, ReactNode, useMemo, useCallback, useEffect } from 'react'
import { evaluate } from 'mathjs'
import { Calcul, CalculContextValue } from '../types/types'

export const CalculContext = createContext<CalculContextValue | null>(null)

type Props = {
  children: ReactNode
}

export function CalculProvider({ children }: Props) {
  const [calcul, updateCalcul] = useState<Calcul>({
    expressionArr: [],
    activeTerm: 0,
    result: undefined,
  })

  const { expressionArr, activeTerm, result } = calcul

  const toDisplay = useCallback(() => {
    if (expressionArr.length === 0) return undefined
    if (result !== undefined) {
      return result
    }

    return expressionArr.join(' ')
  }, [expressionArr, result])

  const handleReset = useCallback(() => {
    updateCalcul({
      expressionArr: [],
      activeTerm: 0,
      result: undefined,
    })
  }, [])

  const handleDel = useCallback(() => {
    if (expressionArr[0] === undefined) return
    let newExpressionArr = [...expressionArr]
    let newActiveTerm = activeTerm

    let newResult = result

    if (result !== undefined) {
      newExpressionArr = []
      newActiveTerm = 0
      newResult = undefined
    } else if (expressionArr.length <= 1 && expressionArr[0].toString().length <= 1) {
      newExpressionArr = []
    } else if (!newExpressionArr[activeTerm]) {
      if (activeTerm >= 2) newActiveTerm -= 2
      if (newExpressionArr[activeTerm] === '') newExpressionArr.pop()
      newExpressionArr.pop()
    } else {
      newExpressionArr[activeTerm] = newExpressionArr[activeTerm].toString()
      newExpressionArr[activeTerm] = newExpressionArr[activeTerm].slice(
        0,
        newExpressionArr[activeTerm].length - 1,
      )
    }

    updateCalcul({
      expressionArr: newExpressionArr,
      activeTerm: newActiveTerm,
      result: newResult,
    })
  }, [activeTerm, expressionArr, result])

  const handleDigitAndPoint = useCallback(
    (digit: number | '.') => {
      let newExpressionArr = [...expressionArr]
      let newResult = result
      let newActiveTerm = activeTerm

      if (result !== undefined) {
        newExpressionArr = []
        newResult = undefined
        newActiveTerm = 0
      }

      if (digit === '.') {
        if (newExpressionArr[newActiveTerm] === undefined) {
          newExpressionArr.push('0.')
        } else if (!newExpressionArr[newActiveTerm].includes('.')) {
          newExpressionArr[newActiveTerm] += '.'
        }
      }

      if (typeof digit === 'number') {
        if (newExpressionArr[newActiveTerm] === undefined) {
          newExpressionArr.push(digit.toString())
        } else if (newExpressionArr[newActiveTerm] === '0') {
          newExpressionArr[newActiveTerm] = digit.toString()
        } else {
          newExpressionArr[newActiveTerm] += digit.toString()
        }
      }

      updateCalcul({
        ...calcul,
        expressionArr: newExpressionArr,
        activeTerm: newActiveTerm,
        result: newResult,
      })
    },
    [activeTerm, calcul, expressionArr, result],
  )

  const handleOperator = useCallback(
    (oper: string) => {
      let newExpressionArr = [...expressionArr]
      let newResult = result
      let newActiveTerm = activeTerm

      if (result !== undefined) {
        newExpressionArr = [result]
        newResult = undefined
        newActiveTerm = 0
      }

      if (expressionArr.length % 2 === 0) return

      console.log(typeof newExpressionArr)

      newExpressionArr[newActiveTerm] = parseFloat(newExpressionArr[newActiveTerm])
      newExpressionArr.push(oper)

      updateCalcul({
        ...calcul,
        activeTerm: newActiveTerm + 2,
        expressionArr: newExpressionArr,
        result: newResult,
      })
    },
    [activeTerm, calcul, expressionArr, result],
  )

  const handleEqual = useCallback(() => {
    const newExpressionArr = [...expressionArr]
    if (newExpressionArr[activeTerm] === undefined) {
      newExpressionArr.pop()
    }
    const expression = newExpressionArr.join(' ').replaceAll('x', '*')
    updateCalcul({ ...calcul, result: evaluate(expression) })
  }, [activeTerm, calcul, expressionArr])

  useEffect(() => {
    console.log(result)
  }, [result])

  const contextValue = useMemo(
    () => ({
      calcul,
      updateCalcul,
      toDisplay,
      handleReset,
      handleDel,
      handleDigitAndPoint,
      handleOperator,
      handleEqual,
    }),
    [
      calcul,
      updateCalcul,
      toDisplay,
      handleReset,
      handleDel,
      handleDigitAndPoint,
      handleOperator,
      handleEqual,
    ],
  )

  return <CalculContext.Provider value={contextValue}>{children}</CalculContext.Provider>
}
