import React from 'react';
import AddChannel from './AddChannel'
import { Modal } from 'react-bulma-components';


const AddChannelModal = (props) => {
    console.log(props.members)
    return (<Modal {...props}>
        <Modal.Card>
            <Modal.Card.Head onClose={props.onClose}>
                <Modal.Card.Title>Add Channel</Modal.Card.Title>
            </Modal.Card.Head>
            <Modal.Card.Body {...props.modal}>
                <AddChannel members={props.members} workspaceId={props.workspaceId} onClose={props.onClose} />
            </Modal.Card.Body>
        </Modal.Card>
    </Modal>)
}

export default AddChannelModal;

