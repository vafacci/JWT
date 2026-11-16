import { useOutletContext } from 'react-router'
import LogIn from '../components/Login'
import ViewData from '../components/ViewData'

// Midlertidig side indtil AuthDemoPage er lavet
export default function Home() {
  const { setErrorMessage } = useOutletContext()
  return (
    <>
      <LogIn setErrorMessage={setErrorMessage} />
      <ViewData />
    </>
  )
}
