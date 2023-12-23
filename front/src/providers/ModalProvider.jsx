import React, { createContext, useState, useCallback } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
} from "flowbite-react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalProps, setModalProps] = useState({
    isOpen: false,
    size: "m",
    text: "",
    showButtons: true,
    onClose: () => {},
    onConfirm: () => {},
    onCancel: () => {},
  });

  const openModal = useCallback(
    ({
      size = "m",
      text = "",
      showButtons = true,
      onClose,
      onConfirm,
      onCancel,
    }) => {
      setModalProps({
        isOpen: true,
        size,
        text,
        showButtons,
        onClose,
        onConfirm,
        onCancel,
      });
    },
    [],
  );

  const closeModal = useCallback(() => {
    setModalProps((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalProps.isOpen && (
        <Modal isOpen={modalProps.isOpen} onClose={modalProps.onClose}>
          <ModalHeader>
            <span
              style={{ float: "right", cursor: "pointer" }}
              onClick={closeModal}
            >
              &#10006;
            </span>
          </ModalHeader>
          <ModalBody>
            <div className={`modal-size-${modalProps.size}`}>
              <p>{modalProps.text}</p>
            </div>
          </ModalBody>
          {modalProps.showButtons && (
            <ModalFooter>
              <Button onClick={modalProps.onCancel}>Annuler</Button>
              <Button onClick={modalProps.onConfirm}>Valider</Button>
            </ModalFooter>
          )}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};
