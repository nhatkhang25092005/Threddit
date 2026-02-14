import { Children, useMemo, useState } from "react"
import { Tabs, Tab, Box } from "@mui/material"
import Surface from "../common/Surface"
import { useUrlTab } from '../../hooks/useUrlTab'

function TabsUI({
  children,
  sx,
  variant,
  value,
  handleChange
}) {
  const childrenArray = useMemo(
    () => Children.toArray(children),
    [children]
  )

  const safeValue =
    value >= 0 && value < childrenArray.length
      ? value
      : 0

  return (
    <>
      <Surface sx={sx} variant={variant}>
        <Tabs value={safeValue} onChange={handleChange}>
          {childrenArray.map((child, index) => (
            <Tab
              key={index}
              label={child.props?.label}
              id={`simple-tab-${index}`}
              aria-controls={`simple-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Surface>

      {childrenArray.map((child, index) => {
        if (safeValue !== index) return null

        return (
          <div
            key={index}
            role="tabpanel"
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
          >
            <Box>{child}</Box>
          </div>
        )
      })}
    </>
  )
}

function TabsUncontrolled({
  children,
  defaultIndex = 0,
  ...rest
}) {
  const [value, setValue] = useState(defaultIndex)

  return (
    <TabsUI
      {...rest}
      children={children}
      value={value}
      handleChange={(_, newIndex) => setValue(newIndex)}
    />
  )
}

function TabsControlled({
  children,
  value,
  onChange,
  ...rest
}) {
  if (onChange == null) {
    console.error(
      'TabsControlled: onChange is required in controlled mode'
    )
  }

  return (
    <TabsUI
      {...rest}
      children={children}
      value={value}
      handleChange={(_, newIndex) => onChange?.(newIndex)}
    />
  )
}

function TabsUrl({
  children,
  urlParams,
  tabNames,
  defaultTab,
  ...rest
}) {
  const childrenArray = useMemo(
    () => Children.toArray(children),
    [children]
  )

  const autoTabNames = useMemo(() => {
    if (tabNames) return tabNames

    return childrenArray.map((child, index) => {
      const explicitName =
        child?.props?.name || child?.props?.value
      if (explicitName) return explicitName

      const label = child?.props?.label || `tab-${index}`
      return label
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
    })
  }, [childrenArray, tabNames])

  const [activeTabName, setActiveTabName] = useUrlTab(
    urlParams,
    defaultTab || autoTabNames[0],
    autoTabNames
  )

  const nameToIndex = useMemo(() => {
    const map = {}
    autoTabNames.forEach((name, index) => {
      map[name] = index
    })
    return map
  }, [autoTabNames])

  const value = nameToIndex[activeTabName] ?? 0

  return (
    <TabsUI
      {...rest}
      children={children}
      value={value}
      handleChange={(_, newIndex) =>
        setActiveTabName(autoTabNames[newIndex])
      }
    />
  )
}

export default function TabsController(props) {
  const { value, urlParams } = props

  if (urlParams !== undefined) {
    return <TabsUrl {...props} />
  }

  if (value !== undefined) {
    return <TabsControlled {...props} />
  }

  return <TabsUncontrolled {...props} />
}