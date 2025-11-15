import React from 'react';
import styles from "./page.module.css";

//const inter = Inter({ subsets: ['latin'] })
export default async function Layout({
    children,params
}/*: {
  children: React.ReactNode,
}*/) {
    //console.log('asasas',await params)
    /*<header className={styles.header}>
            <h6 className={styles.h6}>
                Ближайшие подлёты астероидов
            </h6>{children}
        </header>*/
    return children
}