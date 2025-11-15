//import React from 'React'
//import SVG from "@/components/SVG/page";
import React, { createElement,Suspense} from "react";

import Link from "next/link";
import styles from "./page.module.css";
//const inter = Inter({ subsets: ['latin'] })

export default function ParallelLayout({
  children,
  list,
  toggle,
}/*: {
  children: React.ReactNode,
  count: React.ReactNode,
  list: React.ReactNode
}*/) {
  return (
    <div className={styles.column}>
      {toggle}
      {list}
      {children}
    </div>
  )
}