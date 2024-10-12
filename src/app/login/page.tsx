'use client';

import { Flex, Center } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import LoginForm from '@/app/components/LoginForm';

export default function Login() {
    const router = useRouter();

    return (
        <Flex width='100vw' height='100vh' alignContent='center' justifyContent='center'>
            <Center>
                <LoginForm onLogin={() => router.push('/info-page')} />
            </Center>
        </Flex >
    )
}