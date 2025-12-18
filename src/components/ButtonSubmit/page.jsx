'use client'//?

import { useEffect, useState, useCallback, Suspense, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from 'next/form'
import { toggleClick, pagination, mountItemFSM, startFSM, scrollFSMDown, scrollFSMUp, scrollFSM } from '../../app/lib/actions'

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
  const [page, setPage] = useState(null);
  const router = useRouter()
  const searchParams = useSearchParams()
  currentViewtype = searchParams.get('viewtype')
  currentPage = Number(searchParams.get('page'))

  const handleClick = useCallback(async () => {
    await toggleClick(props.id)
  }, [])
  //const callbackFunction = useCallback(async (entries: IntersectionObserverEntry[]) => {

  const callbackFunction = useCallback(async (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      if ((props.index + 1) === props.length) {
        setPage((page) => {
          const newPage = page + 1
          return newPage
        })
      }
      scrollFSM(props.index, 'input')
    } else {
      scrollFSM(props.index, 'output')
    }
  }, []);
  useEffect(() => {
    router.push(`?viewtype=${currentViewtype}&page=${page}`, { scroll: false });
    router.refresh()
  }, [page])
  useEffect(() => {
    console.log('mount', props.index)//page increment -> new mount?
    mountItemFSM(props.index)
    const observer = new IntersectionObserver(callbackFunction, options);
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [])
  //onClick={()=>handleClick()}
  return <button type="button" ref={ref} onClick={handleClick}><Suspense>444444</Suspense></button>
  /*<Form action={toggleClick} ref={ref}>
   <input type='number' name='id' defaultValue={props.id} hidden></input>*/
  //</Form>
}
export default ButtonSubmit