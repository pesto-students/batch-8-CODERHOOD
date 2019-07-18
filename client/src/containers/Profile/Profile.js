import React from 'react';
import Form from '../../components/Form/Form'
import { useAppContext } from '../../containers/App/AppContext'
import { schema, inputs } from "./Schema";
import { handleSubmit } from "./utils";


const Profile = (props) => {

    const { loginStatus, dispatch } = useAppContext();

    console.log(loginStatus);

    return (
        <div>
            <Form
                {...props}
                handleSubmit={handleSubmit}
                schema={schema}
                inputs={inputs}
                dispatch={dispatch}
                submitLabel="Save Changes"
                initialData={loginStatus.user}
                alwaysEnableButton={true}
            />
        </div>
    )
}

export default Profile;