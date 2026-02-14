import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function useUrlTab(paramName = 'tab', defaultTab, validTabs = []){
  const [searchParams, setSearchParams] = useSearchParams()

  // Return the active tab found in url
  const activeTab = useMemo(()=>{
    const tabValue = searchParams.get(paramName) || defaultTab
    if(validTabs.length > 0 && !validTabs.includes(tabValue)){
      return defaultTab || validTabs[0]
    }
    return tabValue || defaultTab
  },[paramName, searchParams, defaultTab, validTabs])

  // Set the active tab onto the url
  const setActiveTab = useCallback((newTabValue)=>{
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set(paramName, newTabValue)
        return next
      },
      {replace:true}
    )
  },[paramName, setSearchParams])
  
  return [activeTab, setActiveTab]
}