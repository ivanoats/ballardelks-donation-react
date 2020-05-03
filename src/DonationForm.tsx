import React, { Component } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
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
  payPalButtonVisible: boolean
  formControls: ValueObject
  memberName: string
  memberNumber: string
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
    return R.sum(R.values(sd))
  }

  private mapToValueObject = function (original: StrNumber): ValueObject {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return R.map((val, _) => {
      return { value: val }
    }, original)
  }

  state: DonationFormState = {
    formControls: this.mapToValueObject(this.suggestedDonation),
    status:
      'Waiting for form to be filled with required fields, and then the paypal button pressed',
    payPalButtonVisible: false,
    memberName: '',
    memberNumber: '',
    total:
      this.totalSuggestedDonation(this.suggestedDonation) + this.props.dues,
  }

  requireMemberNameAndNumber = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    let target = event.target as HTMLInputElement
    const newField = { [target.name]: target.value }
    let payPalButtonShouldBeVisible = false
    if (
      target.value.length > 2 &&
      (this.state.memberName.length > 2 || this.state.memberNumber.length > 2)
    )
      payPalButtonShouldBeVisible = true
    this.setState({
      ...newField,
      payPalButtonVisible: payPalButtonShouldBeVisible,
    })
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
    console.log(JSON.stringify(this.state))
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
      production: process.env.REACT_APP_PAYPAL_PRODUCTION,
    }
    let payPalButtonIfVisible
    if (this.state.payPalButtonVisible) {
      const description = JSON.stringify(this.state.formControls)
      console.log(description)
      payPalButtonIfVisible = (
        <PayPalButton
          options={{
            clientId: client.sandbox,
            // description: description
          }}
          onSuccess={this.onSuccess}
          catchError={this.onError}
          onCancel={this.onCancel}
          client={client}
          currency={'USD'}
          amount={this.state.total}
        />
      )
    } else {
      payPalButtonIfVisible = (
        <p>
          Payment Button will appear after all required fields are filled in
        </p>
      )
    }
    return (
      <Grid container spacing={4}>
        <Grid item>
          <form>
            <fieldset style={{ border: 0 }}>
              <p>
                <TextField
                  name="memberName"
                  label="Member Name"
                  helperText="Required: Member's full name"
                  onChange={this.requireMemberNameAndNumber}
                  required
                  style={{ padding: 25 }}
                />
              </p>
              <p>
                <TextField
                  name="memberNumber"
                  style={{ padding: 25 }}
                  label="Membership Number"
                  required
                  onChange={this.requireMemberNameAndNumber}
                  helperText="Required: Membership number"
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
          <h3>Total: $ {this.state.total}</h3>
          {payPalButtonIfVisible}
          <h3>Payment status: {this.state.status}</h3>
        </Grid>
      </Grid>
    )
  }
}

export default DonationForm
