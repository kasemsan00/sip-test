import Head from "next/head";

export default function Home() {
    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="min-h-screen ">
                <h1 className="title">
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>
                <h1 className="text-3xl font-bold underline">Hello world!</h1>
            </main>
        </div>
    );
}
