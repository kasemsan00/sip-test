import Head from "next/head";
import Jssip from "../components/Jssip";

export default function Home() {
    return (
        <>
            <Head>
                <title>ทดสอบ SIP</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Jssip />
        </>
    );
}
