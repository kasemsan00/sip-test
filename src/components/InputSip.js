import { Form, InputGroup, Input } from "react-daisyui";
import DialerSipIcon from "@mui/icons-material/DialerSip";

export default function SipInput({ registerDetail, handleRegister, handleUnRegister, handleRegisterDetailChange, handleCall, handleHangUp }) {
    return (
        <>
            <div className="form-control w-full ">
                <label className="label">
                    <span className="label-text text-xs">Domain</span>
                </label>
                <Input
                    className="w-full"
                    size="xs"
                    value={registerDetail.server}
                    onChange={(event) => handleRegisterDetailChange("server", event.target.value)}
                    placeholder="server"
                    disabled={registerDetail.isRegister}
                />
            </div>
            <div className="form-control w-full ">
                <label className="label">
                    <span className="label-text text-xs">Websocket</span>
                </label>
                <Input
                    className="w-full"
                    size="xs"
                    value={registerDetail.websocket}
                    onChange={(event) => handleRegisterDetailChange("websocket", event.target.value)}
                    placeholder="websocket"
                    disabled={registerDetail.isRegister}
                />
            </div>
            <div className="form-control w-full ">
                <label className="label">
                    <span className="label-text text-xs">Extension</span>
                </label>
                <Input
                    className="w-full"
                    size="xs"
                    value={registerDetail.extension}
                    onChange={(event) => handleRegisterDetailChange("extension", event.target.value)}
                    placeholder="extension"
                    disabled={registerDetail.isRegister}
                />
            </div>
            <div className="form-control w-full mb-2">
                <label className="label">
                    <span className="label-text text-xs ">Password</span>
                </label>
                <Input
                    className="w-full"
                    size="xs"
                    value={registerDetail.password}
                    onChange={(event) => handleRegisterDetailChange("password", event.target.value)}
                    placeholder="password"
                    disabled={registerDetail.isRegister}
                />
            </div>
            <button className="btn btn-info w-full m-2" disabled={registerDetail.isRegister} onClick={handleRegister}>
                Register
            </button>
            <button className="btn btn-error w-full m-2" disabled={!registerDetail.isRegister} onClick={handleUnRegister}>
                Unregister
            </button>
            <Form className="w-full mb-2">
                <InputGroup className="w-full">
                    <span>
                        <DialerSipIcon />
                    </span>
                    <Input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-info w-full text-center"
                        value={registerDetail.destination}
                        onChange={(event) => handleRegisterDetailChange("destination", event.target.value)}
                        bordered
                    />
                </InputGroup>
            </Form>
            <button className="btn btn-success w-full m-2" onClick={handleCall}>
                Call
            </button>
            <button className="btn btn-warning w-full m-2" onClick={handleHangUp}>
                HangUp
            </button>
        </>
    );
}
