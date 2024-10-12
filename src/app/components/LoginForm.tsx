'use client';

import { VStack, Input, Button, Heading, Alert } from '@chakra-ui/react'
import { useState } from 'react';

// Reused when Updating the user's infomation. pass the "onLogin" callback function so that can customize the action after login/updating
// Store the user's info {name, title} to localStorage

export interface IUserInfo {
    name: string;
    title: string;
}

export default function UserInfo({ onLogin = () => { }, storedUserInfo = { name: '', title: '' } }) {
    const [userInfo, setUserInfo] = useState<IUserInfo>(storedUserInfo);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const onSubmit = async () => {
        setIsPending(true);

        const data = await fetch('/api/login', { method: 'POST', cache: 'no-store', body: JSON.stringify(userInfo) });
        const body = await data.json();
        if (data.status === 200) {
            localStorage.setItem('user', JSON.stringify(body.data));
            onLogin();
        } else {
            setError(body.result);
        }
        setIsPending(false);
    }

    return (
        <VStack border='1px' borderColor='#aaa' p={4} spacing={4}>
            <Heading>Welcome</Heading>
            {error && <Alert status='error'>{error}</Alert>}
            <Input placeholder='User Name' value={userInfo.name} onChange={(e) => setUserInfo({ name: e.target.value, title: userInfo.title })} />
            <Input placeholder='Job Title' value={userInfo.title} onChange={(e) => setUserInfo({ title: e.target.value, name: userInfo.name })} />
            <Button colorScheme='blue' isDisabled={!userInfo.name.trim() || !userInfo.title.trim()} isLoading={isPending} onClick={onSubmit}>Confirm</Button>
        </VStack>
    );
}