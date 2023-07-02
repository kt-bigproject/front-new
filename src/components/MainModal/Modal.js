import React from 'react';
import styles from './modal.module.css'
import { Modal, Box } from '@mui/material';

    
export default function Modal({open, onClose}) {

    const boxStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 850,
        hegith: 750,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 1,
      };

      return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                

        </Modal>
      )

};