//import React,{Suspense} from 'React'
//import SVG from "@/components/SVG/page";
import React, { createElement, Suspense } from "react";

import Link from "next/link";
import styles from "./page.module.css";
//const inter = Inter({ subsets: ['latin'] })

export default async function ParallelLayout({
  children, params,
  list,//,toggle,
}/*: {
  children: React.ReactNode,
  count: React.ReactNode,
  list: React.ReactNode
}*/) {
  const paramsPromise = await params
  const viewtype = paramsPromise.viewtype
  //console.log('layout viewtype',viewtype)
  //<Suspense>{toggle}</Suspense>
  return (
    <Suspense>
      <main className={styles.column}>
        {(viewtype !== 'marked') ? <header className={styles.header}>
          <h6 className={styles.h6}>Ближайшие подлёты астероидов</h6>
          <nav  className={styles.labelWrapper}>
            <Link href="/categories/main" scroll={false}
              className={(viewtype === 'main') ? 'km' : 'moon'}>в километрах</Link>
            <span className={styles.space}>|</span>
            <Link href="/categories/moon" scroll={false}
              className={(viewtype === 'main') ? 'moon' : 'km'}>в лунных орбитах</Link>
          </nav></header> :
          <h6 className={styles.h6}>Заказ отправлен!</h6>}
        <Suspense>{list}</Suspense>
        <Suspense>{children}</Suspense>
      </main>
    </Suspense>
  )
}