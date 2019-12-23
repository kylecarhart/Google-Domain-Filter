import { useState, useEffect } from 'react'

/*
 * @param {string} keyValue -
 * @return {Promise} resolves to keyValue, otherwise rejects on error
 */
export function set(key, value) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.string)
      } else {
        resolve({ [key]: value })
      }
    })
  })
}

/*
 * @param {(string|string[]|object)} keys - one key, multiple keys, or a dictionary of keys with initial values
 * @return {Promise} resolves to response, otherwise rejects on error
 */
export function get(keys) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(keys, res => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.string)
      } else {
        resolve(res)
      }
    })
  })
}

/*
 * Hook for persisting data to chrome storage
 * @param {string} key
 * @param {*} initialValue
 */
export default function useStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue)

  useEffect(() => {
    get(key).then(res => {
      if (res[key]) {
        setStoredValue(res[key])
      }
    })
  }, [])

  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value // allows for lazy state initialization
      setStoredValue(valueToStore)
      set(key, valueToStore)
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}
