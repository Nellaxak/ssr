//import React from 'React'
//import SVG from "@/components/SVG/page";
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
  //<Toggle path={props.path} />
  return (
    <div>
      <div className={styles.column}>
        <header className={styles.header}>
          <span className={styles.h6}>
            Ближайшие подлёты астероидов
          </span>
        </header>
        <nav className={styles.labelWrapper} >
          <Link href="/categories/main"
            className={styles.km}>в километрах</Link>
          <span className={styles.space}>|</span>
          <Link href="/categories/moon"
            className={styles.moon}>в лунных орбитах</Link>
        </nav>
      </div>
      <div className={styles.wrapLayout}>
        {children}
        <ul className={styles.wrapRowRight}>
          {list}
        </ul>
        {count}
      </div>
    </div>
  )
}