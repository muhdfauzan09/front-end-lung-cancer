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
            className="px-14 py-3 font-bold text-white rounded-lg"
            style={{ backgroundColor: "#034CA1", cursor: "pointer" }}
            onClick={() => route()}
          >
            Yes
          </div>
          <div
            className="px-14 py-3 font-bold text-white rounded-lg"
            style={{ backgroundColor: "red", cursor: "pointer" }}
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
