import React, {useState} from 'react';
import { Modal } from 'react-bootstrap';
import {FastOrderForm} from '@/components/common/fast-order-modal/fast-order-form';


const FastOrderModal = ({
  getInitComponents = show => null,
  item,
  onSuccess = () => null
}) => {
  const [visible, setVisible] = useState(false);

  const close = () => setVisible(false);
  const show = () => setVisible(true);

  return <>
    { getInitComponents(show) }

    <Modal show={visible} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Оформление заказа</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FastOrderForm item={ item } onSuccess={ onSuccess } />
      </Modal.Body>
    </Modal>
  </>;
};

export default FastOrderModal;
