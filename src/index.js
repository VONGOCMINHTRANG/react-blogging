import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from './utils/constants'
import { GlobalStyles } from './styles/GlobalStyles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { I18nextProvider } from 'react-i18next'
import i18n from './translation/i18'
import { LanguageProvider } from 'contexts/language-context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles></GlobalStyles>
          <BrowserRouter>
            <App />
            <ToastContainer></ToastContainer>
          </BrowserRouter>
        </ThemeProvider>
      </LanguageProvider>
    </I18nextProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
