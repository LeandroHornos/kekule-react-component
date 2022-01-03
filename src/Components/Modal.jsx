import React from "react";
import "./modal.css";

export const Modal = ({ allowClosing, handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
          {allowClosing && (
            <button
              className="btn btn-sm btn-outline-danger"
              type="button"
              onClick={handleClose}
            >
              Cerrar
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

Modal.defaultProps = {
  allowClosing: true,
  handleClose: () => {},
  show: false,
};

export default Modal;
