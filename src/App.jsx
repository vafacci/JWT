import { useState } from 'react'
import { Outlet } from 'react-router'
import ErrorBanner from './components/ErrorBanner'
import { useAuth } from './hooks/useAuth'

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const auth = useAuth()

  return (
    <>
      <ErrorBanner errorMessage={errorMessage} onClear={() => setErrorMessage(null)} />
      <Outlet context={{ auth, setErrorMessage }} />
    </>
  )
}
