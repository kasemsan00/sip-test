import dynamic from "next/dynamic";
import { Suspense } from "react";
import Head from "next/head";

const DynamicJssip = dynamic(() => import("../components/Jssip"), {
  suspense: true,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>SipWebRTC Demo</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Suspense fallback={`Loading...`}>
        <DynamicJssip />
      </Suspense>
    </>
  );
}
