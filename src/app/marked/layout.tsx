import React from 'react';
import styles from "./page.module.css";
//const inter = Inter({ subsets: ['latin'] })

export default function Layout({
  children,
}: {
  children: React.ReactNode,
}) {
   //<footer className={styles.footer}>© Все права и планета защищены</footer>
  return (
    <div className={styles.column}>
      <header className={styles.header}>
        <h6 className={styles.h6}>
          Заказ отправлен!
        </h6>
      </header>
      <ul className={styles.wrapRowRight}>
        {children}
      </ul>
      <footer className={styles.footer}>© Все права и планета защищены</footer>
    </div>
  )
}