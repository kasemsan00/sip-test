import { useSelector } from "react-redux";
import { Form, InputGroup, Input, Radio } from "react-daisyui";
import DialerSipIcon from "@mui/icons-material/DialerSip";
import ViewLocal from "./ViewLocal";
import SettingModal from "./Setting/SettingModel";
import ChangeProfile from "./ChangeProfile";
import RegisterStatus from "./RegisterStatus";
import { useEffect, useState } from "react";

const SelectCodec = ({ codecSupport }) => {
  const handleCodecChange = (event) => {
    const codecs = codecSupport;
    const selectedCodec = codecs[event.target.value];
    console.log(selectedCodec);
    codecs.splice(event.target.value, 1);
    codecs.unshift(selectedCodec);
    localStorage.setItem("codec", JSON.stringify(codecs));
  };

  return (
    <div className="flex flex-1 w-full justify-center">
      <select className="mt-2 select select-bordered select-sm w-full mb-2" onChange={(event) => handleCodecChange(event)}>
        {codecSupport.map((codec, index) => {
          return (
            <option key={index} value={index}>
              {codec.mimeType + " " + (codec.sdpFmtpLine || "").trim()}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default function SipInput({
  handleRegister,
  handleUnRegister,
  handleCall,
  handleHangUp,
  handleRenegotiate,
  isVideoMuted,
  isMicrophoneMuted,
  handleMuteVideo,
  handleMutedMicrophone,
  destination,
  setDestination,
  setCodec,
  sendMessage,
}) {
  const status = useSelector((state) => state.registerStatus);
  const [codecSupport, setCodecSupport] = useState([]);
  const [isRegister, setIsRegister] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const supportsSetCodecPreferences = window.RTCRtpTransceiver && "setCodecPreferences" in window.RTCRtpTransceiver.prototype;
    console.log("supportsSetCodecPreferences", supportsSetCodecPreferences);
    // console.log(RTCRtpSender.getCapabilities("video"));
    // const { codecs } = RTCRtpSender.getCapabilities("video");
    // console.log(codecs);
    // if (supportsSetCodecPreferences) {
    //     const codecStack = [];
    //     const { codecs } = RTCRtpSender.getCapabilities("video");
    //     console.log(codecs);
    //     console.table(codecs);
    //     codecs.forEach((codec) => {
    //         if (["video/red", "video/ulpfec", "video/rtx"].includes(codec.mimeType)) {
    //             return;
    //         }
    //         codecStack.push(codec);
    //     });
    //     setCodecSupport(codecStack);
    // }
  }, [setCodecSupport]);

  useEffect(() => {
    if (status === "registered") {
      setIsRegister(true);
    } else if (status === "disconnected") {
      setIsRegister(false);
    }
  }, [status]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage(text);
      setText("");
    }
  };

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
            placeholder="Call Number"
            className="input input-bordered input-info w-full text-center"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            bordered
          />
        </InputGroup>
      </Form>
      <button className="btn btn-success w-full m-1" onClick={handleCall}>
        Call
      </button>
      <button className="btn btn-warning w-full m-1" onClick={handleHangUp}>
        HangUp
      </button>
      <button className="btn btn-info w-full m-1" onClick={handleRenegotiate}>
        Renegotiate
      </button>
      {/* <SelectCodec codecSupport={codecSupport} /> */}
      <input
        className="input input-bordered w-full m-1 outline-0"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
