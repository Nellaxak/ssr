//import React from 'React'
//import SVG from "@/components/SVG/page";
import Link from "next/link";
import styles from "./page.module.css";
//const inter = Inter({ subsets: ['latin'] })

export default function ParallelLayout({
  children,
  count,
  list,
}/*: {
  children: React.ReactNode,
  count: React.ReactNode,
  list: React.ReactNode
}*/) {
  //<SVG />
  //   <div className={styles.wrapLayout}>
  //  <textarea className={styles.h6}>
  return (
    <div className={styles.column}>
      <header className={styles.header}>
        <h6 className={styles.h6}>
          Ближайшие подлёты астероидов
        </h6>
      </header>
      <nav className={styles.labelWrapper} >
        <Link href="/main"
          className={styles.km}>в километрах</Link>
        <span className={styles.space}>|</span>
        <Link href="/moon"
          className={styles.moon}>в лунных орбитах</Link>
      </nav>
      {children}
      <ul className={styles.wrapRowRight}>
        {list}
      </ul>
      {count}
    </div>
  )
}