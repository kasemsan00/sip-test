import { useState } from "react";
import { Button, Modal, Tabs, Tab } from "react-daisyui";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";

export default function Setting() {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible);
    };

    return (
        <div className="font-sans">
            <div className="cursor-pointer" onClick={toggleVisible}>
                <SettingsTwoToneIcon color="primary" />
            </div>
            <Modal open={visible}>
                <Button size="sm" shape="circle" className="absolute right-2 top-2" onClick={toggleVisible}>
                    ✕
                </Button>
                <Modal.Header className="font-bold">Settings</Modal.Header>

                <Modal.Body>
                    <div className="tabs">
                        <a className="tab tab-bordered">Display Name</a>
                        <a className="tab tab-bordered">Sip Accounts</a>
                        <a className="tab tab-bordered tab-active">Device</a>
                    </div>
                </Modal.Body>
                <Modal.Actions>
                    <Button color="ghost" onClick={toggleVisible}>
                        Cancel
                    </Button>
                    <Button color="success" onClick={toggleVisible}>
                        Save
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}
