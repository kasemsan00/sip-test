import { useEffect, useRef } from "react";

export default function ViewLocal() {
    const localVideoRef = useRef(null);

    useEffect(() => {
        initialLocalCamera();
    }, []);

    const initialLocalCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            console.log("stream", stream);
            localVideoRef.current.srcObject = stream;
        });
    };

    return (
        <div className="pt-2">
            <video className="w-full h-[150px] rounded-xl bg-slate-800" autoPlay playsInline ref={localVideoRef}></video>
        </div>
    );
}
