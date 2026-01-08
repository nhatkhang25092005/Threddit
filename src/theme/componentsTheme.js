import {
  surfaceProps,
  textfieldProps,
  buttonProps,
  linkProps,
  dividerProps,
  formLabelProps,
  radioProps,
  pickerProps,
  typographyProps,
  menuProps
} from './componentProps';
export const componentsTheme = {
  dark:{
    ...textfieldProps,
    ...surfaceProps,
    ...buttonProps,
    ...linkProps('dark'),
    ...dividerProps.dark,
    ...formLabelProps('dark'),
    ...radioProps('dark'),
    ...pickerProps('dark'),
    ...typographyProps,
    ...menuProps
  },
  light:{
    ...textfieldProps,
    ...surfaceProps,
    ...buttonProps,
    ...linkProps('light'),
    ...dividerProps.light,
    ...formLabelProps('light'),
    ...radioProps('light'),
    ...pickerProps('light'),
    ...typographyProps,
    ...menuProps
  }
};
