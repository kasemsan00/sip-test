import { useEffect, useRef } from "react";

import CallEndIcon from "@mui/icons-material/CallEnd";

export default function ViewVideo({ callOutRef, incomingCall, remoteVideoRef }) {
    const controlRemoteRef = useRef(null);

    useEffect(() => {
        console.log(remoteVideoRef);
    }, [remoteVideoRef]);

    return (
        <div className="flex flex-col w-full max-w-full pt-3 pb-4 bg-slate-500 items-center">
            <div
                className="hidden top-[40%] justify-center items-center text-6xl bg-gray-800 text-white p-3 rounded-xl shadow-md"
                ref={callOutRef}
            ></div>
            {incomingCall.map((item, index) => {
                return (
                    <div key={index}>
                        <div className="flex flex-1 h-full w-full self-center items-center justify-center p-3">
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
                                <video
                                    autoPlay
                                    playsInline
                                    className="w-full h-full rounded-2xl bg-slate-400"
                                    ref={remoteVideoRef[item.callID]}
                                ></video>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
