import { useContext } from 'react'
import styled, { css } from 'styled-components'
import { CalculContext } from '../context/CalculContext'
import { tabletLandscape } from '../styles/breakpoints'
import { CalculContextValue, Keys, Size, Type } from '../types/types'

type StyledKeyProps = {
  $size: Size
  $type: Type
}

const StyledKey = styled.button<StyledKeyProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  height: 100%;
  width: 100%;
  border-radius: 5px;
  padding-top: 4px;
  grid-column-end: ${({ $size }) => `span ${$size}`};

  &:hover {
    filter: brightness(140%);
    transition: filter 0.4s ease;
  }

  &:active {
    scale: 0.98;
    transition: scale 0.1s ease;
  }

  ${tabletLandscape(css`
    padding-top: 6px;
  `)}

  ${({ $type, theme }) => {
    switch ($type) {
      case 'primary':
        return css`
          font-size: 2rem;
          background: ${theme.primaryKeyBackground};
          box-shadow: 0px 4px ${theme.primaryKeyShadow};
          color: ${theme.primaryKeyText};

          ${tabletLandscape(css`
            font-size: 2.5rem;
          `)}
        `
      case 'secondary':
        return css`
          font-size: 1.125rem;
          background: ${theme.secondaryKeyBackground};
          box-shadow: 0px 4px ${theme.secondaryKeyShadow};
          color: ${theme.secondaryKeyText};

          ${tabletLandscape(css`
            font-size: 1.75rem;
          `)}
        `
      case 'tertiary':
        return css`
          font-size: 1.25rem;
          background: ${theme.tertiaryKeyBackground};
          box-shadow: 0px 4px ${theme.tertiaryKeyShadow};
          color: ${theme.tertiaryKeyText};

          ${tabletLandscape(css`
            font-size: 1.625rem;
          `)}
        `
      default:
        return ''
    }
  }}
`

type Props = {
  content: Keys
  type: Type
  size: Size
}

export default function Key({ content, type, size }: Props) {
  const { handleKey } = useContext(CalculContext) as CalculContextValue

  return (
    <StyledKey $type={type} $size={size} onClick={() => handleKey(content)}>
      {content}
    </StyledKey>
  )
}
