import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import App from './components/App'
import { CalculProvider } from './context/CalculContext'
import { CustomThemeProvider } from './context/CustomThemeContext'
import GlobalStyle from './styles/globalStyles'
import CustomError from './components/CustomError'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CustomThemeProvider>
      <GlobalStyle />
      <ErrorBoundary fallback={<CustomError />}>
        <CalculProvider>
          <App />
        </CalculProvider>
      </ErrorBoundary>
    </CustomThemeProvider>
  </React.StrictMode>,
)
