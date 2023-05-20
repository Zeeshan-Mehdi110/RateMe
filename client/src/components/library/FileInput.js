import { FormHelperText, TextField } from '@mui/material'

function FileInput(props) {
  const { input, meta, ...rest } = props
  const { touched, error } = meta
  return (
    <>
      <TextField
        fullWidth
        onChange={(event) => input.onChange(event.target.files[0])}
        {...rest}
        size="small"
        error={touched && error ? true : false}
        type="file"
      />
      <FormHelperText error>
        {touched && error ? error : <span>&nbsp;</span>}
      </FormHelperText>
    </>
  )
}

export default FileInput
