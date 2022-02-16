import React from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

type DonationFieldProps = {
  name: string | undefined
  description: string | undefined
  suggestedDonation?: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function DonationField(props: DonationFieldProps) {
  const sd = props.suggestedDonation ? props.suggestedDonation : 10
  return (
    <TextField
      style={{ padding: 25 }}
      id={props.name}
      name={props.name}
      defaultValue={sd}
      label={props.description}
      helperText={`Suggested donation: $${sd}`}
      onChange={props.onChange}
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
    />
  )
}
