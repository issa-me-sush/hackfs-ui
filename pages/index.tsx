import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function Home() {
    return (
        <div className="bg-gradient-to-r from-green-100 to-blue-100 min-h-screen flex flex-col items-center justify-center">
            <Head>
                <title>LabCoin - Decentralizing Research</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="text-center p-10">
                <h1 className="text-6xl font-bold text-gray-800">LabCoin</h1>
                <p className="text-2xl text-gray-600 mt-4">decentralizing research and innovation with web3</p>
                <div className="mt-8">
                    <Link href="/contribute">
                        <div className="m-4 bg-white/30 backdrop-blur-md shadow hover:shadow-lg rounded-lg px-6 py-3 font-semibold text-gray-800 transition duration-300 ease-in-out">
                            Contribute
                        </div>
                    </Link>
                    <Link href="/register">
                        <div className="m-4 bg-white/40 backdrop-blur-md shadow hover:shadow-lg rounded-lg px-6 py-3 font-semibold text-gray-800 transition duration-300 ease-in-out">
                            Register
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
