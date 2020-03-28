import React, { Component } from 'react'
import PayPalExpressBtn from 'react-paypal-express-checkout';
import DonationFieldItem from './DonationFieldItem'

type ButtonState = {
  total: number,
  donations: []
}

type ButtonProps = {
  membershipRate: number
}

class PaypalButton extends Component<ButtonProps, ButtonState> {

  static defaultProps = {
    membershipRate: 119
  }

  constructor(props: ButtonProps) {
    super(props);
    this.state = {
      total: 0,
      donations: [],
    }
  }
  
  render() {
    console.log(process.env.REACT_APP_PAYPAL_SANDBOX)
    const client = {
      sandbox: process.env.REACT_APP_PAYPAL_SANDBOX
    }
    return (
      <div>
        <form>
          <fieldset>
            <h5>Lodge Required Charities</h5>
            <DonationFieldItem code="elksnf" description="Elks National Foundation" />
            <DonationFieldItem code="tallelks" description="State Major Project Tall Elks Therapy Program"/>
            <h5>Lodge Charitable Items</h5>
            <DonationFieldItem code="scholarship" description="Lodge Scholarship Fund" />
            <DonationFieldItem code="childrens" description="Children's Hospital Donation" />
            <DonationFieldItem code="xmasbaskets" description="Christmas Baskets" suggestedAmount={5} />
            <DonationFieldItem code="buildingfund" description="Building Fund" />

          </fieldset>
        
        </form>
        <PayPalExpressBtn client={client} currency={'USD'} total={this.state.total} />
      </div>
    )
  }
}

export default PaypalButton