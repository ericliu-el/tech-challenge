// https://v2.chakra-ui.com/getting-started/nextjs-app-guide
'use client';

import { ChakraProvider } from '@chakra-ui/react';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ChakraProvider>{children}</ChakraProvider>
    );
}