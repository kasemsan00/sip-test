import { useEffect, useState } from "react";
const _ = require("lodash");
import { Form, InputGroup, Input, Radio } from "react-daisyui";
export default function SipAccounts() {
    const [registerDetail, setRegisterDetail] = useState({
        server: "test-135-sip.ttrs.in.th",
        websocket: "wss://test-135-sip.ttrs.in.th:443/ws",
        extension: "User2",
        password: "test1234",
    });
    const [selectProfile, setSelectProfile] = useState("profile1");

    useEffect(() => {
        const profileData = JSON.parse(localStorage.getItem(selectProfile));
        if (profileData !== null) {
            setRegisterDetail(JSON.parse(localStorage.getItem(selectProfile)));
        } else {
            setRegisterDetail({
                server: "",
                websocket: "",
                extension: "",
                password: "",
            });
        }
    }, [selectProfile]);

    const handleRegisterDetailChange = (type, value) => {
        setRegisterDetail((prevState) => ({ ...prevState, [type]: value }));
        debounceSaveProfile(selectProfile, JSON.stringify(registerDetail));
    };

    const handleProfileChange = (event) => {
        setSelectProfile(event.target.value);
    };

    const saveProfile = (profile, data) => {
        localStorage.setItem(profile, data);
    };
    const debounceSaveProfile = _.debounce(saveProfile, 100);

    return (
        <div>
            <select className="mt-2 select select-bordered select-sm w-full mb-2" onChange={(event) => handleProfileChange(event)}>
                <option value="profile1">Profile 1</option>
                <option value="profile2">Profile 2</option>
                <option value="profile3">Profile 3</option>
                <option value="profile4">Profile 4</option>
            </select>
            <div className="form-control w-full mb-2">
                <InputGroup size="sm">
                    <span className="w-32">Server</span>
                    <Input
                        className="w-full"
                        size="sm"
                        value={registerDetail.server}
                        onChange={(event) => handleRegisterDetailChange("server", event.target.value)}
                        placeholder="server"
                    />
                </InputGroup>
            </div>
            <div className="form-control w-full mb-2">
                <InputGroup size="sm">
                    <span className="w-32">Websocket</span>
                    <Input
                        className="w-full"
                        size="sm"
                        value={registerDetail.websocket}
                        onChange={(event) => handleRegisterDetailChange("websocket", event.target.value)}
                        placeholder="websocket"
                    />
                </InputGroup>
            </div>
            <div className="form-control w-full mb-2">
                <InputGroup size="sm">
                    <span className="w-32">Extension</span>
                    <Input
                        className="w-full"
                        size="sm"
                        value={registerDetail.extension}
                        onChange={(event) => handleRegisterDetailChange("extension", event.target.value)}
                        placeholder="extension"
                    />
                </InputGroup>
            </div>
            <div className="form-control w-full mb-2">
                <InputGroup size="sm">
                    <span className="w-32">Password</span>
                    <Input
                        className="w-full"
                        size="sm"
                        value={registerDetail.password}
                        onChange={(event) => handleRegisterDetailChange("password", event.target.value)}
                        placeholder="password"
                    />
                </InputGroup>
            </div>
        </div>
    );
}
