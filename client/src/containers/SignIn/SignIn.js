import React from 'react'
import { AuthForm } from '../../components'
import { handleSubmit } from './utils';
import { schema, inputs} from './Schema';

const SignIn = (props) => {
    return (
        <div>
          <AuthForm
            {...props} 
            handleSubmit={handleSubmit}
            schema={schema}
            inputs={inputs}
            submitLabel="SignIn"
            footerLabel="Not a registered User?"
            linkTo="/signup"
            linkToLabel="SignUp"
          />
        </div>
    )
}

export default SignIn;
