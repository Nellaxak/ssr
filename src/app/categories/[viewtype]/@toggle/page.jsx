import React, { createElement, Suspense } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Li from "../../../Li";
//import http from '@/utils/http'

/*export interface Count {
  count: number;
}*/
async function Page( {params} ) {
  const paramsPromise = await params
  const viewtype = paramsPromise.viewtype
  //console.log('paramsPromise',paramsPromise)
  //await Li.setViewtype(viewtype)
  return <Suspense><main className={styles.column}>
    {(viewtype !== 'marked') ? <div><h6 className={styles.h6}>Ближайшие подлёты астероидов</h6>
      <nav>
        <Link href="/categories/main" scroll={false}
          className={(viewtype === 'main') ? 'km' : 'moon'}>в километрах</Link>
        <span className={styles.space}>|</span>
        <Link href="/categories/moon" scroll={false}
          className={(viewtype === 'main') ? 'moon' : 'km'}>в лунных орбитах</Link>
      </nav></div> :
      <h6 className={styles.h6}>Заказ отправлен!</h6>}
  </main></Suspense>
}
export default Page