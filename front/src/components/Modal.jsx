import { Button, Modal } from "flowbite-react";
import PropTypes from "prop-types";

const ModalComponent = ({ modalProps, children }) => {
  const {
    isOpen,
    size,
    text,
    showButtons,
    onClose,
    onConfirm,
    onCancel,
    showCloseButton,
  } = modalProps;

  return (
    <Modal
      dismissible={showCloseButton}
      show={isOpen}
      size={size}
      onClose={onClose}
    >
      {showCloseButton && <Modal.Header></Modal.Header>}
      <Modal.Body>{children || text}</Modal.Body>
      {showButtons && (
        <Modal.Footer>
          {onConfirm && <Button onClick={onConfirm}>Confirm</Button>}
          {onCancel && <Button onClick={onCancel}>Cancel</Button>}
        </Modal.Footer>
      )}
    </Modal>
  );
};

ModalComponent.propTypes = {
  modalProps: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    size: PropTypes.string,
    text: PropTypes.node,
    showButtons: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    showCloseButton: PropTypes.bool, // Add the prop for showing/hiding close button
  }).isRequired,
  children: PropTypes.node,
};

export default ModalComponent;
