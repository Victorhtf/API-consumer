import styled from "styled-components";

export const ModalFade = styled.div`
  background-color: rgb(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
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
    border-radius: 8.75px;
    background-color: white;
    padding: 2.5rem;
  }

  .top-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 37.5px;
  }

  .close-icon {
    font-size: 31.25px;
    cursor: pointer;
  }

  .content {
  }

  .form {
    gap: 1.25rem;
    display: flex;
    flex-direction: column;
  }

  .form-group {
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: 1.25rem;
  }

  label {
    font-weight: 300px;
    font-size: 15px;
  }

  .input {
    width: 100%;
    border-radius: var(--btn-border-radius);
    height: 30px;
    padding: 10px;
    border: var(--input-border-color);
  }

  .buttons {
    display: flex;
    gap: 1.25rem;
    justify-content: flex-end;
    margin-top: 25px;
  }

  .btn-submit-form {
    background-color: var(--btn-bg-color);
    border: none;
    padding: 8.75px 17.5px 8.75px 17.5px;
    border-radius: var(--btn-border-radius);
    font-size: var(--btn-font-size);
    color: var(--primary-text-color);
    cursor: pointer;
  }
`;
