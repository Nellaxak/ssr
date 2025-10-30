import React, { createElement, Suspense } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Li from "../../../Li";
//import ParallelLayout from '../../layouts/layout';

let viewtypePromise
let viewtype1 = 'default'
let res
//let resM = <
export default async function Home({ params }) {
    //console.log('viewtype1111111111111111', params)
    viewtypePromise = await params
    viewtype1 = viewtypePromise.viewtype
    //if (Li.viewtype !== viewtype1) {
    //await Li.setViewtype(viewtype1)//await not work
    //Li.viewtype = viewtype1
    //console.log('sawefv',viewtype1)
    if (viewtype1 === 'main') {
        return (
            <nav className={styles.labelWrapper} >
                <Link href="/categories/main" scroll={false}
                    className={styles.km}>в километрах</Link>
                <span className={styles.space}>|</span>
                <Link href="/categories/moon" scroll={false}
                    className={styles.moon}>в лунных орбитах</Link>
            </nav>
        )
    }
    else {
        return (
            <nav className={styles.labelWrapper} >
                <Link href="/categories/main" scroll={false}
                    className={styles.moon}>в километрах</Link>
                <span className={styles.space}>|</span>
                <Link href="/categories/moon" scroll={false}
                    className={styles.km}>в лунных орбитах</Link>
            </nav>
        )
    }
    //return <Suspense>{res}</Suspense>
}
/*Home.getLayout = function getLayout(page) {
    return <ParallelLayout>{page}</ParallelLayout>;
};*/