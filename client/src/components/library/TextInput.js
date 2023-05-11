import { FormHelperText, TextField } from '@mui/material'

function TextInput(props) {
    const { input, meta, ...rest } = props;
    const { touched, error } = meta;
  return (
    <>
        <TextField fullWidth {...input} {...rest} size='small' error={touched && error ? true : false} />
        <FormHelperText error>
            {
                touched && error ? error : <span>&nbsp;</span>
            }
        </FormHelperText>
    </>
  )
}

export default TextInput