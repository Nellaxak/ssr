import Li from '../../../../../Li'
import Link from 'next/link'
import styles from "./page.module.css";

export default async function Home({ params }) {
  let resd
  const paramsPromise = await params
  const viewtype = paramsPromise.viewtype
  //await Li.setViewtype(viewtype)
  //console.log('page list item status interceptor', paramsPromise)
  //const items = await http<Item[]>(`http://localhost:3456/${viewtype}`) as Item[];
  const find = await Li.findById(paramsPromise.id)
  console.log('find', find)
  await find.setStatus()
  //Li.viewtype = viewtype
  resd = await Li.getList(viewtype)
  //  <ul>{resd}</ul>
  return <main>
    {(viewtype !== 'marked') ? <div><h6 className={styles.h6}>Ближайшие подлёты астероидов</h6>
      <nav>
        <Link href="/categories/main" scroll={false}
          className={(viewtype === 'main') ? 'km' : 'moon'}>в километрах</Link>
        <span className={styles.space}>|</span>
        <Link href="/categories/moon" scroll={false}
          className={(viewtype === 'main') ? 'moon' : 'km'}>в лунных орбитах</Link>
      </nav></div> : <h6 className={styles.h6}>Заказ отправлен!</h6>}
  </main>
}