import styles from "./page.module.css";
import Link from "next/link";

//import http from '@/utils/http'

/*export interface Count {
  count: number;
}*/
async function Page( {params} ) {
  //await http<Count>('http://localhost:3456/count') as Count;
  const paramsPromise = await params
  const viewtype = paramsPromise.viewtype
  //console.log('paramsPromise',paramsPromise)
  return 'fggggggg'/*(viewtype !== 'marked') ? <footer className={styles.footer}><span>Корзина</span>
    <output className={styles.padding_count}></output>
    <span>астероида</span>
    <Link href="/categories/marked" scroll={false}
      className={styles.footer}>Отправить</Link></footer>
       : <footer className={styles.footer}>© Все права и планета защищены</footer>*/
}
export default Page