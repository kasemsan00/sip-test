import Head from "next/head";
import Jssip from "../components/jssip";

export default function Home() {
    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Jssip />
        </div>
    );
}
