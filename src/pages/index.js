import dynamic from "next/dynamic";
import { Suspense } from "react";
import Head from "next/head";

const DynamicSipMain = dynamic(() => import("../components/SipMain"));

export default function Home() {
  return (
    <>
      <Head>
        <title>SipWebRTC Demo</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Suspense fallback={`Loading...`}>
        <DynamicSipMain />
      </Suspense>
    </>
  );
}
