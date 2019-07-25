import React from 'react';
import AddUser from './AddUser';
import { Modal } from 'react-bulma-components';
import './AddUserModal.css';

const AddUserModal = (props) => {
  return (
    <Modal {...props} className="modal">
      <Modal.Card className="modal__card">
        <Modal.Card.Head onClose={props.onClose}>
          <Modal.Card.Title>Invite User</Modal.Card.Title>
        </Modal.Card.Head>
        <Modal.Card.Body {...props.modal}>
          <AddUser onClose={props.onClose} {...props} />
        </Modal.Card.Body>
      </Modal.Card>
    </Modal>
  );
};

export default AddUserModal;
