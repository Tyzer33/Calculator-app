import { css, RuleSet } from 'styled-components'

const BREAKPOINTS = {
  TABLET_PORTRAIT: '600px',
  TABLET_LANDSCAPE: '900px',
  DESKTOP: '1200px',
  BIG_DESKTOP: '1800px',
}

type Css = RuleSet<object>

export function tabletPortrait(inner: Css) {
  return css`
    @media (min-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
      ${inner};
    }
  `
}

export function tabletLandscape(inner: Css) {
  return css`
    @media (min-width: ${BREAKPOINTS.TABLET_LANDSCAPE}) {
      ${inner};
    }
  `
}
export function desktop(inner: Css) {
  return css`
    @media (min-width: ${BREAKPOINTS.DESKTOP}) {
      ${inner};
    }
  `
}
export function bigDesktop(inner: Css) {
  return css`
    @media (min-width: ${BREAKPOINTS.BIG_DESKTOP}) {
      ${inner};
    }
  `
}
