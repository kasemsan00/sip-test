import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProxyServer } from "../../redux/slices/proxyServerSlice";
import { InputGroup, Input } from "react-daisyui";

export default function Device() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("proxyServer") === null) {
      dispatch(setProxyServer("turn"));
    }
  }, [dispatch]);

  return (
    <div className="flex">
      <div className="flex flex-1 w-full">
        <div className="form-control">
          <label className="label cursor-pointer">
            <input type="radio" name="radio-6" className="radio checked:bg-red-500 mr-2" checked />
            <span className="label-text">Turn</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <input type="radio" name="radio-6" className="radio checked:bg-blue-500 mr-2" />
            <span className="label-text">Stun</span>
          </label>
        </div>
      </div>

      <div className="flex flex-1 w-full">
        <InputGroup size="sm">
          <span className="w-32">Turn Server</span>
          <Input className="w-full" size="sm" placeholder="websocket" />
        </InputGroup>
        <InputGroup size="sm">
          <span className="w-32">Turn Server</span>
          <Input className="w-full" size="sm" placeholder="websocket" />
        </InputGroup>
      </div>
    </div>
  );
}
