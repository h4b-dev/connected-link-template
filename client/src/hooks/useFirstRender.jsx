import { useRef, useEffect } from 'preact/hooks'

const useFirstRender = () => {
  const firstRender = useRef(true)

  useEffect(() => {
    firstRender.current = false
  }, [])

  return firstRender.current
}

export default useFirstRender
