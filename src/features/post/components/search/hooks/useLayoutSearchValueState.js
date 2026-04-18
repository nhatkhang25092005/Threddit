import { useCallback, useEffect, useMemo, useState } from "react";
import { resolveQueryFromLocation } from "./layoutSearchController.utils";

export default function useLayoutSearchValueState({
  pathname,
  search,
  searchPath,
}) {
  const [value, setValue] = useState("")
  const queryFromUrl = useMemo(
    () => resolveQueryFromLocation({ pathname, search, searchPath }),
    [pathname, search, searchPath]
  )
  const query = value.trim()
  const hasValue = query.length > 0

  const handleChange = useCallback((event) => {
    setValue(event.target.value)
  }, [])

  useEffect(() => {
    if (!queryFromUrl) return

    setValue((currentValue) => (
      currentValue === queryFromUrl ? currentValue : queryFromUrl
    ))
  }, [queryFromUrl])

  return {
    handleChange,
    hasValue,
    query,
    setValue,
    value,
  }
}
