import { Button, Modal as ModalComponent } from 'antd';
import { useState } from 'react';
import ModalContent from './ModalContent';



















const Modal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(ModalContent);


  const handleOk = () => {
    setConfirmLoading(true);
    setModalText('Usuário adicionado com sucesso.')
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Adicionar usuário
      </Button>
      <ModalComponent
        title="Adicionar usuário"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={ () => {setOpen(false)}}
      >
        <p>{modalText}</p>
        {modalText !== ModalContent && (
          <Button type="primary" onClick={() => setModalText(ModalContent)}>Novo</Button>)}
      </ModalComponent>
    </>
  );
};

export default Modal;