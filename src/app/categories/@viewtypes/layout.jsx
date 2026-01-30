import React, { Suspense } from 'react';
import Link from 'next/link';
import styles from "./page.module.css";

//const inter = Inter({ subsets: ['latin'] })
export default async function Layout({
    children,
}/*: {
  children: React.ReactNode,
}*/) {
       // <header className={styles.header}>
    return (<Suspense>{children}</Suspense>)
}