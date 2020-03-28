import React, { Component } from 'react'
import PayPalExpressBtn from 'react-paypal-express-checkout'

type DonationFormState = {
  total: number
  formControls: any | null
}

type DonationFormProps = {
  membershipRate: number
}

class DonationForm extends Component<DonationFormProps, DonationFormState> {
  static defaultProps = {
    membershipRate: 119,
  }

  constructor(props: DonationFormProps) {
    super(props)
    this.state = {
      formControls: {
        elksnf: { value: 10 },
        tallelks: { value: 10 },
      },
      total: 0,
    }
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

    console.log(newState)

    const totals = Object.values(newState.formControls).map((v: any) => v.value)
    console.log(totals)
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
      <div>
        <form>
          <fieldset>
            <h5>Lodge Required Charities</h5>
            <label htmlFor="elksnf">Elks National Foundation</label>
            <input
              name="elksnf"
              onChange={this.changeHandler}
              defaultValue={this.state.formControls.elksnf.value}
            />
            <label htmlFor="tallelks">
              State Major Project Tall Elks Therapy Program
            </label>
            <input
              name="tallelks"
              onChange={this.changeHandler}
              defaultValue={this.state.formControls.tallelks.value}
            />
          </fieldset>
        </form>
        <p>Total: {this.state.total}</p>
        <PayPalExpressBtn
          client={client}
          currency={'USD'}
          total={this.state.total}
        />
      </div>
    )
  }
}

export default DonationForm
