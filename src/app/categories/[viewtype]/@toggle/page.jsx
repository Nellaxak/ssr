import React, { Suspense, memo } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Li from "../../../Li";
//import Path from '@/types/Path'

export default async function Home({ params }) {
    const promiseParams = await params
    const viewtype = promiseParams.viewtype
    await Li.setViewtype(viewtype)
    return (<nav className={styles.labelWrapper} >
        <Link href="/categories/main" scroll={false}
            className={(viewtype === 'main') ? 'km' : 'moon'}>в километрах</Link>
        <span className={styles.space}>|</span>
        <Link href="/categories/moon" scroll={false}
            className={(viewtype === 'main') ? 'moon' : 'km'}>в лунных орбитах</Link>
    </nav>)
}