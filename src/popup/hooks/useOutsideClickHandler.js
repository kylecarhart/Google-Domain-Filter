import { useEffect } from 'react'

export default function useOutsideClickHandler(ref, isDisabled, callback) {
  const handleClick = e => {
    if (!ref.current.contains(e.target) && !isDisabled) {
      callback()
    }
  }

  useEffect(() => {
    if (!isDisabled) {
      document.addEventListener('mousedown', handleClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [isDisabled])
}
