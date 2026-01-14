import styles from "./page.module.css";
import React, { Suspense, Activity } from "react";
import Link from "next/link";

export default async function Home({ searchParams }) {
    const search = await searchParams;
    const viewtype = await search.viewtype
    if (viewtype !== 'marked') {
        return <header className={styles.header}>
            <nav className={styles.labelWrapper}>
                <Link href='/categories?viewtype=main' scroll={false} prefetch={false}
                    className={(viewtype === 'main') ? 'km' : 'moon'}>в километрах</Link>
                <span className={styles.space}>|</span>
                <Link href="/categories?viewtype=moon" scroll={false} prefetch={false}
                    className={(viewtype === 'main') ? 'moon' : 'km'}>в лунных орбитах</Link>
            </nav></header>
    }
    return <h6 className={styles.h6}>Заказ отправлен!</h6>
}

