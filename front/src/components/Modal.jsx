import React from "react";
import { Button, Modal } from "flowbite-react";
import PropTypes from "prop-types";
const ModalComponent = ({ modalProps, children }) => {
  const { isOpen, size, text, showButtons, onClose, onConfirm, onCancel } =
    modalProps;

  return (
    <Modal show={isOpen} size={size} onClose={onClose}>
      <Modal.Body>{children}</Modal.Body>
      {showButtons && (
        <Modal.Footer>
          <Button onClick={onConfirm}>Confirm</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

ModalComponent.PropTypes = {
  modalProps: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    size: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    showButtons: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }),
  children: PropTypes.node.isRequired,
};

export default ModalComponent;
