'use client'//?

import { useEffect, useState, useCallback, Suspense, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from 'next/form'
import { toggleClick } from '../../app/lib/actions'
import { pagination, mountItemFSM, startFSM, scrollFSMDown, scrollFSMUp, scrollFSM } from '../../app/lib/actions'

import OutputItemsSet from '../../app/OutputItemsSet'
//import CountPage from '../../app/CountPage'
//import styles from "./page.module.css";
//intersection observer
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.0,
}
let currentViewtype = ''
let currentPage = 0
function ButtonSubmit(props) {
  //console.log('ButtonSubmit props',props)
  const ref = useRef(null)
  const [instanceFSM, setInstanceFSM] = useState(null);
  const router = useRouter()
  const searchParams = useSearchParams()
  currentViewtype = searchParams.get('viewtype')
  currentPage = Number(searchParams.get('page'))
  //const callbackFunction = useCallback(async (entries: IntersectionObserverEntry[]) => {
  let item
  const callbackFunction = useCallback(async (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      scrollFSM(props.index, 'input')
    } else {
      scrollFSM(props.index, 'output')
    }
  }, []);
  /*useEffect(() => {
    router.push(`?viewtype=${currentViewtype}&page=${page}`, { scroll: false });
    router.refresh()
  }, [page])*/
  useEffect(() => {
    console.log('mount',props.index)
    mountItemFSM(props.index)
    const observer = new IntersectionObserver(callbackFunction, options);
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [])
  return <Form action={toggleClick} ref={ref}>
    <input type='number' name='id' defaultValue={props.id} hidden></input>
    <button type="submit"><Suspense>444444</Suspense></button>
  </Form>
}
export default ButtonSubmit