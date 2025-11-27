//import React,{Suspense} from 'React'
//import SVG from "@/components/SVG/page";
import React, { createElement, Suspense } from "react";

import Link from "next/link";
import styles from "./page.module.css";
//const inter = Inter({ subsets: ['latin'] })

export default async function ParallelLayout({
  children, //params,
  list,//toggle//count,
}/*: {
  children: React.ReactNode,
  count: React.ReactNode,
  list: React.ReactNode
}*/) {
  /*const paramsPromise = await params
  const viewtype = paramsPromise.viewtype*/
  return (
    <Suspense>
      <Suspense>{list}</Suspense>
      <Suspense><ul className={styles.row}>
        <li className={styles.flex_container}><Suspense>{children}</Suspense></li></ul></Suspense>
    </Suspense>
  )
}