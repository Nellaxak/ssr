import React, { Suspense } from 'react';
import Link from 'next/link';
import styles from "./page.module.css";

//const inter = Inter({ subsets: ['latin'] })
export default async function Layout({
    children,
}/*: {
  children: React.ReactNode,
}*/) {
    //const promiseParams = await searchParams;
    //console.log('promiseParams layout', searchParams, promiseParams)
    const viewtype = 'main'//await promiseParams.viewtype
    //const page = await promiseParams.page
    return (<Suspense>
            <ol className={styles.row}>{children}</ol>
        </Suspense>)
}