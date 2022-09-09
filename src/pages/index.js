import Head from "next/head";
import Jssip from "../components/Jssip";

export default function Home() {
    return (
        <>
            <Head>
                <title>SipWebRTC Demo</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Jssip />
        </>
    );
}
