import { useSelector } from "react-redux";
import { Form, InputGroup, Input, Radio } from "react-daisyui";
import DialerSipIcon from "@mui/icons-material/DialerSip";
import ViewLocal from "./ViewLocal";
import SettingModal from "./Setting/SettingModal";
import ChangeProfile from "./ChangeProfile";
import RegisterStatus from "./RegisterStatus";
import { useEffect, useState } from "react";

const SelectCodec = () => {
  const handleCodecChange = (value) => {
    localStorage.setItem("codec", value);
  };

  return (
    <div className="flex flex-1 w-full justify-center">
      <div className="form-control">
        <label className="label cursor-pointer">
          <input type="radio" name="radio-6" className="radio checked:bg-red-500" defaultChecked onClick={() => handleCodecChange("h264")} />
          <span className="ml-2 label-text">H264</span>
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <input type="radio" name="radio-6" className="radio checked:bg-blue-500" onClick={() => handleCodecChange("vp8")} />
          <span className="ml-2 label-text">VP8</span>
        </label>
      </div>
    </div>
  );
};

export default function SipInput({
  handleRegister,
  handleUnRegister,
  handleCall,
  handleHangUp,
  isVideoMuted,
  isMicrophoneMuted,
  handleMuteVideo,
  handleMutedMicrophone,
  destination,
  setDestination,
  setCodec,
}) {
  const status = useSelector((state) => state.registerStatus);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    if (status === "registered") {
      setIsRegister(true);
    } else if (status === "disconnected") {
      setIsRegister(false);
    }
  }, [status]);

  return (
    <div className="flex w-[250px] px-3 h-full flex-col items-center self-start ">
      <div className="form-control w-full mb-2">
        <ViewLocal
          isVideoMuted={isVideoMuted}
          isMicrophoneMuted={isMicrophoneMuted}
          handleMuteVideo={handleMuteVideo}
          handleMutedMicrophone={handleMutedMicrophone}
        />
      </div>
      <div className="form-control w-full flex flex-row">
        <ChangeProfile />
        <SettingModal />
      </div>
      <div className="form-control w-full flex my-2">
        {!isRegister ? (
          <button className="btn btn-info w-full btn-sm" disabled={isRegister} onClick={handleRegister}>
            Register
          </button>
        ) : (
          <button
            className={`btn btn-error w-full btn-sm ${status === "unregistered" ? "loading btn-disabled" : ""}`}
            disabled={!isRegister}
            onClick={handleUnRegister}
          >
            Unregister
          </button>
        )}
      </div>

      <div className="flex w-full">
        <RegisterStatus />
      </div>
      <Form className="w-full mb-2">
        <InputGroup className="w-full">
          <span>
            <DialerSipIcon />
          </span>
          <Input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-info w-full text-center"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            bordered
          />
        </InputGroup>
      </Form>
      <button className="btn btn-success w-full m-2" onClick={handleCall}>
        Call
      </button>
      <button className="btn btn-warning w-full m-2" onClick={handleHangUp}>
        HangUp
      </button>
      {/* <SelectCodec /> */}
    </div>
  );
}
