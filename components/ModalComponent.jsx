import { useState } from "react";
import Modal from "react-bootstrap/Modal";

const ModalComponent = ({ showModal, message, route }) => {
  return (
    <>
      <Modal show={showModal}>
        <Modal.Body>
          <p className="font-semibold text-xl">{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <div
            className="py-2 px-5 bg-blue-800 hover:bg-blue-600 text-white font-bold rounded-lg cursor-pointer"
            onClick={() => route()}
          >
            OK
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
