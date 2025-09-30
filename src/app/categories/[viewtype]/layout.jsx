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

        <Link>в километрах</Link>
        <span>|</span>
        <Link>в лунных орбитах</Link>

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