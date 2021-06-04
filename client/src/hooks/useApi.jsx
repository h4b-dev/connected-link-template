import { useState, useEffect, useCallback } from 'preact/hooks'

export const apiStates = {
  LOADING: 'LOADING',
  FETCHING: 'FETCHING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  IDLE: 'IDLE'
}

const initalState = {
  state: apiStates.IDLE,
  body: '',
  error: '',
  data: {},
}

export const useApi = url => {
  const [data, setData] = useState(initalState)

  const setPartData = useCallback(
    (partialData) => setData({...data, ...partialData}),
    [data],
  )

  const doFetch = (body = '') => setData((s) => ({...s, body, state: apiStates.FETCHING}))

  const clearFetch = () => setData(initalState)

  useEffect(() => {
    if (data.state === apiStates.FETCHING) {
      setPartData({
        error: '',
        state: apiStates.LOADING,
      })

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setPartData({
            state: apiStates.SUCCESS,
            data
          })
        })
        .catch((err) => {
          setPartData({
            state: apiStates.ERROR,
            error: `fetch failed. ${err}`
          })
        })
    }
  }, [setPartData, url, data])

  return { ...data, doFetch, clearFetch }
}
