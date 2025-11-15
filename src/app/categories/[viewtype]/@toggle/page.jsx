import styles from "./page.module.css";
import Link from "next/link";
//import http from '@/utils/http'

/*export interface Count {
  count: number;
}*/
//let value//:number
async function Page({ params }) {
  const paramsPromise = await params
  const viewtype = paramsPromise.viewtype
  return <main>
    {(viewtype !== 'marked') ? <h6 className={styles.h6}>Ближайшие подлёты астероидов</h6> :
      <h6 className={styles.h6}>Заказ отправлен!</h6>}
    <nav>
      <Link href="/categories/main" scroll={false}
        className={styles.km}>в километрах</Link>
      <span className={styles.space}>|</span>
      <Link href="/categories/moon" scroll={false}
        className={styles.moon}>в лунных орбитах</Link>
      <Link href="/categories/marked" scroll={false}
        className={styles.footer}>Отправить</Link>
    </nav>
  </main>
}
export default Page