import React, { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { ethers } from 'ethers';
// import toast from 'sonner'
import {RESEARCHADDR , RESEARCHABI} from "../contract/abi"
const Register = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        timeduration: '',
        maxdatasetcount: '',
        formlink: '',
        spreadsheetid: '',
        sheetid: '',
        amount: ''
    });
// @ts-ignore 
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
// @ts-ignore
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    //   @ts-ignore 
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const researchContract = new ethers.Contract(RESEARCHADDR, RESEARCHABI, signer);

            
            const { title, description, formlink, spreadsheetid, sheetid, maxdatasetcount, timeduration, amount } = formData;

   
            const _sheetID = Number(sheetid);
            const _maxDataSetCount = Number(maxdatasetcount);
            const _timeDuration = Number(timeduration);
            const _amount = ethers.utils.parseEther(amount.toString()); // Convert amount to Ether

            // Call the registerResearch function
            const transaction = await researchContract.registerResearch(
                title,
                description,
                formlink,
                spreadsheetid,
                _sheetID,
                _maxDataSetCount,
                _timeDuration,
                { value: _amount }
            );

            await transaction.wait(); 

            console.log("Research registered:", transaction);
            
        } else {
            console.log('Ethereum object does not exist!');
        }
    } catch (error) {
        console.error("Error submitting research:", error);
        // Optionally, show an error message or handle the state
    }
};

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-100 to-blue-100">
            <Toaster/>
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-4xl space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-700 mb-10">Research Registration Form</h2>
                
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-900">Title of the research</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" required />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label htmlFor="timeduration" className="block text-sm font-medium text-gray-900">Time duration</label>
                        <input type="text" name="timeduration" value={formData.timeduration} onChange={handleChange} className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white" required />
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-900">Description of the research</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white" rows={3} required></textarea>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label htmlFor="maxdatasetcount" className="block text-sm font-medium text-gray-900">Max data set count</label>
                        <input type="number" name="maxdatasetcount" value={formData.maxdatasetcount} onChange={handleChange} className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white" required />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-900">Amount to distribute</label>
                        <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white" required />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label htmlFor="formlink" className="block text-sm font-medium text-gray-900">Form link</label>
                        <input type="url" name="formlink" value={formData.formlink} onChange={handleChange} className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white" required />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label htmlFor="spreadsheetid" className="block text-sm font-medium text-gray-900">Spreadsheet ID</label>
                        <input type="text" name="spreadsheetid" value={formData.spreadsheetid} onChange={handleChange} className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white" required />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label htmlFor="sheetid" className="block text-sm font-medium text-gray-900">Sheet ID</label>
                        <input type="text" name="sheetid" value={formData.sheetid} onChange={handleChange} className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white" required />
                    </div>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none shadow-lg transform transition duration-150 ease-in-out">Submit</button>
            </form>
        </div>
    );
}

export default Register;
