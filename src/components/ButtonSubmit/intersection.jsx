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
let callbackFunction
let handleClick
function ButtonSubmit(props) {
  //console.log('ButtonSubmit props',props)
  const ref = useRef(null)
  const [page, setPage] = useState(0);
  const router = useRouter()
  const searchParams = useSearchParams()
  //currentViewtype = searchParams.get('viewtype')
  currentPage = searchParams.get('page')

  //const [mode, setMode] = useState('visible')
  //currentPage = Number(searchParams.get('page'))

  const handleClick = useCallback(async () => {
    await toggleClick(props.id)
  }, [])
  //const callbackFunction = useCallback(async (entries: IntersectionObserverEntry[]) => {
  const callbackFunction = useCallback(async (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      if ((props.index + 1) === props.length) {
        setPage((page) => {
          let newPage = page + 1
          return newPage
        })
        console.log('button input', currentPage, ref.current)//index
      }
    } else {
    }
  }, []);
  useEffect(() => {
    //scrollEnd({ action: startAction, col: startRow })
    /*(async () => {
        // Your async logic here
        //const dataLength1 = await scrollEnd()
        //setDataLength(dataLength1)
        //console.log('dataLength', dataLength)
        // Update state, etc.
    })();*/
    router.push(`?viewtype=${currentViewtype}&page=${page}`, { scroll: false });
    //router.refresh()
    //after scrollintoView(true)
    ref.current.scrollIntoView(true);
    /*const element = document.querySelector('ol');
    scrollElementToCenter(element);*/
  }, [page])
  useEffect(() => {
    //const fetchD = async () => {
    //console.log('mount', props.index)//page increment -> new mount?
    //mountItem(props.index)
    //if (props.index===lastIndex)
    const observer = new IntersectionObserver(callbackFunction, options);
    observer.observe(ref.current);
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
    //}
    //fetchD()
  }, [])
  //onClick={()=>handleClick()}
  return <button type="button" ref={ref} onClick={handleClick}><Suspense>444444</Suspense></button>
}
export default ButtonSubmit