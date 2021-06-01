import { useEffect, useState } from 'preact/hooks'
import { apiStates, useApi } from './hooks/useApi'
import useFirstRender from './hooks/useFirstRender'

import { LoadingSpinner } from './components'

export function App() {
  const [userValue, setUserValue] = useState('')
  const [miscError, setMiscError] = useState('')
  const firstRender = useFirstRender()
  const [submit, setSubmit] = useState(false)
  const { data, state, error, doFetch, clearFetch } = useApi('')

  const { VITE_REDIRECT_URL } = import.meta.env

  if (!VITE_REDIRECT_URL) {
    throw Error('VITE_REDIRECT_URL must be defined in order to redirect.')
  }

  useEffect(() => {
    if (submit) doFetch()
  }, [submit])

  useEffect(() => {
    if (data.ok) {
      let amount = '0.00'
      // if success redirect the user
      window.location = `${VITE_REDIRECT_URL}?amount=${amount}`
    }
  }, [data])

  useEffect(() => {
    if (!firstRender && !userValue) {
      clearFetch()
    }
  }, [firstRender, userValue])

  return (
    <main>
      <div id="codentainer" className={state.toLowerCase()}>
        <img alt="logo" id="logo" src="/business-logo.svg" />
        <h1>Bienvenido a [COMERCIO].</h1>
        <h5>Por favor ingresa tu código:</h5>
        <input
          placeholder="Código"
          value={userValue}
          onInput={({ target }) => setUserValue(target.value)}
        />
        {
          (error || miscError) && (
            <p id="error">
              {error || miscError}
            </p>
          )
        }
        <button disabled={!userValue} onClick={() => setSubmit(true)}>
          {state === apiStates.LOADING ? <LoadingSpinner /> : 'continuar'}
        </button>
        <a>¿No tienes un código?</a>
      </div>
    </main>
  )
}
