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
// const iceServers = [
//     {
//         urls: ["stun:turn.ttrs.in.th"],
//     },
// ];

export default function SipJS() {
    const callOutRef = useRef(null);
    const callDetailRef = useRef(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const statusBarRef = useRef(null);

    const [registerDetail, setRegisterDetail] = useState({
        server: "test-135-sip.ttrs.in.th",
        websocket: "wss://test-135-sip.ttrs.in.th:443/ws",
        extension: "User2",
        password: "test1234",
        isRegister: false,
        destination: "9999",
    });
    const [isIncoming, setIsIncoming] = useState(false);

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
            setRegisterDetail((prevState) => ({
                ...prevState,
                isRegister: true,
            }));
            statusBarChange("progress-success");
        });
        userAgent.on("unregistered", function (e) {
            console.log(e);
        });
        userAgent.on("registrationFailed", function (e) {});

        userAgent.on("newRTCSession", function (ev1) {
            console.log(" *** newRTCSession", ev1.originator, ev1.request.method, ev1);

            newSession = ev1.session;
            if (ev1.originator === "remote") {
                console.log(ev1.originator);
                setIsIncoming(true);
            }
            newSession.on("ended", function () {
                localVideoRef.current.classList.add("hidden");
                remoteVideoRef.current.classList.add("hidden");
            });
            newSession.on("confirmed", function () {
                localVideoRef.current.srcObject = newSession.connection.getLocalStreams()[0];
                localVideoRef.current.classList.remove("hidden");
            });

            // peerconnection
            newSession.on("peerconnection", function (ev2) {
                console.log(" *** peerconnection", ev1.originator, ev2, ev2.peerconnection);

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
            progress: function (e) {
                callOutRef.current.innerText = "Call " + registerDetail.destination;
                console.log("call is in progress");
            },
            failed: function (e) {
                callOutRef.current.innerText = e.cause;
                callDetailRef.current.innerText = e.cause;
                console.log("call failed with cause: " + e);
            },
            ended: function (e) {
                console.log("call ended with cause: " + e);
                localVideoRef.current.classList.add("hidden");
                remoteVideoRef.current.classList.add("hidden");
            },
            confirmed: function (e) {
                console.log("call confirmed");
                callDetailRef.current.innerText = "";
                callOutRef.current.innerText = "";
                localVideoRef.current.srcObject = session.connection.getLocalStreams()[0];
                localVideoRef.current.classList.remove("hidden");
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
        setRegisterDetail((prevState) => ({
            ...prevState,
            isRegister: false,
        }));
    };

    const handleCall = () => {
        try {
            callOutRef.current.innerText = "Call " + registerDetail.destination;
            sipCall();
        } catch (error) {
            console.log(error);
        }
    };
    const handleHangUp = () => {
        try {
            newSession.terminate();
        } catch (error) {
            console.log(error);
        }
    };

    const handleAcceptCall = () => {
        console.log(newSession);
        newSession.answer({
            mediaConstraints: mediaConstraints,
            pcConfig: {
                iceServers: iceServers,
            },
        });
        setIsIncoming(false);
    };
    const handleDeclineCall = () => {
        newSession.terminate();
        setIsIncoming(false);
    };

    const handleRegisterDetailChange = (type, value) => {
        setRegisterDetail((prevState) => ({
            ...prevState,
            [type]: value,
        }));
    };

    const statusBarChange = (status) => {
        statusBarRef.current.className = "progress w-full " + status;
    };

    return (
        <>
            <div className="flex flex-row h-screen w-screen bg-slate-200">
                <div className="flex w-1/4 m-3 flex-col items-center self-start">
                    <InputSip
                        registerDetail={registerDetail}
                        handleRegister={handleRegister}
                        handleUnRegister={handleUnRegister}
                        handleRegisterDetailChange={handleRegisterDetailChange}
                        handleCall={handleCall}
                        handleHangUp={handleHangUp}
                    />
                    <div ref={callDetailRef}></div>
                    <progress className="progress w-full" value={100} ref={statusBarRef} />
                </div>
                <ViewVideo
                    destination={registerDetail.destination}
                    callOutRef={callOutRef}
                    localVideoRef={localVideoRef}
                    remoteVideoRef={remoteVideoRef}
                />
            </div>
            <IncomingCall isIncoming={isIncoming} handleAcceptCall={handleAcceptCall} handleDeclineCall={handleDeclineCall} />
        </>
    );
}
