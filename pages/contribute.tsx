import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Head from 'next/head';

import {RESEARCHADDR , RESEARCHABI} from "../contract/abi"

const Contribute = () => {
    const [researches, setResearches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResearches = async () => {
            // @ts-ignore 
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.JsonRpcProvider("https://api.calibration.node.glif.io/rpc/v1");
                const contract = new ethers.Contract(RESEARCHADDR, RESEARCHABI, provider);
                try {
                    const researchCount = await contract.researchCounter();
                    const researchesArray = [];
                    
                    for (let i = 1; i <= researchCount; i++) {
                        const research = await contract.researches(i);
                        researchesArray.push({
                            id: i,
                            title: research.title,
                            description: research.description,
                            timeDuration: research.timeDuration.toString(),
                            researcher: research.researcher,
                            remainingAmount: ethers.utils.formatEther(research.remainingAmount),
                            data: {
                                researchID: research.data.researchID.toNumber(),
                                formLink: research.data.formLink,
                                spreadSheetID: research.data.spreadSheetID,
                                sheetID: research.data.sheetID.toNumber(),
                                maxDataSetCount: research.data.maxDataSetCount.toNumber()
                            }
                        });
                    }
                              // @ts-ignore 
                    setResearches(researchesArray);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching research data:", error);
                }
            }
        };

        fetchResearches();
    }, []);
          // @ts-ignore 
    const openLinkInNewTab = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen"><img src="/loading.gif" alt="Loading" /></div>;
    }

    return (
        <div className="bg-gradient-to-r from-green-100 to-blue-100 min-h-screen flex flex-col items-center justify-center p-10">
            <Head>
                <title>Contribute to Research</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container mx-auto p-4">
                <h1 className="text-4xl text-center font-bold text-gray-700 mb-10">Contribute to Research</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {researches.map((research, index) => (
                        <div key={index} className="bg-white/30 backdrop-blur-lg shadow-lg rounded-lg p-6 border border-gray-200/30 relative">
                            {/* @ts-ignore  */}
                            <h2 className="text-2xl font-bold text-gray-800">{research.title}</h2>
                               {/* @ts-ignore  */}
                            <p className="text-gray-600 mt-2">{research.description}</p>
                               {/* @ts-ignore  */}
                            <p className="text-sm text-gray-500">Research Duration: {research.timeDuration} seconds</p>
                               {/* @ts-ignore  */}
                            <p className="text-sm text-gray-500">Researcher: {research.researcher}</p>
                               {/* @ts-ignore  */}
                            <p className="text-sm text-gray-500">Remaining Amount: Ξ{research.remainingAmount}</p>
                               {/* @ts-ignore  */}
                            <button onClick={() => openLinkInNewTab(research.data.formLink)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded inline-block">
                                Contribute
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contribute;
