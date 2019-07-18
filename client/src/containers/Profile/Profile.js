import React from 'react';
import Form from '../../components/Form/Form'
import { useAppContext } from '../../containers/App/AppContext'
import { schema, inputs } from "./Schema";
import { handleSubmit } from "./utils";
import { Modal } from 'react-bulma-components';



const Profile = (props) => {

    const { loginStatus, dispatch } = useAppContext();

    return (
        <Modal {...props}>
            <Modal.Card>
                <Modal.Card.Head onClose={props.onClose}>
                    <Modal.Card.Title>Edit Profile</Modal.Card.Title>
                </Modal.Card.Head>
                <Modal.Card.Body {...props.modal}>
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
                </Modal.Card.Body>
            </Modal.Card>
        </Modal>

    )
}

export default Profile;