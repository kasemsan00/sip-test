export default function ViewVideo({ callOutRef, localVideoRef, remoteVideoRef }) {
    return (
        <div className="flex m-4 flex-col w-full max-w-full h-[calc(100%-30px)]">
            <div className="fixed top-[40%] left-1/2 justify-center items-center text-6xl" ref={callOutRef}></div>
            <div className="flex flex-1 h-1/2 w-full self-center items-center justify-center pb-2">
                <div className="flex h-full items-center justify-center rounded-2xl animate__animated animate__zoomIn ">
                    <video autoPlay playsInline ref={localVideoRef} className="w-full h-full rounded-2xl hidden" muted></video>
                </div>
            </div>
            <div className="flex flex-1 h-1/2 w-full self-center items-center justify-center pt-2">
                <div className="flex h-full items-center justify-center rounded-2xl animate__animated animate__zoomIn ">
                    <video autoPlay playsInline ref={remoteVideoRef} className="w-full h-full rounded-2xl hidden"></video>
                </div>
            </div>
        </div>
    );
}
