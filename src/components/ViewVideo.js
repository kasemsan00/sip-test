import { useEffect, useRef } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import CallEndIcon from "@mui/icons-material/CallEnd";

export default function ViewVideo({
    isVideoMuted,
    isMicrophoneMuted,
    handleMuteVideo,
    handleMutedMicrophone,
    callOutRef,
    localVideoRef,
    remoteVideoRef,
}) {
    const controlLocalRef = useRef(null);
    const controlRemoteRef = useRef(null);

    return (
        <div className="flex flex-col w-full max-w-full h-[calc(100%-24px)] pt-2">
            <div
                className="hidden top-[40%] left-1/2 justify-center items-center text-6xl bg-gray-800 text-white p-3 rounded-xl shadow-md"
                ref={callOutRef}
            ></div>
            <div className="flex flex-1 h-1/2 w-full self-center items-center justify-center pb-2">
                <div
                    className="flex h-full items-center justify-center rounded-2xl animate__animated animate__zoomIn"
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
                    <video autoPlay playsInline ref={localVideoRef} className="w-full h-full rounded-2xl hidden" muted></video>
                </div>
            </div>
            <div className="flex flex-1 h-1/2 w-full self-center items-center justify-center pt-2">
                <div
                    className="flex h-full items-center justify-center rounded-2xl animate__animated animate__zoomIn"
                    onMouseOver={() => {
                        controlRemoteRef.current.classList.replace("hidden", "flex");
                    }}
                    onMouseLeave={() => {
                        controlRemoteRef.current.classList.replace("flex", "hidden");
                    }}
                >
                    <div className="fixed hidden flex-row rounded-xl cursor-pointer bg-slate-200 z-50" ref={controlRemoteRef}>
                        <div className="rounded-xl cursor-pointer m-2 bg-slate-200 z-50">
                            <CallEndIcon fontSize="large" color="error" />
                        </div>
                    </div>
                    <video autoPlay playsInline ref={remoteVideoRef} className="w-full h-full rounded-2xl hidden"></video>
                </div>
            </div>
        </div>
    );
}
