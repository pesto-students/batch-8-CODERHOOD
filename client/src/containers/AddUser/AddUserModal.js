import React from 'react';
import AddUser from './AddUser';
import { Modal } from 'react-bulma-components';

const AddUserModal = (props) => {
  return (
    <Modal {...props}>
      <Modal.Card style={{ width: '30%' }}>
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
