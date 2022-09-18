import { useEffect, useState, useRef, createRef } from "react";
import JsSIP from "jssip";
import InputSip from "./InputSip";
import ViewVideo from "./ViewVideo";
import IncomingCall from "./IncomingCall";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterStatus } from "../redux/slices/registerStatusSlice";
// import CodecHandler from "../middleware/CodecHandler";
import adapter from "webrtc-adapter";

let userAgent = null;
let newSession = null;
const iceServers = [{ urls: "turn:turn.ttrs.in.th?transport=tcp", username: "turn01", credential: "Test1234" }];
const pcConfig = {
  iceServers: iceServers,
  sdpSemantics: "unified-plan",
};

export default function SipMain() {
  const dispatch = useDispatch();

  const registerStatus = useSelector((state) => state.registerStatus);
  const profileSelect = useSelector((state) => state.profileSelect);
  const profileData = useSelector((state) => state.profileData);
  const mediaStream = useSelector((state) => state.mediaStream);
  const callOutRef = useRef(null);

  const [destination, setDestination] = useState("");
  const [sessionData, setSessionData] = useState([]);
  const [remoteStream, setRemoteStream] = useState([]);
  const [localVideoStatus, setLocalVideoStatus] = useState({ video: false, audio: false });

  useEffect(() => {
    if (localStorage.getItem("destination") !== null) {
      setDestination(localStorage.getItem("destination"));
    }
    if (localStorage.getItem("codec") === null) {
      localStorage.setItem("codec", "h264");
    }
  }, []);

  useEffect(() => {
    console.log("remoteStream", remoteStream);
  }, [remoteStream]);

  const registerSip = () => {
    console.log("registerSip");
    var socket = new JsSIP.WebSocketInterface(profileData[profileSelect].websocket);
    var configuration = {
      sockets: [socket],
      uri: "sip:" + profileData[profileSelect].extension + "@" + profileData[profileSelect].server,
      password: profileData[profileSelect].password,
    };

    userAgent = new JsSIP.UA(configuration);
    userAgent.start();
    dispatch(setRegisterStatus("registerProcess"));

    userAgent.on("connecting", (event) => {
      console.log("connecting");
      console.log(event);
      dispatch(setRegisterStatus("connecting"));
    });

    userAgent.on("registered", (event) => {
      console.log("registered");
      console.log(event);
      dispatch(setRegisterStatus("registered"));
    });
    userAgent.on("unregistered", (event) => {
      console.log("unregistered");
      console.log(event);
      dispatch(setRegisterStatus("unregistered"));
    });
    userAgent.on("registrationFailed", (event) => {
      console.log("registrationFailed");
      console.log(event);
      dispatch(setRegisterStatus("registrationFailed"));
    });
    userAgent.on("disconnected", (event) => {
      console.log("disconnected");
      console.log(event);
      dispatch(setRegisterStatus("disconnected"));
    });

    userAgent.on("newRTCSession", (ev1) => {
      const callID = ev1.request.call_id;
      console.log(" *** newRTCSession", ev1.originator, ev1.request.method, ev1);
      let view = false;

      newSession = ev1.session;

      if (ev1.originator === "local") {
        newSession.connection.addEventListener("addstream", (event) => {
          setRemoteStream((remoteStream) => [
            ...remoteStream,
            {
              callID: callID,
              stream: event.stream,
            },
          ]);
        });
      } else if (ev1.originator === "remote") {
        view = true;
      }
      setSessionData((sessionData) => [
        ...sessionData,
        {
          callID: callID,
          displayName: ev1.request.from._uri._user,
          session: ev1,
          view: view,
        },
      ]);

      newSession.on("ended", (event) => {
        console.log("ended", callID);
        setRemoteStream((remoteStream) => remoteStream.filter((data) => data.callID != callID));
        setSessionData((sessionData) => sessionData.filter((data) => data.callID != callID));
      });
      newSession.on("confirmed", function () {
        console.log("add localVideo");
        callOutRef.current.classList.replace("fixed", "hidden");
      });
      newSession.on("muted", function (event) {
        if (event.video) {
          setLocalVideoStatus((prevState) => ({ ...prevState, video: true }));
        }
        if (event.audio) {
          setLocalVideoStatus((prevState) => ({ ...prevState, audio: true }));
        }
      });
      newSession.on("unmuted", (event) => {
        if (event.video) {
          setLocalVideoStatus((prevState) => ({ ...prevState, video: false }));
        }
        if (event.audio) {
          setLocalVideoStatus((prevState) => ({ ...prevState, audio: false }));
        }
      });
      newSession.on("addstream", (event) => {
        console.log(event);
      });
      newSession.on("sdp", (event) => {
        // console.log("Codec", localStorage.getItem("codec"), event.originator);
        // if (event.originator === "remote") {
        //     event.sdp = CodecHandler.preferCodec(event.sdp, localStorage.getItem("codec"));
        // }
        // if (event.originator === "local") {
        //     event.sdp = CodecHandler.preferCodec(event.sdp, localStorage.getItem("codec"));
        // }
      });
      newSession.on("peerconnection", function (ev2) {
        ev2.peerconnection.onaddstream = function (event) {
          console.log(event.stream);
          setRemoteStream((remoteStream) => [
            ...remoteStream,
            {
              callID: callID,
              stream: event.stream,
            },
          ]);
        };
        ev2.peerconnection.onremovestream = function (ev3) {
          setRemoteStream((remoteStream) => remoteStream.filter((data) => data.callID != callID));
          setSessionData((sessionData) => sessionData.filter((data) => data.callID != callID));
        };
      });
    });
  };

  const sipCall = () => {
    if (registerStatus !== "registered") return null;
    var eventHandlers = {
      progress: (e) => {
        callOutRef.current.innerText = "Call " + destination;
        console.log("call is in progress");
      },
      failed: (e) => {
        callOutRef.current.innerText = e.cause;
        console.log("call failed with cause: " + e);
      },
      ended: (event) => {
        console.log(event);
        // remoteVideoRef.current.classList.add("hidden");
      },
      confirmed: (e) => {
        console.log("call confirmed", e);
        callOutRef.current.innerText = "";
        console.log("add localVideo");
      },
      muted: (e) => {
        console.log("muted", e);
        if (e.video) {
          setLocalVideoStatus((prevState) => ({ ...prevState, video: true }));
        }
        if (e.audio) {
          setLocalVideoStatus((prevState) => ({ ...prevState, audio: true }));
        }
      },
      unmuted: (e) => {
        if (e.video) {
          setLocalVideoStatus((prevState) => ({ ...prevState, video: false }));
        }
        if (e.audio) {
          setLocalVideoStatus((prevState) => ({ ...prevState, audio: false }));
        }
      },
    };

    var options = {
      eventHandlers: eventHandlers,
      mediaStream: mediaStream,
      pcConfig: pcConfig,
    };

    userAgent.call("sip:" + destination + "@" + profileData[profileSelect].server, options);
  };

  const handleRegister = () => {
    if (userAgent !== null) {
      userAgent.stop();
    }
    registerSip();
  };

  const handleUnRegister = () => {
    if (userAgent !== null) {
      userAgent.stop();
    }
  };

  const handleCall = () => {
    try {
      if (registerStatus !== "registered") return null;
      localStorage.setItem("destination", destination);
      callOutRef.current.innerText = "Call " + destination;
      callOutRef.current.classList.replace("hidden", "fixed");
      sipCall();
    } catch (error) {
      console.log(error);
    }
  };
  const handleHangUp = async () => {
    try {
      if (registerStatus !== "registered") return null;
      sessionData.forEach((incoming) => {
        incoming.session.session.terminate();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptCall = (callID) => {
    const _session = sessionData.find((data) => data.callID === callID);
    console.log("callID", _session);
    _session.session.session.answer({
      mediaStream: mediaStream,
      pcConfig: pcConfig,
    });
    _session.view = false;

    const index = sessionData.findIndex((data) => data.callID === callID);
    const newSessionData = [...sessionData];
    newSessionData[index] = _session;
    setSessionData(newSessionData);
  };
  const handleDeclineCall = (callID) => {
    const _session = sessionData.find((data) => data.callID === callID);
    _session.session.session.terminate();
    _session.view = false;

    const index = sessionData.findIndex((data) => data.callID === callID);
    const newSessionData = [...sessionData];
    newSessionData[index] = _session;
    setSessionData(newSessionData);
  };

  const handleMuteVideo = (muted) => {
    if (newSession !== null) {
      if (muted) {
        newSession.mute({ video: true });
      } else if (!muted) {
        newSession.unmute({ video: true });
      }
    }
  };
  const handleMutedMicrophone = (muted) => {
    if (newSession !== null) {
      if (muted) {
        newSession.mute({ audio: true });
      } else if (!muted) {
        newSession.unmute({ audio: true });
      }
    }
  };

  return (
    <>
      <div className="flex flex-row w-screen h-screen bg-slate-200 shadow-xl overflow-hidden">
        <InputSip
          handleRegister={handleRegister}
          handleUnRegister={handleUnRegister}
          handleCall={handleCall}
          handleHangUp={handleHangUp}
          isVideoMuted={localVideoStatus.video}
          isMicrophoneMuted={localVideoStatus.audio}
          handleMuteVideo={handleMuteVideo}
          handleMutedMicrophone={handleMutedMicrophone}
          destination={destination}
          setDestination={setDestination}
        />
        <ViewVideo callOutRef={callOutRef} sessionData={sessionData} remoteStream={remoteStream} />
      </div>
      <div className="fixed flex top-10 w-full justify-center ">
        {sessionData.map((incoming, index) => {
          return (
            <IncomingCall
              key={index}
              view={incoming.view}
              callID={incoming.callID}
              displayName={incoming.displayName}
              handleAcceptCall={handleAcceptCall}
              handleDeclineCall={handleDeclineCall}
            />
          );
        })}
      </div>
    </>
  );
}
