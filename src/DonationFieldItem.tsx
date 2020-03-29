import React, { Component } from 'react'

type DonationFieldItemProps = {
  name: string
  suggestedAmount?: number
  description?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

type DonationFieldItemState = {
  amount: number
}

class DonationFieldItem extends Component<
  DonationFieldItemProps,
  DonationFieldItemState
> {
  static defaultProps = {
    suggestedAmount: 10,
  }

  constructor(props: DonationFieldItemProps) {
    super(props)
    this.state = {
      amount: 10,
    }
  }
  render() {
    return (
      <>
        <label htmlFor={this.props.name}>
          {this.props.description}{' '}
          <span className="small">${this.props.suggestedAmount} Suggested</span>
        </label>
        <input
          type="text"
          id={this.props.name}
          name={this.props.name}
          defaultValue={this.props.suggestedAmount}
          onChange={this.props.onChange}
        />
      </>
    )
  }
}

export default DonationFieldItem
