import styles from "./page.module.css";
import Link from "next/link";
import statusMap from '../../statusMap'
import Item from '../../Item'
//import http from '@/utils/http'

/*export interface Count {
  count: number;
}*/
async function Page({ searchParams }) {
  //await http<Count>('http://localhost:3456/count') as Count;
  const count = Item.count
  console.log('count', count)
  const paramsPromise = await searchParams
  const viewtype = paramsPromise.viewtype
  //console.log('paramsPromise',paramsPromise)
  return (viewtype !== 'marked') ? <footer className={styles.footer}><span>Корзина</span>
    <output className={styles.padding_count}>{count}</output>
    <span>астероида</span>
    <Link href="/categories?viewtype=marked" scroll={false}
      className={styles.footer}>Отправить</Link></footer> : <footer className={styles.footer}>© Все права и планета защищены</footer>
}
export default Page