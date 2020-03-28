import React, { Component } from 'react'

type DonationFieldItemProps = {
  code: string,
  suggestedAmount: number,
  description: string
}

type DonationFieldItemState =  {
  amount: number
}

class DonationFieldItem extends Component<DonationFieldItemProps, DonationFieldItemState> {

  static defaultProps = {
    suggestedAmount: 10
  }

  constructor(props: DonationFieldItemProps) {
    super(props)
    this.state = {
      amount: 10
    }
  }
  render() {
    return (
      <p>
        <input type="text" id={this.props.code} defaultValue={this.props.suggestedAmount} />
        <label htmlFor={this.props.code}>{this.props.description} <span className="small">${this.props.suggestedAmount} Suggested</span></label>
      </p>
    )
  }

}

export default DonationFieldItem