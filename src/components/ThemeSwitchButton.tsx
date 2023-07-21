import styled, { css } from 'styled-components'
import { useContext, useState } from 'react'
import { CustomThemeContext } from '../context/CustomThemeContext'
import { CustomThemeContextValue } from '../types/types'

type ButtonPosition = 'left' | 'center' | 'right'

type ContainerProps = {
  $position: ButtonPosition
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid: 'none number' 'label button';
  gap: 0.25rem 1.75rem;
`

const Label = styled.span`
  grid-area: label;
  font-size: 12px;
  letter-spacing: 0.05rem;
  color: ${({ theme }) => theme.headerText};
`

const Number = styled.div`
  display: flex;
  justify-content: space-around;
  grid-area: number;
  color: ${({ theme }) => theme.headerText};
  font-size: 12px;
`

const Button = styled.button<ContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  grid-area: button;
  background: ${({ theme }) => theme.themeSwitchBackground};
  width: 71px;
  height: 26px;
  border-radius: 100px;
  padding: 0 0.3125rem;

  &:hover {
    &::after {
      filter: brightness(160%);
      transition: filter 0.5s ease;
    }
  }

  &::after {
    content: '';
    position: absolute;
    border-radius: 1rem;
    height: 1rem;
    width: 1rem;
    background: ${({ theme }) => theme.themeSwitch};

    ${({ $position }) => {
      switch ($position) {
        case 'left':
          return css`
            left: 5px;
          `
        case 'center':
          return css`
            left: 50%;
            translate: -62.5%;
          `
        case 'right':
          return css`
            right: 5px;
          `
        default:
          return ''
      }
    }}
  }
`

export default function ThemeSwitchButton() {
  const { theme, setTheme } = useContext(CustomThemeContext) as CustomThemeContextValue
  const [buttonPosition, setButtonPosition] = useState<ButtonPosition>('left')

  // TODO: préciser type theme
  function nextTheme(currentTheme: string) {
    if (currentTheme === 'first') {
      setTheme('second')
      setButtonPosition('center')
    } else if (currentTheme === 'second') {
      setTheme('third')
      setButtonPosition('right')
    } else if (currentTheme === 'third') {
      setTheme('first')
      setButtonPosition('left')
    }
  }

  return (
    <Container>
      <Label>THEME</Label>
      <Number>
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </Number>
      <Button $position={buttonPosition} onClick={() => nextTheme(theme)} />
    </Container>
  )
}
