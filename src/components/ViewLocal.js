import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setLocalStream } from "../redux/slices/mediaStreamSlice";
import adapter from "webrtc-adapter";

export default function ViewLocal() {
    const dispatch = useDispatch();
    const localVideoRef = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            dispatch(setLocalStream(stream));
            localVideoRef.current.srcObject = stream;
        });
    }, [dispatch]);

    return (
        <div className="pt-2">
            <video className="w-full h-[200px] rounded-xl bg-slate-800" autoPlay playsInline ref={localVideoRef} muted></video>
        </div>
    );
}
