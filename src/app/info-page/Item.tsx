'use client';

import { Box, Image, WrapItem, Card, CardBody, CardFooter, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Link } from '@chakra-ui/react';
import type { ICharacter } from './page';

export default function Item({ item }: { item: ICharacter }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <WrapItem key={item.id}>
            <Card width={'14rem'}>
                <CardBody>
                    <Image
                        boxSize='14rem'
                        objectFit='cover'
                        src={item.image.large}
                        alt={item.name.full}
                        fallbackSrc='https://via.placeholder.com/180x220'
                        onClick={onOpen}
                        cursor={'pointer'}
                    />
                </CardBody>
                <CardFooter justify={'space-between'}>
                    <Box>{item.name.full}</Box>
                    <Box>❤️{item.favourites}</Box>
                </CardFooter>
            </Card>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{item.name.full}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {item.description}
                    </ModalBody>
                    <Image src={item.image.large} />
                    <ModalFooter>
                        <Link href={item.siteUrl} isExternal color='blue'>
                            Visit Site
                        </Link>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </WrapItem>
    );
}