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

  return (
    <div className={styles.wrapLayout}>
      {children}
      <main className={styles.wrapRowRight}>
        {list}
        {count}
      </main>
    </div>
  )
}