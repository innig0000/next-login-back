'use client'
import React, {useEffect, useState} from "react";
import Top from '../components/Top';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Button} from "react-bootstrap";

function NewUser() {
    const [data, setData] = useState({
        email: "",
        name: "",
        password: "",
    });
    const [isEmailTaken, setIsEmailTaken] = useState(false);
    const [emailChecked, setEmailChecked] = useState(false);
    const [emailTrueChecked, setEmailTrueChecked] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (showAlert) {
            document.body.classList.add('show-alert');
        } else {
            document.body.classList.remove('show-alert');
        }
    },[showAlert]);

    const showAlertWithText = (text) => {
        setAlertText(text);
        setShowAlert(true);
    }

    setTimeout(() => setShowAlert(false), 5000);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        if (!isEmailTaken && emailChecked && data.name && data.password) {
                const response = await fetch('/api/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    console.log('POST request successful');
                    showAlertWithText("계정이 성공적으로 생성되었습니다!")
                }
        } else if (!data.name) {
                console.error('POST request failed');
            showAlertWithText("사용자 이름을 작성해 주세요.")
        } else if (isEmailTaken || !emailChecked) {
            console.error('POST request failed');
            showAlertWithText("이메일 중복을 체크해 주세요.")
        } else if (!data.password) {
            console.error('POST request failed');
            showAlertWithText("비밀번호를 입력해주세요")
        } else {
            console.error('POST request failed');
            showAlertWithText("계정 생성에 실패했습니다.")
        }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCheckEmail = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isMailTrue = emailRegex.test(data.email);
        if (!isMailTrue) {
            showAlertWithText("올바른 이메일 주소를 입력하세요.")
            setEmailTrueChecked(false);
        } else {
            setEmailTrueChecked(true);
        }

        try {
            const response = await fetch('/api/check-email',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const checkData = await response.json();
            setIsEmailTaken(checkData.isEmailTaken);
            setEmailChecked(true);
        } catch (error) {
            console.error('Error checking email:', error);
        }
    };

    return (
        <main className='flex min-h-screen flex-col items-center space-y-10 p-24'>
            <Top/>
            {showAlert && (
                <Alert
                    variant="warning"
                    dismissible
                    className="slide-down-alert"
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '200px',
                        zIndex: 9999,
                    }}
                >
                    <Alert.Heading>알림</Alert.Heading>
                    <p>{alertText}</p>
                </Alert>
            )}
            <h1 className='text-4xl font-semibold text-white'>회원 가입</h1>
        <form onSubmit={handleSubmit}>
            <div style={{padding: "10px"}}>
            <label
                htmlFor='name'
                className='block text-sm text-gray-800 dark:text-gray-200'
            >
                Name
            </label>
            <div className='mt-2'>
            <input
                type="name"
                name="name"
                placeholder="Name"
                onChange={handleInputChange}
                className='mt-2 block w-full rounded-md border bg-grey px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 white:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
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
            <div className='mt-2'>
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                className='flex-grow rounded-md border bg-grey px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 white:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
            />
                <button
                    type="button"
                    onClick={handleCheckEmail}
                    className='ml-2 rounded-md bg-white px-4 py-2 text-black transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
                >
                    중복 체크
                </button>
                {emailChecked && !isEmailTaken && emailTrueChecked && (<p className="text-white ml-2 mt-1">사용 가능한 이메일 입니다.</p>)}
                {emailChecked && isEmailTaken && (<p className="text-black ml-2 mt-1">이미 사용 중인 이메일입니다.</p>)}
            </div>
            </div>
            <div style={{padding: "10px"}}>
            <label
                htmlFor='password'
                className='block text-sm text-gray-800 dark:text-gray-200'
            >
                Password
            </label>
            <div>
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                className='mt-2 block w-full rounded-md border bg-grey px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 white:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
            />
            </div>
            </div>
            <div style={{padding: "10px"}}>
            <div className='mt-6'>
            <Button
                variant="outline-secondary"
                type="submit"
                className='w-full transform rounded-md bg-blue-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
            >
                Submit
            </Button>
            </div>
            </div>
        </form>
        </main>
    );
};

export default NewUser;