import { useEffect, useState } from 'preact/hooks'
import { apiStates, useApi } from './hooks/useApi'
import useFirstRender from './hooks/useFirstRender'

const Loading = () => (
  <div className="spinner">
    <div className="bounce1" />
    <div className="bounce2" />
    <div className="bounce3" />
  </div>
)

export function App() {
  const [userValue, setUserValue] = useState('')
  const firstRender = useFirstRender()
  const [submit, setSubmit] = useState(false)
  const { data, state, error, doFetch, clearFetch } = useApi('')

  useEffect(() => {
    if (submit) {
      doFetch()
    }
  }, [submit])

  useEffect(() => {
    if (data.ok) {
      // redirect on ok
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
          error && (
            <p id="error">
              {error}
            </p>
          )
        }
        <button disabled={!userValue} onClick={() => setSubmit(true)}>
          {state === apiStates.LOADING ? <Loading /> : 'continuar'}
        </button>
        <a>¿No tienes un código?</a>
      </div>
    </main>
  )
}
