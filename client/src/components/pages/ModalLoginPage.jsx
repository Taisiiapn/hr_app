import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';

const ModalLoginPage = () => {

    const [lgShow, setLgShow] = useState(true);

    return (
        
        <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
                Login instruction
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Log in to the system using your private login/password.
                <br />
                If you are not signed in yet, kindly ask your manager to create an account for you.
                If you are testing the system, please use the data below.
                <br /><br /><br />
                login: admin@admin.admin
                <br />
                password: test
            </Modal.Body>
        </Modal>
    
    )
}

export default ModalLoginPage