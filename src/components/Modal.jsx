/* eslint-disable react/prop-types */
import { AiFillCloseCircle } from "react-icons/ai";
import styled from "styled-components";
import React, { Children } from "react";

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
    height: 600px;
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
    font-size: 23px;
    cursor: pointer;
    color: #247cfc;
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
          <AiFillCloseCircle
            className="close-icon"
            onClick={() => {
              setOpen(false);
            }}
          />
        </div>
        <div className="form-box">{children}</div>
      </div>
    </ModalFade>
  );
}

export default Modal;
