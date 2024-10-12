'use client';

import { useRouter } from 'next/navigation';
import { Heading } from '@chakra-ui/react';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();

  setTimeout(() => {
    router.push('/login');
  }, 10000);

  return (
    <div className={styles.page}>
      <Heading>Redirecting to /login page in 10 secs... ...</Heading>
      <div>Welcome to https://leonardo.ai/ tech challenge</div>
      <div>By Peng Liu (nz.pengliu@gmail.com)</div>
    </div>
  );
}
