import { useEffect, useState, useRef } from "react";
import JsSIP from "jssip";
import InputSip from "./InputSip";
import ViewVideo from "./ViewVideo";
import IncomingCall from "./IncomingCall";

// iceServers: [
//     {
//         urls: [
//             "stun:stun.l.google.com:19302",
//             "stun:stun1.l.google.com:19302",
//             "stun:stun2.l.google.com:19302",
//             "stun:stun3.l.google.com:19302",
//             "stun:stun4.l.google.com:19302",
//         ],
//     },
// ],
// iceServers: [{ urls: "turn:turn.ttrs.in.th?transport=tcp", username: "turn01", credential: "Test1234" }],
let userAgent = null;
let newSession = null;
const mediaConstraints = { audio: true, video: true };
const iceServers = [{ urls: "turn:turn.ttrs.in.th?transport=tcp", username: "turn01", credential: "Test1234" }];

export default function SipJS() {
    const callOutRef = useRef(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const statusBarRef = useRef(null);

    const [registerDetail, setRegisterDetail] = useState({
        server: "test-135-sip.ttrs.in.th",
        websocket: "wss://test-135-sip.ttrs.in.th:443/ws",
        extension: "User2",
        password: "test1234",
        destination: "9999",
    });
    const [isRegister, setIsRegister] = useState(false);
    const [incomingCall, setIncomingCall] = useState([]);
    const [localVideoStatus, setLocalVideoStatus] = useState({ video: false, audio: false });

    useEffect(() => {
        if (localStorage.getItem("registerDetail") !== null) {
            setRegisterDetail(JSON.parse(localStorage.getItem("registerDetail")));
        }
    }, []);

    const registerSip = () => {
        console.log("registerSip");
        var socket = new JsSIP.WebSocketInterface(registerDetail.websocket);
        var configuration = {
            sockets: [socket],
            uri: "sip:" + registerDetail.extension + "@" + registerDetail.server,
            password: registerDetail.password,
        };

        userAgent = new JsSIP.UA(configuration);
        userAgent.start();
        userAgent.on("registered", function (e) {
            setIsRegister(true);
            statusBarChange("bg-green-500");
        });
        userAgent.on("unregistered", function (e) {
            setIsRegister(false);
            statusBarChange("bg-red-500");
            console.log(e);
        });
        userAgent.on("registrationFailed", function (e) {});

        userAgent.on("newRTCSession", function (ev1) {
            console.log(" *** newRTCSession", ev1.originator, ev1.request.method, ev1);

            newSession = ev1.session;

            if (ev1.originator === "remote") {
                console.log(ev1.originator);
                setIncomingCall([
                    ...incomingCall,
                    {
                        callID: ev1.request.call_id,
                        displayName: ev1.request.from._uri._user,
                        session: ev1,
                        view: true,
                    },
                ]);
            }
            newSession.on("ended", (event) => {
                console.log("ended", event);
            });
            newSession.on("confirmed", function () {
                console.log("add localVideo");
                localVideoRef.current.srcObject = newSession.connection.getLocalStreams()[0];
                localVideoRef.current.classList.remove("hidden");
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
            // peerconnection
            newSession.on("peerconnection", function (ev2) {
                // onaddstream
                ev2.peerconnection.onaddstream = function (event) {
                    console.log(ev1);
                    remoteVideoRef.current.srcObject = event.stream;
                    remoteVideoRef.current.classList.remove("hidden");
                };

                // onremovestream
                ev2.peerconnection.onremovestream = function (ev3) {
                    remoteVideoRef.current.stop();
                    remoteVideoRef.current.srcObject = null;
                    localVideoRef.current.srcObject = null;
                };
            });
        });
    };

    const sipCall = () => {
        var eventHandlers = {
            progress: (e) => {
                callOutRef.current.innerText = "Call " + registerDetail.destination;
                console.log("call is in progress");
            },
            failed: (e) => {
                callOutRef.current.innerText = e.cause;
                console.log("call failed with cause: " + e);
            },
            ended: (e) => {
                console.log("call ended with cause: " + e);
                localVideoRef.current.classList.add("hidden");
                remoteVideoRef.current.classList.add("hidden");
            },
            confirmed: (e) => {
                console.log("call confirmed");
                callOutRef.current.innerText = "";
                console.log("add localVideo");
                localVideoRef.current.srcObject = session.connection.getLocalStreams()[0];
                localVideoRef.current.classList.remove("hidden");
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
            mediaConstraints: mediaConstraints,
            pcConfig: {
                iceServers: iceServers,
            },
        };

        var session = userAgent.call("sip:" + registerDetail.destination + "@" + registerDetail.server, options);
        session.connection.addEventListener("addstream", (event) => {
            console.log(event);
            remoteVideoRef.current.srcObject = event.stream;
            remoteVideoRef.current.classList.remove("hidden");
        });
    };

    const handleRegister = () => {
        localStorage.setItem("registerDetail", JSON.stringify(registerDetail));
        registerSip();
    };

    const handleUnRegister = () => {
        userAgent.stop();
    };

    const handleCall = () => {
        try {
            localStorage.setItem("destination", JSON.stringify(registerDetail));
            callOutRef.current.innerText = "Call " + registerDetail.destination;
            callOutRef.current.classList.replace("hidden", "fixed");
            sipCall();
        } catch (error) {
            console.log(error);
        }
    };
    const handleHangUp = async () => {
        incomingCall.forEach((incoming) => {
            incoming.session.session.terminate();
        });
        localVideoRef.current.classList.add("hidden");
        remoteVideoRef.current.classList.add("hidden");
    };

    const handleAcceptCall = (callID) => {
        const _incomingCall = incomingCall.find((incoming) => incoming.call_id === callID);
        _incomingCall.session.session.answer({
            mediaConstraints: mediaConstraints,
            pcConfig: {
                iceServers: iceServers,
            },
        });
        _incomingCall.view = false;

        const index = incomingCall.findIndex((incoming) => incoming.call_id === callID);
        const newIncomingCall = [...incomingCall];
        newIncomingCall[index] = _incomingCall;
        setIncomingCall(newIncomingCall);
    };
    const handleDeclineCall = (callID) => {
        const _incomingCall = incomingCall.find((incoming) => incoming.call_id === callID);
        _incomingCall.session.session.terminate();
        _incomingCall.view = false;

        const index = incomingCall.findIndex((incoming) => incoming.call_id === callID);
        const newIncomingCall = [...incomingCall];
        newIncomingCall[index] = _incomingCall;
        setIncomingCall(newIncomingCall);
    };

    const handleRegisterDetailChange = (type, value) => {
        setRegisterDetail((prevState) => ({
            ...prevState,
            [type]: value,
        }));
    };

    const statusBarChange = (status) => {
        statusBarRef.current.className = "fixed bottom-0 h-[10px] w-full " + status;
    };

    const handleMuteVideo = (muted) => {
        if (muted) {
            newSession.mute({
                video: true,
            });
        } else if (!muted) {
            newSession.unmute({ video: true });
        }
    };
    const handleMutedMicrophone = (muted) => {
        console.log("handleMutedMicrophone");
        if (muted) {
            newSession.mute({
                audio: true,
            });
        } else if (!muted) {
            newSession.unmute({ audio: true });
        }
    };

    return (
        <>
            <div className="flex flex-row w-screen h-screen bg-slate-200 ">
                <div className="flex w-1/4 min-w-[250px] px-3 h-full flex-col items-center self-start shadow-lg">
                    <InputSip
                        registerDetail={registerDetail}
                        isRegister={isRegister}
                        handleRegister={handleRegister}
                        handleUnRegister={handleUnRegister}
                        handleRegisterDetailChange={handleRegisterDetailChange}
                        handleCall={handleCall}
                        handleHangUp={handleHangUp}
                    />
                </div>
                <ViewVideo
                    isVideoMuted={localVideoStatus.video}
                    isMicrophoneMuted={localVideoStatus.audio}
                    handleMuteVideo={handleMuteVideo}
                    handleMutedMicrophone={handleMutedMicrophone}
                    destination={registerDetail.destination}
                    callOutRef={callOutRef}
                    localVideoRef={localVideoRef}
                    remoteVideoRef={remoteVideoRef}
                />
            </div>
            <div className="fixed flex top-10 w-full justify-center">
                <div className="flex flex-col w-1/2">
                    {incomingCall.map((incoming, index) => {
                        return (
                            <IncomingCall
                                key={index}
                                view={incoming.view}
                                callID={incoming.call_id}
                                displayName={incoming.displayName}
                                handleAcceptCall={handleAcceptCall}
                                handleDeclineCall={handleDeclineCall}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="fixed bottom-0 w-full h-[10px] " ref={statusBarRef}></div>
        </>
    );
}
