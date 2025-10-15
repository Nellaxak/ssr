import Link from "next/link";
import styles from "./page.module.css";

export default async function Home({ params }) {
    const viewtypePromise = await params
    const viewtype = viewtypePromise.viewtype
    if (viewtype === 'main') {
        return <nav className={styles.labelWrapper} >
            <Link href="/categories/main"
                className={styles.km} scroll={false}>в километрах</Link>
            <span className={styles.space}>|</span>
            <Link href="/categories/moon"
                className={styles.moon} scroll={false}>в лунных орбитах</Link>
        </nav>
    } else {
        return <nav className={styles.labelWrapper} >
            <Link href="/categories/main" scroll={false}
                className={styles.moon}>в километрах</Link>
            <span className={styles.space}>|</span>
            <Link href="/categories/moon" scroll={false}
                className={styles.km}>в лунных орбитах</Link>
        </nav>
    }

}