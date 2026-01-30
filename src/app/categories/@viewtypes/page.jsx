import styles from "./page.module.css";
import React, { Suspense, Activity } from "react";
import Link from "next/link";

export default async function Home({ searchParams }) {
    const search = await searchParams;
    const page = await search.page
    const viewtype = await search.viewtype
    /*<Link href={{
                    pathname: '/categories?viewtype=moon/[page]&[action]&[col]',
                    query: { page: page, action: action, col: col },
                }}*/
    if (viewtype !== 'marked') {
        return <div className={styles.dddd}>
            <header className={styles.header}>
                <h6 className={styles.h6}>
                    Ближайшие подлёты астероидов</h6>
            </header>
            <nav className={styles.labelWrapper}>
                <Link href='/categories?viewtype=main' scroll={false} prefetch={false}
                    className={(viewtype === 'main') ? 'km' : 'moon'}>в километрах</Link>
                <span className={styles.space}>|</span>
                <Link href='/categories?viewtype=moon'
                    scroll={false} prefetch={false}
                    className={(viewtype === 'main') ? 'moon' : 'km'}>в лунных орбитах</Link>
            </nav></div>
    }
    return <h6 className={styles.h6}>Заказ отправлен!</h6>
}

