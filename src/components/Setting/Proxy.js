import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProxyServer } from "../../redux/slices/proxyServerSlice";
import { InputGroup, Input } from "react-daisyui";

export default function Device() {
  const dispatch = useDispatch();
  const [proxyType, setProxyType] = useState("turn");

  // useEffect(() => {
  //   if (localStorage.getItem("proxyServer") === null) {
  //     dispatch(setProxyServer("turn"));
  //   }
  // }, [dispatch]);

  const handleSelectProxyType = (event) => {
    setProxyType(event.target.value);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 w-full">
        <div className="form-control">
          <label className="label cursor-pointer">
            <input
              type="radio"
              name="radio-6"
              className="radio checked:bg-red-500 mr-2"
              checked={proxyType === "turn" ? true : false}
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
              checked={proxyType === "stun" ? true : false}
              value="stun"
              onChange={handleSelectProxyType}
            />
            <span className="label-text">Stun</span>
          </label>
        </div>
      </div>
      <div className="flex flex-1 flex-col w-full">
        {proxyType === "turn" ? (
          <>
            <InputGroup size="sm">
              <span className="w-32">Turn Server</span>
              <Input className="w-full" size="sm" placeholder="Server" />
            </InputGroup>
            <InputGroup size="sm mt-1">
              <span className="w-32">Username</span>
              <Input className="w-full" size="sm" placeholder="Username" />
            </InputGroup>
            <InputGroup size="sm mt-1">
              <span className="w-32">Password</span>
              <Input className="w-full" size="sm" placeholder="Password" />
            </InputGroup>
          </>
        ) : null}
        {proxyType === "stun" ? (
          <>
            <InputGroup size="sm">
              <span className="w-32">Stun 1</span>
              <Input className="w-full" size="sm" placeholder="Server" />
            </InputGroup>
            <InputGroup size="sm mt-1">
              <span className="w-32">Stun 2</span>
              <Input className="w-full" size="sm" placeholder="Server" />
            </InputGroup>
            <InputGroup size="sm mt-1">
              <span className="w-32">Stun 2</span>
              <Input className="w-full" size="sm" placeholder="Server" />
            </InputGroup>
          </>
        ) : null}
      </div>
    </div>
  );
}
