import React from "react";
import { Form } from "../../components";
import { handleSubmit } from "./utils";
import { schema, inputs } from "./Schema";
import { useAppContext } from "../App/AppContext";
import SmallContainer from "../../components/SmallContainer/SmallContainer";

const SignIn = props => {
  const { dispatch } = useAppContext();

  return (
    <div>
      <SmallContainer>
        <Form
          {...props}
          handleSubmit={handleSubmit}
          schema={schema}
          inputs={inputs}
          dispatch={dispatch}
          submitLabel="SignIn"
          footerLabel="Not a registered User?"
          linkTo="/signup"
          linkToLabel="SignUp"
        />
      </SmallContainer>
    </div>
  );
};

export default SignIn;
