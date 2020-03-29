import React, { Component } from 'react'
import PayPalExpressBtn from 'react-paypal-express-checkout'
import DonationField from './DonationField'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import * as R from 'rambda'
import TextField from '@material-ui/core/TextField'

type ValueObject = { [key: string]: { value: number } }
type StrNumber = { [key: string]: number }

type DonationFormState = {
  total: number
  status?: string
  formControls: ValueObject
}

type DonationFormProps = {
  dues: number
}

class DonationForm extends Component<DonationFormProps, DonationFormState> {
  static defaultProps = {
    dues: 119,
  }

  suggestedDonation: StrNumber = {
    elksnf: 10,
    tallelks: 10,
    scholarship: 10,
    childrenshospital: 12,
    xmasbaskets: 5,
    buildingfund: 10,
  }

  private totalSuggestedDonation = (sd: StrNumber) => {
    return R.sum(Object.entries(sd).map((x) => x[1]))
  }

  private mapToValueObject = function (original: StrNumber) {
    const newValue: ValueObject = {}
    Object.entries(original).forEach((o: [string, number]) => {
      newValue[o[0]] = { value: o[1] }
    })
    return newValue
  }

  state: DonationFormState = {
    formControls: this.mapToValueObject(this.suggestedDonation),
    status: 'Waiting for form to be filled and button pressed',
    total:
      this.totalSuggestedDonation(this.suggestedDonation) + this.props.dues,
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
    let total =
      this.props.dues + totals.reduce((a: number, b: number) => a + b, 0)
    if (total < 0) total = 0
    if (Number.isNaN(total)) total = 0
    this.setState({
      ...newState,
      total: total,
    })
  }

  onCancel = (data: any) => {
    console.log(`Cancelled`, data)
    this.setState({ status: 'Cancelled. Try again?' })
  }
  onSuccess = (payment: any) => {
    console.log('Payment successful!', payment)
    this.setState({ status: 'Success!' })
  }
  onError = (err: any) => {
    console.log(`Error: ${err}`)
    this.setState({ status: 'Error' })
  }

  render() {
    const client = {
      sandbox: process.env.REACT_APP_PAYPAL_SANDBOX,
    }
    return (
      <Grid container spacing={4}>
        <Grid item>
          <form>
            <fieldset style={{ border: 0 }}>
              <p>
                <TextField
                  label="Member Name"
                  required
                  style={{ padding: 25 }}
                />
              </p>
              <p>
                <TextField
                  style={{ padding: 25 }}
                  label="Membership Nuumber"
                  required
                />
              </p>
              <h3>Regular Prepaid Dues 12 Months</h3>
              <p>
                Including per captia dues and assessments for Grand Lodge and
                the Washington State Elks Association in accordance with the
                Constitution and Section 14.300 of the Statues of the Order.
              </p>
              <TextField
                style={{ padding: 25 }}
                id="dues"
                label="Annual Dues"
                required
                disabled
                defaultValue={this.props.dues}
                helperText={`Requied Dues $${this.props.dues}`}
                onChange={this.changeHandler}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              <h3>Lodge Required Charities</h3>

              <DonationField
                name="elksnf"
                description="Elks National Foundation"
                onChange={this.changeHandler}
              />
              <DonationField
                name="tallelks"
                description="State Major Project Tall Elks Therapy Program"
                onChange={this.changeHandler}
              />
              <h3>Lodge Charitable Items</h3>
              <DonationField
                name="scholarship"
                description="Lodge Scholarship Fund"
                onChange={this.changeHandler}
              />
              <DonationField
                name="childrenshospital"
                description="Children's Hospital Donation"
                suggestedDonation={this.suggestedDonation.childrenshospital}
                onChange={this.changeHandler}
              />
              <DonationField
                name="xmasbaskets"
                description="Christmas Baskets"
                suggestedDonation={this.suggestedDonation.xmasbaskets}
                onChange={this.changeHandler}
              />
              <DonationField
                name="buildingfund"
                description="Building Fund"
                onChange={this.changeHandler}
              />
              <p>
                <TextField
                  multiline
                  name="comment"
                  variant="outlined"
                  helperText="Comments or Address Updates"
                  rows="4"
                />
              </p>
            </fieldset>
          </form>
          <h3>Total: $ {this.state.total}</h3>
          <PayPalExpressBtn
            description={JSON.stringify(this.state.formControls)}
            env="sandbox"
            onSuccess={this.onSuccess}
            onError={this.onError}
            onCancel={this.onCancel}
            client={client}
            currency={'USD'}
            total={this.state.total}
          />
          <h3>Payment status: {this.state.status}</h3>
        </Grid>
      </Grid>
    )
  }
}

export default DonationForm
