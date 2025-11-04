'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Form from 'next/form'
import { toggleClick } from '../../app/actions/toggleClick'
import styles from "./page.module.css";

export function NavigationEvents() {
  const [viewtype, setViewtype] = useState('main');
  const router = useRouter()
  useEffect(() => {
    router.push(`/categories/${viewtype}`);
    router.refresh()
  }, [viewtype])
  const handleClick = useCallback((viewtypeChange) => {
    setViewtype(viewtypeChange)
  }, [])
  return <Form action={toggleClick} className={styles.labelWrapper} >
    <input type='text' name='viewtype' value={viewtype} onChange={() => handleClick('input')} hidden></input>
    <button type="submit" className={(viewtype === 'main') ? 'km' : 'moon'}
      onClick={() => handleClick('main')}>в километрах</button>
    <span className={'space'}>|</span>
    <button type="submit" className={(viewtype === 'main') ? 'moon' : 'km'}
      onClick={() => handleClick('moon')}>
      в лунных орбитах</button>
  </Form>
}