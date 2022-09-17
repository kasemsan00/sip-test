import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function RegisterStatus() {
  const statusColorRef = useRef(null);
  const status = useSelector((state) => state.registerStatus);

  useEffect(() => {
    switch (status) {
      case "connecting":
        statusColorRef.current.className = "badge badge-lg badge-warning shadow-sm";
        break;
      case "registerProcess":
        statusColorRef.current.className = "badge badge-lg badge-warning shadow-sm";
        break;
      case "registered":
        statusColorRef.current.className = "badge badge-lg badge-success shadow-sm";
        break;
      case "unregistered":
        statusColorRef.current.className = "badge badge-lg badge-warning shadow-sm";
        break;
      case "registrationFailed":
        statusColorRef.current.className = "badge badge-lg badge-error shadow-sm";
        break;
      case "disconnected":
        statusColorRef.current.className = "badge badge-lg badge-error shadow-sm";
        break;
      default:
        statusColorRef.current.className = "badge badge-lg shadow-sm";
        break;
    }
  }, [status]);

  return (
    <div className="flex flex-1 flex-row my-2">
      <div className="mr-2">
        <div className="badge badge-lg badge-info shadow-sm" ref={statusColorRef}></div>
      </div>
      <div className="text-sm">{status}</div>
    </div>
  );
}
