//import React from 'React'
//import SVG from "@/components/SVG/page";
import Link from "next/link";
import styles from "./page.module.css";
//const inter = Inter({ subsets: ['latin'] })

export default async function ParallelLayout({
  children,
  //count,
  //list,
}/*: {
  children: React.ReactNode,
  count: React.ReactNode,
  list: React.ReactNode
}*/) {
  return (
    <div className={styles.column}>
      <header className={styles.header}>
        <h6 className={styles.h6}>
          Ближайшие подлёты астероидовrrrrrrrrrrrrrrr
        </h6>
      </header>
    </div>
  )
}