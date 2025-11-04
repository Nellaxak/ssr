//import React from 'React'
//import SVG from "@/components/SVG/page";
import React, { createElement,Suspense} from "react";

import Link from "next/link";
import styles from "./page.module.css";
//const inter = Inter({ subsets: ['latin'] })

export default function ParallelLayout({
  children,
  toggle,
  //count,
}/*: {
  children: React.ReactNode,
  count: React.ReactNode,
  list: React.ReactNode
}*/) {
  /*<ul className={styles.wrapRowRight}>
        <Suspense>{list}</Suspense>
      </ul>*/
  return (
    <div className={styles.column}>
      {toggle}
      {children}
      <footer className={styles.footer}>
        <div className={styles.columnFooter}>
          <span className={styles.h3}>Корзина</span>
          <span className={styles.aster}>астероида</span>
        </div>
        <nav className={styles.rrrr}>
          <Link href="/types/marked" scroll={false}
            className={styles.button}>
            <span className={styles.padding}>Отправить</span>
          </Link>
        </nav>
      </footer>
    </div>
  )
}