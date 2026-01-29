//import React,{Suspense} from 'React'
//import SVG from "@/components/SVG/page";
import React, { createElement, Suspense } from "react";

import Link from "next/link";
import styles from "./page.module.css";
//const inter = Inter({ subsets: ['latin'] })

export default async function ParallelLayout({
  children, viewtypes,
  list,
  count,
}/*: {
  children: React.ReactNode,
  count: React.ReactNode,
  list: React.ReactNode
}*/) {
  //className={styles.toggleViewtype}
  return (
    <Suspense className={styles.subrid}>
      <Suspense className={styles.toggleViewtype}>{viewtypes}</Suspense>
      <Suspense>{list}</Suspense>
      <Suspense className={styles.footer}>{count}</Suspense>
      <Suspense>{children}</Suspense>
    </Suspense>
  )
}