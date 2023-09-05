'use client'
import Top from "@/app/components/Top";
import React, {useState} from "react";

const PassWordReset = () => {
    const [data, setData] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
      console.debug(data);
        try {
            const response = await fetch('api/password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const Data = await response.json();
            console.debug(Data)
            if(response.ok && data.name === Data) {
                console.log('POST request successful');
                alert('이메일로 임시 비밀번호를 전송하였습니다.')
            } else if (Data === null || !Data.name) {
                console.error('POST request failed');
                alert('정확한 이름과 이메일을 입력하세요.')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    return  <main className='flex min-h-screen flex-col items-center space-y-10 p-24'>
        <Top/>
        <h1 className='text-4xl font-semibold'>비밀번호 찾기</h1>
        <label>사용자 이름과 이메일 주소를 입력해주세요. </label>
        <form onSubmit={handleSubmit}>
            <div style={{padding: "10px"}}>
                <label
                    htmlFor='name'
                    className='block text-sm text-gray-800 dark:text-gray-200'
                >
                    Name
                </label>
                <div className='mt-1'>
                    <input
                        type="name"
                        name="name"
                        placeholder="Name"
                        onChange={handleInputChange}
                        className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
                    />
                </div>
            </div>
            <div style={{padding: "10px"}}>
                <label
                    htmlFor='email'
                    className='block text-sm text-gray-800 dark:text-gray-200'
                >
                    Email
                </label>
                <div className='mt-4'>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleInputChange}
                        className='flex-grow rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
                    />
                </div>
            </div>
            <div style={{padding: "10px"}}>
                <div className='mt-6'>
                    <button
                        type="submit"
                        className='w-full transform rounded-md bg-blue-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
                    >
                        계속하기
                    </button>
                </div>
            </div>
        </form>
    </main>
}

export default PassWordReset;