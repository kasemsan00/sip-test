import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import JsSIP from "jssip";
import { Modal, Button, Form, InputGroup, Input } from "react-daisyui";
import DialerSipIcon from "@mui/icons-material/DialerSip";

let ua = null;
let newSession = null;

export default function SipJS() {
    const registerDetailRef = useRef(null);
    const callDetailRef = useRef(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    const [registerDetail, setRegisterDetail] = useState({
        server: "test-135-sip.ttrs.in.th",
        websocket: "wss://test-135-sip.ttrs.in.th:443/ws",
        extension: "User2",
        password: "test1234",
    });
    const [destination, setDestination] = useState("");
    const [isIncoming, setIsIncoming] = useState(false);

    useEffect(() => {
        setDestination(localStorage.getItem("destination"));
        console.log(localStorage.getItem("registerDetail"));
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

        ua = new JsSIP.UA(configuration);
        ua.start();
        ua.on("registered", function (e) {
            console.log(e);
            registerDetailRef.current.innerText = "REGISTER";
        });
        ua.on("unregistered", function (e) {
            console.log(e);
        });
        ua.on("registrationFailed", function (e) {
            registerDetailRef.current.innerText = e.cause;
        });

        ua.on("newRTCSession", function (ev1) {
            console.log(" *** newRTCSession", ev1.originator, ev1.request.method, ev1);

            newSession = ev1.session;
            if (ev1.originator === "remote") {
                console.log(ev1.originator);
                setIsIncoming(true);
            }
            newSession.on("confirmed", function () {
                //the call has connected, and audio is playing
                localVideoRef.current.srcObject = newSession.connection.getLocalStreams()[0];
            });

            // peerconnection
            newSession.on("peerconnection", function (ev2) {
                console.log(" *** peerconnection", ev1.originator, ev2, ev2.peerconnection);

                // onaddstream
                ev2.peerconnection.onaddstream = function (event) {
                    console.log(ev1);
                    // localVideoRef.current.srcObject = newSession.getLocalStreams()[0];
                    remoteVideoRef.current.srcObject = event.stream;
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
            },
            confirmed: function (e) {
                console.log("call confirmed");
                console.log(session.connection.getLocalStreams()[0]);
                console.log(session.connection);
                localVideoRef.current.srcObject = session.connection.getLocalStreams()[0];
            },
        };

        var options = {
            eventHandlers: eventHandlers,
            mediaConstraints: { audio: true, video: true },
        };

        callDetailRef.current.innerText = "Call" + " " + destination;
        var session = ua.call("sip:" + destination + "@" + registerDetail.server, options);
        session.connection.addEventListener("addstream", (event) => {
            console.log(event.stream);
            remoteVideoRef.current.srcObject = event.stream;
        });
    };

    const handleRegister = () => {
        localStorage.setItem("registerDetail", JSON.stringify(registerDetail));
        registerSip();
    };
    const handleCall = () => {
        sipCall();
    };

    const handleCallDestination = (event) => {
        setDestination(event.target.value);
        localStorage.setItem("destination", event.target.value);
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
        console.log(type, value);
        setRegisterDetail((prevState) => ({
            ...prevState,
            [type]: value,
        }));
    };

    return (
        <>
            <Head>
                <title>SIP</title>
            </Head>
            {/* server: "test-135-sip.ttrs.in.th", websocket: "wss://test-135-sip.ttrs.in.th:443/ws", extension: "User2", password: "test1234", */}
            <div className="flex flex-1 flex-row">
                <div className="flex flex-1 m-3 flex-col items-center self-center">
                    <Input
                        className="w-full"
                        value={registerDetail.server}
                        onChange={(event) => handleRegisterDetailChange("server", event.target.value)}
                        placeholder="server"
                    />
                    <Input
                        className="w-full"
                        value={registerDetail.websocket}
                        onChange={(event) => handleRegisterDetailChange("websocket", event.target.value)}
                        placeholder="websocket"
                    />
                    <Input
                        className="w-full"
                        value={registerDetail.extension}
                        onChange={(event) => handleRegisterDetailChange("extension", event.target.value)}
                        placeholder="extension"
                    />
                    <Input
                        className="w-full"
                        value={registerDetail.password}
                        onChange={(event) => handleRegisterDetailChange("password", event.target.value)}
                        placeholder="password"
                    />
                    <button className="btn btn-info w-full" onClick={handleRegister}>
                        Register
                    </button>
                    <Form className="w-full">
                        <InputGroup className="w-full">
                            <span>
                                <DialerSipIcon />
                            </span>
                            <Input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered input-info w-full text-center"
                                value={destination}
                                onChange={handleCallDestination}
                                bordered
                            />
                        </InputGroup>
                    </Form>
                    <button className="btn btn-warning w-full" onClick={handleCall}>
                        Call
                    </button>
                    <div ref={registerDetailRef}></div>
                    <div ref={callDetailRef}></div>
                </div>
                <div className="flex flex-2 m-3 flex-col h-[calc(50vh-100px)]">
                    <video
                        autoPlay
                        playsInline
                        ref={localVideoRef}
                        className="flex flex-1 w-full m-3 drop-shadow-xl items-center self-center rounded-2xl bg-black"
                        muted
                    ></video>
                    <video
                        autoPlay
                        playsInline
                        ref={remoteVideoRef}
                        className="flex flex-1 w-full m-3 drop-shadow-xl items-center self-center rounded-2xl bg-black"
                    ></video>
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
