import { useEffect, useRef } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

export default function ViewVideo({
    isVideoMuted,
    isMicrophoneMuted,
    handleMuteVideo,
    handleMutedMicrophone,
    callOutRef,
    localVideoRef,
    remoteVideoRef,
}) {
    const controlRef = useRef(null);

    return (
        <div className="flex flex-col w-full max-w-full h-[calc(100%-30px)]">
            <div className="fixed top-[40%] left-1/2 justify-center items-center text-6xl" ref={callOutRef}></div>
            <div className="flex flex-1 h-1/2 w-full self-center items-center justify-center pb-2">
                <div
                    className="flex h-full items-center justify-center rounded-2xl animate__animated animate__zoomIn"
                    onMouseOver={() => {
                        controlRef.current.classList.replace("hidden", "flex");
                    }}
                    onMouseLeave={() => {
                        controlRef.current.classList.replace("flex", "hidden");
                    }}
                >
                    <div className="fixed hidden flex-row rounded-xl cursor-pointer bg-slate-200 z-50" ref={controlRef}>
                        <div className="rounded-xl cursor-pointer m-2 bg-slate-200 z-50 " onClick={() => handleMuteVideo(!isVideoMuted)}>
                            {!isVideoMuted ? <VideocamIcon fontSize="large" /> : <VideocamOffIcon fontSize="large" />}
                        </div>
                        <div className="rounded-xl cursor-pointer m-2 bg-slate-200 z-50" onClick={() => handleMutedMicrophone(!isMicrophoneMuted)}>
                            {!isMicrophoneMuted ? <MicIcon fontSize="large" /> : <MicOffIcon fontSize="large" />}
                        </div>
                    </div>

                    <video autoPlay playsInline ref={localVideoRef} className="w-full h-full rounded-2xl hidden" muted></video>
                </div>
            </div>
            <div className="flex flex-1 h-1/2 w-full self-center items-center justify-center pt-2">
                <div className="flex h-full items-center justify-center rounded-2xl animate__animated animate__zoomIn ">
                    <video autoPlay playsInline ref={remoteVideoRef} className="w-full h-full rounded-2xl hidden"></video>
                </div>
            </div>
        </div>
    );
}
