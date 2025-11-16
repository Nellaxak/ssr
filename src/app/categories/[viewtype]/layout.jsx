//import React,{Suspense} from 'React'
//import SVG from "@/components/SVG/page";
import React, { createElement,Suspense} from "react";

//import Link from "next/link";
import styles from "./page.module.css";
//const inter = Inter({ subsets: ['latin'] })

export default function ParallelLayout({
  children,
  list,
  }/*: {
  children: React.ReactNode,
  count: React.ReactNode,
  list: React.ReactNode
}*/) {
  return (
    <div className={styles.column}>
      <Suspense>{list}</Suspense>
      {children}
    </div>
  )
}