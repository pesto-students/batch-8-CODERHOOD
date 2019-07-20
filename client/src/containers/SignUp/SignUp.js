import React from 'react'
import { Form } from '../../components'
import { handleSubmit } from './utils';
import { schema, inputs } from './Schema';
import SmallContainer from "../../components/SmallContainer/SmallContainer";

const SignUp = (props) => {
  return (
    <div>
      <SmallContainer>
        <Form
          {...props}
          handleSubmit={handleSubmit}
          schema={schema}
          inputs={inputs}
          submitLabel="SignUp"
          footerLabel="Already a registered user?"
          linkTo="/signin"
          linkToLabel="SignIn"
        />
      </SmallContainer>
    </div>
  )
}

export default SignUp;
