//import React,{Suspense} from 'React'
//import SVG from "@/components/SVG/page";
import React, { createElement,Suspense} from "react";

//import Link from "next/link";
import styles from "./page.module.css";
//const inter = Inter({ subsets: ['latin'] })

export default async function ParallelLayout({
  children,params,
  list//,toggle,
  }/*: {
  children: React.ReactNode,
  count: React.ReactNode,
  list: React.ReactNode
}*/) {
  const paramsPromise = await params
  const viewtype = paramsPromise.viewtype
  console.log('layout viewtype',viewtype)
  //<Suspense>{toggle}</Suspense>
  return (
    <div className={styles.column}>
      <Suspense>{list}</Suspense>
      {children}
    </div>
  )
}