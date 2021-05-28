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
  error: '',
  data: [],
}

export const useApi = url => {
  const [data, setData] = useState(initalState)

  const setPartData = useCallback(
    (partialData) => setData({...data, ...partialData}),
    [data],
  )

  const doFetch = () => setData((s) => ({...s, state: apiStates.FETCHING}))

  const clearFetch = () => setData(initalState)

  useEffect(() => {
    if (data.state === apiStates.FETCHING) {
      setPartData({
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
        .catch(() => {
          setPartData({
            state: apiStates.ERROR,
            error: 'fetch failed'
          })
        })
    }
  }, [setPartData, url, data])

  return { ...data, doFetch, clearFetch }
}
