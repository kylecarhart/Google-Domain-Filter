import { useState, useEffect } from 'react'

const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([-.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

export default function useStateWithValidation(initialState, regex) {
  const [state, setState] = useState(initialState)
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    if (regex instanceof RegExp) {
      setIsValid(regex.test(state))
    } else {
      switch (regex) {
        case 'URL':
          setIsValid(urlRegex.test(state))
          break
        default:
          break
      }
    }
  }, [state])

  return [state, setState, isValid]
}
