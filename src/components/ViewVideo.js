import { useEffect, createRef, useState } from "react";

import CallEndIcon from "@mui/icons-material/CallEnd";

export default function ViewVideo({ callOutRef, sessionData, remoteStream }) {
  const [remoteVideoRef, setRemoteVideoRef] = useState([]);

  useEffect(() => {
    if (sessionData.length > 0) {
      const refVideo = [];
      sessionData.forEach((element) => {
        if (refVideo[element.callID] === undefined) {
          refVideo[element.callID] = createRef();
        }
      });
      setRemoteVideoRef(refVideo);
    }
  }, [sessionData]);

  useEffect(() => {
    if (remoteStream.length > 0) {
      remoteStream.forEach((itemStream) => {
        remoteVideoRef[itemStream.callID].current.srcObject = itemStream.stream;
      });
    }
  }, [remoteStream, remoteVideoRef]);

  const handleCallEnd = (callID) => {
    try {
      const _session = sessionData.find((data) => data.callID === callID);
      _session.session.session.terminate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-full pt-3 pb-4 bg-slate-500 items-center">
      <div className="hidden top-[40%] justify-center items-center text-6xl bg-gray-800 text-white p-3 rounded-xl shadow-md" ref={callOutRef}></div>
      <div className="flex flex-1 h-full w-full self-center items-center justify-center p-3">
        {sessionData.map((item, index) => {
          return (
            <div
              key={index}
              className="flex h-full items-center justify-center rounded-2xl p-2 animate__animated animate__zoomIn"
              onMouseOver={() => {
                document.getElementById("control" + item.callID).classList.replace("hidden", "flex");
              }}
              onMouseLeave={() => {
                document.getElementById("control" + item.callID).classList.replace("flex", "hidden");
              }}
            >
              <div id={"control" + item.callID} className="hidden fixed flex-row rounded-xl cursor-pointer bg-slate-200 z-50">
                <div className="rounded-xl cursor-pointer m-2 bg-slate-200 z-50" onClick={() => handleCallEnd(item.callID)}>
                  <CallEndIcon fontSize="large" color="error" />
                </div>
              </div>
              <video
                autoPlay
                playsInline
                controls={false}
                className="w-full h-full rounded-2xl bg-slate-400"
                ref={remoteVideoRef[item.callID]}
              ></video>
            </div>
          );
        })}
      </div>
    </div>
  );
}
