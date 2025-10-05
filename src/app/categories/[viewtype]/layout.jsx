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

  return (
    <div className={styles.column}>
      <header className={styles.header}>
        <textarea className={styles.h6}>
          Ближайшие подлёты астероидов
        </textarea>
      </header>
      <nav className={styles.labelWrapper} >
        <Link href="/categories/main"
          className={styles.km}>в километрах</Link>
        <span className={styles.space}>|</span>
        <Link href="/categories/moon"
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