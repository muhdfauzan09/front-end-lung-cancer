import { useState } from "react";
import Modal from "react-bootstrap/Modal";

const ModalComponent2 = ({ showModal, message, cancel, route }) => {
  return (
    <>
      <Modal show={showModal}>
        <Modal.Body>
          <p className="font-semibold text-xl">{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <div
            className="px-14 py-3 bg-blue-700 hover:bg-blue-600 text-white hover:text-white font-bold rounded-md"
            onClick={() => route()}
          >
            Yes
          </div>
          <div
            className="px-14 py-3 bg-red-400 hover:bg-red-300 text-white hover:text-white font-bold rounded-md"
            onClick={() => cancel()}
          >
            No
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent2;
