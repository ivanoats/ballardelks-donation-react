import React from 'react'
import { Button, TextField, InputAdornment } from '@material-ui/core'
import DonationField from './DonationField'

export const DonationFormik = (props: any) => {
  const changeHandler = () => {
    console.log('changeHandler')
  }

  const suggestedDonation = {
    elksnf: 10,
    tallelks: 10,
    scholarship: 10,
    childrenshospital: 12,
    xmasbaskets: 5,
    buildingfund: 10,
  }

  return (
    <form onChange={() => {}}>
      <fieldset style={{ border: 0 }}>
        <p>
          <TextField label="Member Name" required style={{ padding: 25 }} />
        </p>
        <p>
          <TextField
            style={{ padding: 25 }}
            label="Membership Number"
            required
          />
        </p>
        <h3>Regular Prepaid Dues 12 Months</h3>
        <p>
          Including per captia dues and assessments for Grand Lodge and the
          Washington State Elks Association in accordance with the Constitution
          and Section 14.300 of the Statues of the Order.
        </p>
        <TextField
          style={{ padding: 25 }}
          id="dues"
          label="Annual Dues"
          required
          disabled
          defaultValue={props.dues}
          helperText={`Requied Dues $${props.dues}`}
          onChange={changeHandler}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <h3>Lodge Required Charities</h3>

        <DonationField
          name="elksnf"
          description="Elks National Foundation"
          onChange={changeHandler}
        />
        <DonationField
          name="tallelks"
          description="State Major Project Tall Elks Therapy Program"
          onChange={changeHandler}
        />
        <h3>Lodge Charitable Items</h3>
        <DonationField
          name="scholarship"
          description="Lodge Scholarship Fund"
          onChange={changeHandler}
        />
        <DonationField
          name="childrenshospital"
          description="Children's Hospital Donation"
          suggestedDonation={suggestedDonation.childrenshospital}
          onChange={changeHandler}
        />
        <DonationField
          name="xmasbaskets"
          description="Christmas Baskets"
          suggestedDonation={suggestedDonation.xmasbaskets}
          onChange={changeHandler}
        />
        <DonationField
          name="buildingfund"
          description="Building Fund"
          onChange={changeHandler}
        />
        <h3>Address Updates</h3>
        <p>
          <TextField
            multiline
            name="comment"
            variant="outlined"
            helperText="Let us know any comments or Address Updates necessary here"
            rows="4"
          />
        </p>
      </fieldset>
    </form>
  )
}
