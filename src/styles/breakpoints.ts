import { css } from 'styled-components'
import { CSS } from '../types/types'

const BREAKPOINTS = {
  TABLET_PORTRAIT: '600px',
  TABLET_LANDSCAPE: '900px',
  DESKTOP: '1200px',
  BIG_DESKTOP: '1800px',
}

export function tabletPortrait(inner: CSS) {
  return css`
    @media (min-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
      ${inner};
    }
  `
}

export function tabletLandscape(inner: CSS) {
  return css`
    @media (min-width: ${BREAKPOINTS.TABLET_LANDSCAPE}) {
      ${inner};
    }
  `
}
export function desktop(inner: CSS) {
  return css`
    @media (min-width: ${BREAKPOINTS.DESKTOP}) {
      ${inner};
    }
  `
}
export function bigDesktop(inner: CSS) {
  return css`
    @media (min-width: ${BREAKPOINTS.BIG_DESKTOP}) {
      ${inner};
    }
  `
}
