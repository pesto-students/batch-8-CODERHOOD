import React from 'react';
import AddChannel from './AddChannel';
import { Modal } from 'react-bulma-components';
import './AddChannelModal.css'

const AddChannelModal = (props) => {
  return (
    <Modal {...props} className="modal">
      <Modal.Card 
        className="modal__card"
      >
        <Modal.Card.Head onClose={props.onClose}>
          <Modal.Card.Title>Add Channel</Modal.Card.Title>
        </Modal.Card.Head>
        <Modal.Card.Body {...props.modal}>
          <AddChannel
            members={props.members}
            workspaceId={props.workspaceId}
            onClose={props.onClose}
          />
        </Modal.Card.Body>
      </Modal.Card>
    </Modal>
  );
};

export default AddChannelModal;
