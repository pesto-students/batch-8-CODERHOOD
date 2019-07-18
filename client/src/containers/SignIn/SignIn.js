import React from "react";
import { AuthForm } from "../../components";
import { handleSubmit } from "./utils";
import { schema, inputs } from "./Schema";
import { useAppContext } from "../App/AppContext";

const SignIn = props => {
  const { dispatch } = useAppContext();

  return (
    <div>
      <AuthForm
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
    </div>
  );
};

export default SignIn;
