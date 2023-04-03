import { Input, InputGroup } from "react-daisyui";
import { useDispatch, useSelector } from "react-redux";
import { setBundlePolicy, setIceCandidatePoolSize, setIceTransportPolicy, setRtcpMuxPolicy } from "../../redux/slices/pcConfigSlice";

export default function PcConfig() {
  const dispatch = useDispatch();
  const { iceTransportPolicy, rtcpMuxPolicy, bundlePolicy, iceCandidatePoolSize } = useSelector((state) => state.pcConfig);
  return (
    <>
      <InputGroup size="sm mt-1">
        <span className="w-full">iceTransportPolicy</span>
        <Input
          className="w-full"
          size="sm"
          placeholder="iceTransportPolicy"
          value={iceTransportPolicy}
          onChange={(event) => {
            dispatch(setIceTransportPolicy(event.target.value));
          }}
        />
      </InputGroup>
      <InputGroup size="sm mt-1">
        <span className="w-full">rtcpMuxPolicy</span>
        <Input
          className="w-full"
          size="sm"
          placeholder="rtcpMuxPolicy"
          value={rtcpMuxPolicy}
          onChange={(event) => {
            dispatch(setRtcpMuxPolicy(event.target.value));
          }}
        />
      </InputGroup>
      <InputGroup size="sm mt-1">
        <span className="w-full">bundlePolicy</span>
        <Input
          type="text"
          className="w-full"
          size="sm"
          placeholder="bundlePolicy"
          value={bundlePolicy}
          onChange={(event) => {
            dispatch(setBundlePolicy(event.target.value));
          }}
        />
      </InputGroup>
      <InputGroup size="sm mt-1">
        <span className="w-full">iceCandidatePoolSize</span>
        <Input
          type="number"
          className="w-full"
          size="sm"
          placeholder="iceCandidatePoolSize"
          value={iceCandidatePoolSize}
          onChange={(event) => {
            dispatch(setIceCandidatePoolSize(parseInt(event.target.value)));
          }}
        />
      </InputGroup>
    </>
  );
}
