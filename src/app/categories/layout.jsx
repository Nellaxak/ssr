import React from 'react';
import styles from "./page.module.css";
import Link from 'next/link';
//import ToggleComponent from '../../components/Toggle/page';
//const inter = Inter({ subsets: ['latin'] })
export default async function Layout({
    children
}/*: {
  children: React.ReactNode,
}*/) {
    return (
            <header className={styles.header}>
                <h6 className={styles.h6}>
                    Ближайшие подлёты астероидов
                </h6>{children}
            </header>
    )
}