import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import JsSIP from "jssip";
import { Modal, Button } from "react-daisyui";
import InputSip from "./InputSip";

let userAgent = null;
let newSession = null;

export default function SipJS() {
    // const registerDetailRef = useRef(null);
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
    const [destination, setDestination] = useState("");
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
            // registerDetailRef.current.innerText = "REGISTER";
        });
        userAgent.on("unregistered", function (e) {
            console.log(e);
        });
        userAgent.on("registrationFailed", function (e) {
            // registerDetailRef.current.innerText = e.cause;
        });

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
                    // localVideoRef.current.srcObject = newSession.getLocalStreams()[0];
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
                console.log("call is in progress");
            },
            failed: function (e) {
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
                localVideoRef.current.srcObject = session.connection.getLocalStreams()[0];
                localVideoRef.current.classList.remove("hidden");
            },
        };

        var options = {
            eventHandlers: eventHandlers,
            mediaConstraints: { audio: true, video: true },
        };

        callDetailRef.current.innerText = "Call" + " " + registerDetail.destination;
        var session = userAgent.call("sip:" + registerDetail.destination + "@" + registerDetail.server, options);
        session.connection.addEventListener("addstream", (event) => {
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
        newSession.answer();
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
                <div className="flex m-4 flex-col w-full max-w-full h-[calc(100%-30px)]">
                    <div className="flex flex-1 h-1/2 w-full drop-shadow-xl self-center items-center justify-center mb-2">
                        <div className="flex h-full items-center justify-center rounded-2xl animate__animated animate__zoomIn">
                            <video autoPlay playsInline ref={localVideoRef} className="w-full h-full rounded-2xl hidden" muted></video>
                        </div>
                    </div>
                    <div className="flex flex-1 h-1/2 w-full drop-shadow-xl self-center items-center justify-center">
                        <div className="flex h-full items-center justify-center rounded-2xl animate__animated animate__zoomIn">
                            <video autoPlay playsInline ref={remoteVideoRef} className="w-full h-full rounded-2xl hidden"></video>
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={isIncoming}>
                <Modal.Header className="font-bold">Incoming Call</Modal.Header>

                {/* <Modal.Body>You've been selected for a chance to get one year of subscription to use Wikipedia for free!</Modal.Body> */}

                <Modal.Actions>
                    <Button onClick={handleDeclineCall} color="error">
                        Decline
                    </Button>
                    <Button onClick={handleAcceptCall} color="success">
                        Accept
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}
