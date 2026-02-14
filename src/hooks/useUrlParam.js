import { useEffect, useState, } from "react"
import { useLocation, useNavigate } from "react-router-dom"
/**
 * Read the params with given name
 * @param {string[]} paramNames
 * @returns {object} 
 */
export function useUrlParam(paramName) {
  const location = useLocation()
  const [value, setValue] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (!params.has(paramName)) return

    const paramValue = params.get(paramName)
    setValue(paramValue)
    params.delete(paramName)
      navigate(
      {
        pathname: location.pathname,
        search: params.toString()
          ? `?${params.toString()}`
          : ""
      },
      { replace: true }
    )

  }, [])

  return value

}
