import { useState } from "react";
import { Button, Modal, Tabs, Tab } from "react-daisyui";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import SipAccounts from "./SipAccount";
import Proxy from "./Proxy";
import PcConfig from "./PcConfig";

export default function Setting() {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className="w-full mx-1 flex">
      <div className="cursor-pointer flex flex-1" onClick={toggleVisible}>
        <SettingsTwoToneIcon color="primary" />
      </div>
      <Modal open={visible}>
        <Button size="sm" shape="circle" className="absolute right-2 top-2" onClick={toggleVisible}>
          ✕
        </Button>
        <Modal.Body>
          <div className="tabs">
            <a className={`tab tab-bordered ${activeTab === 0 ? `tab-active` : null}`} onClick={() => setActiveTab(0)}>
              Sip Accounts
            </a>
            <a className={`tab tab-bordered ${activeTab === 1 ? `tab-active` : null}`} onClick={() => setActiveTab(1)}>
              PC Config
            </a>
          </div>
          {activeTab === 0 ? <SipAccounts visible={visible} /> : null}
          {activeTab === 1 ? (
            <>
              <Proxy />
              <PcConfig />
            </>
          ) : null}
        </Modal.Body>
      </Modal>
    </div>
  );
}
