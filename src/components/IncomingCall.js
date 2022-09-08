import { Modal, Button } from "react-daisyui";
export default function IncomingCall({ isIncoming, handleAcceptCall, handleDeclineCall }) {
    return (
        <Modal open={isIncoming}>
            <Modal.Header className="font-bold">Incoming Call</Modal.Header>

            {/* <Modal.Body>You've been selected for a chance to get one year of subscription to use Wikipedia for free!</Modal.Body> */}

            <Modal.Actions>
                <Button onClick={handleDeclineCall} color="error">
                    Decline
                </Button>
                <Button onClick={handleAcceptCall} color="success">
                    Accept
                </Button>
            </Modal.Actions>
        </Modal>
    );
}
