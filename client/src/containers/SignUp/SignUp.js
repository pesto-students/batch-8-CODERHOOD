import React from 'react'
import { AuthForm } from '../../components'
import { handleSubmit } from './utils';
import { schema, inputs} from './Schema';

const SignUp = (props) => {
    return (
        <div>
          <AuthForm
            {...props} 
            handleSubmit={handleSubmit}
            schema={schema}
            inputs={inputs}
            submitLabel="SignUp"
            footerLabel="Already a registered user?"
            linkTo="/signin"
            linkToLabel="SignIn"
          />
        </div>
    )
}

export default SignUp;
