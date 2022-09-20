export default function IncomingCall({ callID, view, displayName, handleAcceptCall, handleDeclineCall }) {
    return (
        <div className="flex flex-col ">
            <div className={`alert shadow-lg ${view ? "" : "hidden"}`}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    <span>{displayName}</span>
                </div>
                <div className="flex-none">
                    <button className="btn btn-sm btn-ghost" onClick={() => handleDeclineCall(callID)}>
                        Deny
                    </button>
                    <button className="btn btn-sm btn-primary" onClick={() => handleAcceptCall(callID)}>
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
}
