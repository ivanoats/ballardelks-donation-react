import React, { Component } from "react";
import PayPalExpressBtn from "react-paypal-express-checkout";
import DonationFieldItem from "./DonationFieldItem";

type DonationFormState = {
  total: number;
  formControls: any | null;
};

type DonationFormProps = {
  membershipRate: number;
};

class DonationForm extends Component<DonationFormProps, DonationFormState> {
  static defaultProps = {
    membershipRate: 119,
  };

  constructor(props: DonationFormProps) {
    super(props);
    this.state = {
      formControls: {},
      total: 0,
    };
  }

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let target = event.target as HTMLInputElement;
    const name = target.name;
    const amount = target.value;

    this.setState({
      formControls: {
        [name]: amount,
      },
    });
  };

  render() {
    const client = {
      sandbox: process.env.REACT_APP_PAYPAL_SANDBOX,
    };
    return (
      <div>
        <form>
          <fieldset>
            <h5>Lodge Required Charities</h5>
            <DonationFieldItem
              name="elksnf"
              description="Elks National Foundation"
              onChange={this.changeHandler}
              suggestedAmount={this.state.formControls.name}
            />
            <DonationFieldItem
              name="tallelks"
              description="State Major Project Tall Elks Therapy Program"
            />
            <h5>Lodge Charitable Items</h5>
            <DonationFieldItem
              name="scholarship"
              description="Lodge Scholarship Fund"
            />
            <DonationFieldItem
              name="childrens"
              description="Children's Hospital Donation"
            />
            <DonationFieldItem
              name="xmasbaskets"
              description="Christmas Baskets"
              suggestedAmount={5}
            />
            <DonationFieldItem
              name="buildingfund"
              description="Building Fund"
            />
          </fieldset>
        </form>
        <p>Total: {this.state.total}</p>
        <PayPalExpressBtn
          client={client}
          currency={"USD"}
          total={this.state.total}
        />
      </div>
    );
  }
}

export default DonationForm;
