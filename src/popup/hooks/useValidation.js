import { useState, useEffect } from 'react'

export const URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([-.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

export default function useValidation(state, regex) {
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    setIsValid(regex.test(state))
  }, [state])

  return isValid
}
