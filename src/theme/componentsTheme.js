import { 
  surfaceProps,
  textfieldProps,
  buttonProps,
  linkProps,
  dividerProps,
  formLabelProps,
  radioProps,
  pickerProps,
  typographyProps
} from './componentProps';
export const componentsTheme = {
  dark:{
    ...textfieldProps('dark'),
    ...surfaceProps.dark,
    ...buttonProps,
    ...linkProps('dark'),
    ...dividerProps.dark,
    ...formLabelProps('dark'),
    ...radioProps('dark'),
    ...pickerProps('dark'),
    ...typographyProps
  },
  light:{
    ...textfieldProps('light'),
    ...surfaceProps.light,
    ...buttonProps,
    ...linkProps('light'),
    ...dividerProps.light,
    ...formLabelProps('light'),
    ...radioProps('light'),
    ...pickerProps('light'),
    ...typographyProps
  }
};
