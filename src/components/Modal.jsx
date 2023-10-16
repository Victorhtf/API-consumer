/* eslint-disable react/prop-types */
import { AiOutlineCloseCircle } from "react-icons/ai";
import styled from "styled-components";
// import React, { Children } from "react";
import "../Globals.css";

const ModalFade = styled.div`
  background-color: rgb(0, 0, 0, 0.7);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 1s;

  .modal-card {
    width: 500px;
    height: auto;
    border-radius: 7px;
    background-color: white;
    padding: 2rem;
  }

  .top-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  .close-icon {
    font-size: 25px;
    cursor: pointer;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  .btn-submit-form {
    background-color: var(--btn-bg-color);
    border: none;
    padding: 7px 14px 7px 14px;
    border-radius: var(--btn-border-radius);
    font-size: var(--btn-font-size);
    color: var(--primary-text-color);
    cursor: pointer;
  }

  .btn-reset-form {
    background-color: var(--btn-2bg-color);
    border: var(--btn-border-color);
    padding: 7px 14px 7px 14px;
    border-radius: var(--btn-border-radius);
    font-size: var(--btn-font-size);
    color: var(--secondary-text-color);
    font-size: var(--btn-font-size);
    cursor: pointer;
  }
`;

function Modal(props) {
  const { title, open, children, setOpen } = props;
  if (!open) return null;
  return (
    <ModalFade>
      <div className="modal-card">
        <div className="top-label">
          <h2>{title}</h2>
          <AiOutlineCloseCircle
            style={{ color: "#171717" }}
            className="close-icon"
            onClick={() => {
              setOpen(false);
            }}
          />
        </div>
        <div className="form-box">{children}</div>
        {/* <div className="buttons">
          <button className="btn-reset-form">Limpar</button>
          <button className="btn-submit-form">Submit</button>
        </div> */}
      </div>
    </ModalFade>
  );
}

export default Modal;
