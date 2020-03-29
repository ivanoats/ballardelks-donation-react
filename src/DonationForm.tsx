import React, { Component } from 'react'
import PayPalExpressBtn from 'react-paypal-express-checkout'
import DonationFieldItem from './DonationFieldItem'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

type ValueObject = { [key: string]: { value: number } }
type StrNumber = { [key: string]: number }

type DonationFormState = {
  total: number
  formControls: ValueObject
}

type DonationFormProps = {
  membershipRate: number
}

class DonationForm extends Component<DonationFormProps, DonationFormState> {
  static defaultProps = {
    membershipRate: 119,
  }

  suggestedDonation: StrNumber = {
    test: 6,
    elksnf: 10,
    tallelks: 10,
    scholarship: 10,
  }

  private mapToValueObject = function (original: StrNumber) {
    const newO: ValueObject = {}
    Object.entries(original).forEach((o: [string, number]) => {
      newO[o[0]] = { value: o[1] }
    })
    return newO
  }

  state: DonationFormState = {
    formControls: this.mapToValueObject(this.suggestedDonation),
    /*{
      test: { value: this.suggestedDonation.test },
      elksnf: { value: this.suggestedDonation.elksnf },
      tallelks: { value: this.suggestedDonation.tallelks },
      scholarship: { value: this.suggestedDonation.scholarship },
    },*/
    total: 0,
  }
  constructor(props: DonationFormProps) {
    super(props)
  }

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let target = event.target as HTMLInputElement
    const name = target.name
    const value = Number.parseInt(target.value, 10) // NaN if letter

    const newState = {
      formControls: {
        ...this.state.formControls,
        [name]: { ...this.state.formControls[name], value },
      },
    }

    const totals = Object.values(newState.formControls).map((v: any) => v.value)
    const total = totals.reduce((a: number, b: number) => a + b, 0)
    this.setState({
      ...newState,
      total: total,
    })
  }

  render() {
    const client = {
      sandbox: process.env.REACT_APP_PAYPAL_SANDBOX,
    }
    return (
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <form>
            <fieldset>
              <h4>Regular Prepaid Dues 12 Months</h4>
              <p>
                Including per captia dues and assessments for Grand Lodge and
                the Washington State Elks Association in accordance with the
                Constitution and Section 14.300 of the Statues of the Order.
              </p>
              <h4>Lodge Required Charities</h4>
              <TextField
                id="test"
                label="Elks are awesome fund"
                defaultValue={this.suggestedDonation['test']}
                helperText={`Suggested donation: $${this.suggestedDonation['test']}`}
                onChange={this.changeHandler}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              <DonationFieldItem
                name="elksnf"
                description="Elks National Foundation"
                onChange={this.changeHandler}
              />
              <DonationFieldItem
                name="tallelks"
                description="State Major Project Tall Elks Therapy Program"
                onChange={this.changeHandler}
              />
              <h4>Lodge Charitable Items</h4>
              <DonationFieldItem
                name="scholarship"
                description="Lodge Scholarship Fund"
                onChange={this.changeHandler}
              />
            </fieldset>
          </form>
        </Grid>
        <Grid item xs={12} sm={6}>
          <p>Total: {this.state.total}</p>
          <PayPalExpressBtn
            client={client}
            currency={'USD'}
            total={this.state.total}
          />
        </Grid>
      </Grid>
    )
  }
}

export default DonationForm
