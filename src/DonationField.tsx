import React from 'react'
import TextField from '@material-ui/core/TextField'

type DonationFieldProps = {
  name: string | undefined
}

export default function (props: DonationFieldProps) {
  return <TextField name={props.name} />
}
