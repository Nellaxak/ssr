import Link from "next/link";
import styles from "./page.module.css";

export default function Default() {
  return (<nav className={styles.labelWrapper} >
    <Link href="/categories/main" scroll={false}
      className={styles.km}>в километрах</Link>
    <span className={styles.space}>|</span>
    <Link href="/categories/moon" scroll={false}
      className={styles.moon}>в лунных орбитах</Link>
  </nav>)
}