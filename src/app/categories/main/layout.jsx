import React, { Suspense } from 'react';
import Link from 'next/link';
import styles from "./page.module.css";

//const inter = Inter({ subsets: ['latin'] })
export default async function Layout({
    children, params
}/*: {
  children: React.ReactNode,
}*/) {
    const promiseParams = await params
    const viewtype = promiseParams.viewtype
    //console.log('asasas',await params)
    /*<header className={styles.header}>
            <h6 className={styles.h6}>
                Ближайшие подлёты астероидов
            </h6>{children}
        </header>*/
    return (<Suspense>
        <main className={styles.column}>
            {(viewtype !== 'marked') ? <header className={styles.header}>
                <h6 className={styles.h6}>Ближайшие подлёты астероидов</h6>
                <nav className={styles.labelWrapper}>
                    <Link href="/categories/main" scroll={false}
                        className={(viewtype === 'main') ? 'km' : 'moon'}>в километрах</Link>
                    <span className={styles.space}>|</span>
                    <Link href="/categories/main/moon" scroll={false}
                        className={(viewtype === 'main') ? 'moon' : 'km'}>в лунных орбитах</Link>
                </nav></header> :
                <h6 className={styles.h6}>Заказ отправлен!</h6>}
        </main>
        {children}</Suspense>)
}