//import React from 'React'
//import SVG from "@/components/SVG/page";
import Link from "next/link";
import styles from "./page.module.css";
//const inter = Inter({ subsets: ['latin'] })

export default function ParallelLayout({
  children,
  //count,
  //list,
}/*: {
  children: React.ReactNode,
  count: React.ReactNode,
  list: React.ReactNode
}*/) {
  return (
    <ul className={styles.wrapRowRight}>
      {children}
    </ul>
  )
}