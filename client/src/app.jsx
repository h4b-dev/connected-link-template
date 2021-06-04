import { useEffect, useState, useCallback } from 'preact/hooks'
import { apiStates, useApi } from './hooks/useApi'
import useFirstRender from './hooks/useFirstRender'

import { LoadingSpinner } from './components'

const { VITE_PAY_URL, VITE_PAY_API_URL, VITE_PERMALINK_CODE, DEV } = import.meta.env

if (!VITE_PAY_URL || !VITE_PAY_API_URL) {
  throw Error('ENVS must be defined.')
}

const getUserAmountEndpoint = `${DEV ? 'http://localhost:3001' : ''}/getUserAmount`

export function App() {
  const [userValue, setUserValue] = useState('')
  const [miscError, setMiscError] = useState('')
  const [storeInfo, setStoreInfo] = useState({
    color: '#5B1A8A',
    imageUrl: '/h4b-logo.png',
    currencyCode: '',
    name: '',
  })
  const firstRender = useFirstRender()
  const { data, state, error, doFetch, clearFetch } = useApi(getUserAmountEndpoint)

  useEffect(() => {
    if (data.amount) {
      window.location = `${VITE_PAY_URL}/pl/${VITE_PERMALINK_CODE}?amount=${data.amount}&currencyCode=${storeInfo.currencyCode}`
    }
  }, [data])

  useEffect(() => {
    if (!firstRender && !userValue) {
      clearFetch()
    }
  }, [firstRender, userValue])

  useEffect(() => {
    const getLinkInfo = async () => {
      try {
        const res = await fetch(`${VITE_PAY_API_URL}/LinkInfo/Permalink?orderCode=${VITE_PERMALINK_CODE}`)
        const { store } = await res.json()
        setStoreInfo({
          imageUrl: store.storeImageUrl,
          color: store.storeBannerColor,
          currencyCode: store.config.currencyCode,
          name: store.name
        })
      } catch (err) {
        throw Error(`Could not fetch store info. ${err}`)
      }
    }
    getLinkInfo()
  }, [])

  const submitCode = useCallback(
    () => {
      if (state !== apiStates.LOADING || state !== apiStates.FETCHING) {
        doFetch(JSON.stringify({ code: userValue }))
      }
    },
    [state],
  )

  return (
    <main style={{ color: storeInfo.color }}>
      <div id="main-bg" />
      <div id="codentainer" className={state.toLowerCase()}>
        <div id="logo-container">
          <img alt="logo" id="logo" src={storeInfo.imageUrl} />
        </div>
        <h1>
          Bienvenido a
          <b>{storeInfo.name}</b>
        </h1>
        <label>
          <p>Ingresa tu código</p>
          <input
            placeholder="Código"
            value={userValue}
            onInput={({ target }) => setUserValue(target.value)}
          />
        </label>
        {
          (error || miscError) && (
            <p id="error">
              {error || miscError}
            </p>
          )
        }
        <button
          disabled={!userValue}
          onClick={submitCode}
          style={{ backgroundColor: storeInfo.color }}
        >
          {state === apiStates.LOADING || state === apiStates.FETCHING
            ? <LoadingSpinner />
            : 'continuar'
          }
        </button>
        <a>¿No tienes un código?</a>
      </div>
    </main>
  )
}
