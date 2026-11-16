import { login } from '../apiFacade'

function LogIn({ setErrorMessage }) {
  const handleSubmit = async (evt) => {
    evt.preventDefault()
    setErrorMessage(null)

    const form = evt.target
    const formObject = Object.fromEntries(new FormData(form))
    console.log(formObject)

    try {
      await login(formObject.username, formObject.password)
    } catch (error) {
      console.error('MESSAGE: ', error);
      setErrorMessage(error.message)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" name="username" />
        <input type="text" placeholder="Password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LogIn
