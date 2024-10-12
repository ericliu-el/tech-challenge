'use client';

import { Wrap, HStack, Button, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm, { IUserInfo } from './LoginForm';

export default function Header() {
    const [userInfo, setUserInfo] = useState<IUserInfo>({ name: '', title: '' });
    const [isPending, setIsPending] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('user');
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
    }, [isOpen])

    const onLogout = async () => {
        setIsPending(true);
        const data = await fetch('/api/logout', { method: 'POST' });
        if (data.status === 200) {
            localStorage.removeItem('user');
            router.push('/login');
        }
        setIsPending(false);
    }

    return (
        <HStack borderBottom='1px' borderColor='#aaa' p={4} spacing={4} flexDirection={'row-reverse'}>
            <Wrap align='center'>
                <Text pr={8}>User Name: {userInfo.name}</Text>
                <Text pr={8}>Job Title: {userInfo.title}</Text>
                <Button size='sm' colorScheme='blue' onClick={onOpen}>Edit</Button>
                <Button size='sm' colorScheme='orange' onClick={onLogout} isDisabled={isPending}>Logout</Button>
            </Wrap>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={10}>
                        <LoginForm onLogin={onClose} storedUserInfo={userInfo} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </HStack>
    );
}