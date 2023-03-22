import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProfile } from "../../redux/slices/profileDataSlice";
const _ = require("lodash");
import { Form, InputGroup, Input, Radio } from "react-daisyui";

export default function SipAccounts({ visible }) {
  const dispatch = useDispatch();
  const [registerDetail, setRegisterDetail] = useState({
    server: "",
    websocket: "",
    extension: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState([]);
  const [selectProfile, setSelectProfile] = useState("profile1");

  useEffect(() => {
    if (registerData.length === 0 && localStorage.getItem("profileData") !== null) {
      console.log("initial profile");
      const initData = JSON.parse(localStorage.getItem("profileData"));
      setRegisterData(JSON.parse(localStorage.getItem("profileData")));
      setRegisterDetail(initData[selectProfile]);
    }
  }, [selectProfile, registerData]);

  const handleRegisterDetailChange = (type, value) => {
    console.log(value);
    setRegisterDetail((prevState) => ({ ...prevState, [type]: value }));
    setRegisterData({
      ...registerData,
      [selectProfile]: { ...registerDetail, [type]: value },
    });
  };

  useEffect(() => {
    if (visible === false) {
      if (registerData.length !== 0) {
        localStorage.setItem("profileData", JSON.stringify(registerData));
        dispatch(setProfile(registerData));
      }
    }
  }, [dispatch, registerData, visible]);

  const handleProfileChange = (event) => {
    setSelectProfile(event.target.value);
    const getData = registerData[event.target.value];
    if (getData !== undefined) {
      setRegisterDetail(getData);
    } else {
      setRegisterDetail({
        server: "",
        websocket: "",
        extension: "",
        password: "",
      });
    }
  };

  return (
    <div>
      <select className="mt-2 select select-bordered select-sm w-full mb-2" value={selectProfile} onChange={(event) => handleProfileChange(event)}>
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
