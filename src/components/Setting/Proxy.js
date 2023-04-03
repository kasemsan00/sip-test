import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProxyServer, setProxyUsername, setProxyUrl, setProxyPassword } from "../../redux/slices/proxyServerSlice";
import { InputGroup, Input } from "react-daisyui";

export default function Device() {
  const dispatch = useDispatch();
  const { type: proxyType, url, username, password } = useSelector((state) => state.proxyServer);
  const handleSelectProxyType = (event) => {
    dispatch(setProxyServer(event.target.value));
    localStorage.setItem("proxyServer", event.target.value);
  };
  const handleSetProxyUrl = (event) => {
    dispatch(setProxyUrl(event.target.value));
    localStorage.setItem("proxyUrl", event.target.value);
  };
  const handleSetProxyUsername = (event) => {
    dispatch(setProxyUsername(event.target.value));
    localStorage.setItem("proxyUsername", event.target.value);
  };
  const handleSetProxyPassword = (event) => {
    dispatch(setProxyPassword(event.target.value));
    localStorage.setItem("proxyPassword", event.target.value);
  };

  return (
    <>
      <div className="flex flex-1 w-full">
        <div className="form-control">
          <label className="label cursor-pointer">
            <input
              type="radio"
              name="radio-6"
              className="radio checked:bg-red-500 mr-2"
              checked={proxyType === "turn"}
              value="turn"
              onChange={handleSelectProxyType}
            />
            <span className="label-text">Turn</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <input
              type="radio"
              name="radio-6"
              className="radio checked:bg-blue-500 mr-2"
              checked={proxyType === "stun"}
              value="stun"
              onChange={handleSelectProxyType}
            />
            <span className="label-text">Stun</span>
          </label>
        </div>
      </div>
      {proxyType === "turn" ? (
        <>
          <InputGroup size="sm">
            <span className="w-32">Urls</span>
            <Input className="w-full" size="sm" placeholder="Server" value={url} onChange={handleSetProxyUrl} />
          </InputGroup>
          <InputGroup size="sm mt-1">
            <span className="w-32">Username</span>
            <Input className="w-full" size="sm" placeholder="Username" value={username} onChange={handleSetProxyUsername} />
          </InputGroup>
          <InputGroup size="sm mt-1">
            <span className="w-32">Credential</span>
            <Input className="w-full" size="sm" placeholder="Password" value={password} onChange={handleSetProxyPassword} />
          </InputGroup>
        </>
      ) : null}
      {proxyType === "stun" ? (
        <>
          <InputGroup size="sm">
            <span className="w-32">Stun 1</span>
            <Input className="w-full" size="sm" placeholder="Server" value={url} onChange={handleSetProxyUrl} />
          </InputGroup>
        </>
      ) : null}
    </>
  );
}
