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
  return (
    <div className={styles.column}>
      <header className={styles.header}>
        <h6 className={styles.h6}>
          Ближайшие подлёты астероидов
        </h6>
      </header>
      {children}
      <ul className={styles.wrapRowRight}>
        {list}
      </ul>
      <footer className={styles.footer}>
            <div className={styles.columnFooter}>
                <span className={styles.h3}>Корзина</span>
                <span className={styles.aster}>{count}астероида</span>
            </div>
            <nav className={styles.rrrr}>
                <Link href="/marked" scroll={false}
                    className={styles.button}>
                    <span className={styles.padding}>Отправить</span>
                </Link>
            </nav>
        </footer>
    </div>
  )
}