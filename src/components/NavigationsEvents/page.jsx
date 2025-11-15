'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Form from 'next/form'
import { toggleClick } from '../../app/actions/toggleClick'
import styles from "./page.module.css";

export function NavigationEvents() {
  const [viewtype, setViewtype] = useState('main');
  const router = useRouter()
  const params = useParams()
  const handlePopState = useCallback(() => {
    setViewtype(params)
  }, []);
  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  useEffect(() => {
    router.push(`/categories/${viewtype}`, { scroll: false });
    router.refresh()
  }, [viewtype])
  const handleClick = useCallback((viewtypeChange) => {
    setViewtype(viewtypeChange)
  }, [])
  return <main className={styles.main}>
    <header className={styles.header}>
      <h6 className={styles.h6}>{(viewtype === 'marked') ? 'Заказ отправлен!' : 'Ближайшие подлёты астероидов'}
      </h6>
    </header>
    <Form action={toggleClick} className={styles.labelWrapper} >
      <input type='text' name='viewtype' value={viewtype} onChange={() => handleClick('input')} hidden></input>
      {(viewtype !== 'marked') ? (<div>
        <button type="submit" onClick={() => handleClick('main')}>в километрах</button>
        <span>|</span>
        <button type="submit"
          onClick={() => handleClick('moon')}>
          в лунных орбитах</button>
        <footer className={styles.footer}>
          <div className={styles.columnFooter}>
            <span className={styles.h3}>Корзина</span>
            <span className={styles.aster}>астероида</span>
          </div>
          <button type="submit" className={styles.button}
            onClick={() => handleClick('marked')}>
                <span className={styles.padding}>Отправить</span></button>
        </footer>
      </div>)
        : (<footer className={styles.footer1}>© Все права и планета защищены</footer>)
      }
    </Form>
  </main>
}