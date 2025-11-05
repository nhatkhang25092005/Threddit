import PropTypes from 'prop-types';
import {Box} from "@mui/material"
export default function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  const isActive = value === index
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        visibility: isActive ? 'visible' : 'hidden',
        height: isActive ? 'auto' : 0,
        overflow: 'hidden'
      }}
    >
    <Box>{children}</Box>
    </div>
  );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};