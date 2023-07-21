import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import App from './components/App'
import { CalculProvider } from './context/CalculContext'
import { CustomThemeProvider } from './context/CustomThemeContext'
import GlobalStyle from './styles/globalStyles'

// TODO: Ajouter Composant Error à Error-Boundary

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<p>Error</p>}>
      <CustomThemeProvider>
        <CalculProvider>
          <GlobalStyle />
          <App />
        </CalculProvider>
      </CustomThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
