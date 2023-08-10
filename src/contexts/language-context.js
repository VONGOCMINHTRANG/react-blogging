import { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageContext = createContext()

function LanguageProvider(props) {
  const { i18n } = useTranslation()
  const [defaultLanguage, setDefaultLanguage] = useState({
    1: localStorage.getItem('NEXT_LOCALE') === 'vi' ? true : false,
    2: localStorage.getItem('NEXT_LOCALE') === 'en' ? true : false,
    3: localStorage.getItem('NEXT_LOCALE') === 'ci' ? true : false,
  })

  const handleChangeVI = () => {
    setDefaultLanguage(1)
    i18n.changeLanguage('vi')
  }

  const handleChangeEN = () => {
    setDefaultLanguage(2)
    i18n.changeLanguage('en')
  }

  const handleChangeCI = () => {
    setDefaultLanguage(3)
    i18n.changeLanguage('ci')
  }

  useEffect(() => {
    if (localStorage.getItem('language')) {
      switch (localStorage.getItem('language')) {
        case 'vi':
          setDefaultLanguage(1)
          break
        case 'en':
          setDefaultLanguage(2)
          break
        case 'ci':
          setDefaultLanguage(3)
          break
        default:
          setDefaultLanguage(2)
          break
      }
    }
  }, [])

  const value = { defaultLanguage, handleChangeVI, handleChangeEN, handleChangeCI }
  return <LanguageContext.Provider value={value} {...props}></LanguageContext.Provider>
}

function useLanguage() {
  const context = useContext(LanguageContext)
  if (typeof context === 'undefined') {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export { LanguageProvider, useLanguage }
