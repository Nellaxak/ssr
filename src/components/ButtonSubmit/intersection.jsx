'use client'//?

import { useEffect, useState, useCallback, Suspense, useRef, Activity } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from 'next/form'
import { toggleClick, pagination, mountItem, startFSM, scrollFSMDown, scrollFSMUp, scrollFSM } from '../../app/lib/actions'

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
  const [page, setPage] = useState(0);
  const router = useRouter()
  const searchParams = useSearchParams()
  currentViewtype = searchParams.get('viewtype')
  //const [mode, setMode] = useState('visible')
  //currentPage = Number(searchParams.get('page'))

  const handleClick = useCallback(async () => {
    await toggleClick(props.id)
  }, [])
  //const callbackFunction = useCallback(async (entries: IntersectionObserverEntry[]) => {
  const callbackFunction = useCallback(async (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      console.log('button input',props.index)
      /*if ((Number(props.index) + 1) === Number(props.length)) {
        setPage((page) => {
          let newPage = page + 1
          return newPage
        })
      }*/
      //scrollFSM(props.index, 'input')
    } else {
      //setMode('hidden')
      console.log('button output',props.index)
      //scrollFSM(props.index, 'output')
    }
  }, []);
  useEffect(() => {
    //url col change
    router.push(`?viewtype=${currentViewtype}&page=${page}`, { scroll: false });
  }, [page])
  useEffect(() => {
    const fetchD = async () => {
      //console.log('mount', props.index)//page increment -> new mount?
      await mountItem(props.index)
      const observer = new IntersectionObserver(callbackFunction, options);
      observer.observe(ref.current);
      return () => {
        observer.unobserve(ref.current);
      };
    }
    fetchD()
  }, [])
  //onClick={()=>handleClick()}
  return <button type="button" ref={ref} onClick={handleClick}><Suspense>444444</Suspense></button>
}
export default ButtonSubmit