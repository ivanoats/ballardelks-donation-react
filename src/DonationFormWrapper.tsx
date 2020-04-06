import React, { Component } from 'react'
import { Formik } from 'formik'
import { DonationFormik } from './DonationFormik'
import Paper from '@material-ui/core/Paper'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Member's Full name is required"),
  membershipNumber: Yup.number().required('Membership number is required'),
  elksnf: Yup.number().label('Elks National Foundation').positive().integer(),
  tallelks: Yup.number()
    .label('State Major Project Tall Elks Therapy Program')
    .positive()
    .integer(),
  scholarship: Yup.number()
    .label('Lodge Scholarship Fund')
    .positive()
    .integer(),
  childrenshospital: Yup.number()
    .label("Children's Hospital Donation")
    .positive()
    .integer(),
  xmasbaskets: Yup.number().label('Christmas Baskets').positive().integer(),
  buildingfund: Yup.number().label('Building Fund').positive().integer(),
})

class DonationFormWrapper extends Component {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  showPayPal() {
    console.log('form submitted')
  }

  render() {
    return (
      <>
        <div>
          <Paper elevation={1}>
            <h4>Form</h4>
            <Formik
              onSubmit={this.showPayPal}
              initialValues={{}}
              render={(props) => <DonationFormik {...props} />}
            />
          </Paper>
        </div>
      </>
    )
  }
}
