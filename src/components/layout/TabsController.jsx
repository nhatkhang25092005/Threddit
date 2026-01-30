import { Children, useState } from "react"
import {Tabs, Tab, Box} from '@mui/material'
import Surface from "../common/Surface";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}


export default function TabsController({children, sx, variant = null}){
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const childrenArray = Children.toArray(children)

  return (
    <>
      <Surface sx={sx} variant={variant ? variant : 'default'}>
        <Tabs onChange={handleChange} value={value}>
          {childrenArray.map((child, index)=>(
            <Tab key={index} label={child.props.label} {...a11yProps(index)}/>
          ))}
        </Tabs>
      </Surface>
      {childrenArray.map((child, index) => (
        <TabPanel key={index} value={value} index={index}>
          {child}
        </TabPanel>
      ))}
    </>
  )
}