import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setLocalStream } from "../redux/slices/mediaStreamSlice";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import adapter from "webrtc-adapter";

export default function ViewLocal({ isVideoMuted, isMicrophoneMuted, handleMuteVideo, handleMutedMicrophone }) {
  const dispatch = useDispatch();
  const localVideoRef = useRef(null);
  const controlLocalRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      dispatch(setLocalStream(stream));
      localVideoRef.current.srcObject = stream;
    });
  }, [dispatch]);

  return (
    <div
      className="flex flex-1 items-center justify-center pt-2"
      onMouseOver={() => {
        controlLocalRef.current.classList.replace("hidden", "flex");
      }}
      onMouseLeave={() => {
        controlLocalRef.current.classList.replace("flex", "hidden");
      }}
    >
      <div className="fixed hidden flex-row rounded-xl cursor-pointer bg-slate-200 z-50" ref={controlLocalRef}>
        <div className="rounded-xl cursor-pointer m-2 bg-slate-200 z-50 " onClick={() => handleMuteVideo(!isVideoMuted)}>
          {!isVideoMuted ? <VideocamIcon fontSize="large" /> : <VideocamOffIcon fontSize="large" color="error" />}
        </div>
        <div className="rounded-xl cursor-pointer m-2 bg-slate-200 z-50" onClick={() => handleMutedMicrophone(!isMicrophoneMuted)}>
          {!isMicrophoneMuted ? <MicIcon fontSize="large" /> : <MicOffIcon fontSize="large" color="error" />}
        </div>
      </div>
      <video className="w-full h-[200px] rounded-xl bg-slate-800" autoPlay playsInline ref={localVideoRef} muted></video>
    </div>
  );
}
