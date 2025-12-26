'use client'

import { useEffect, useCallback, Suspense, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toggleClick, mountItem, scrollFSM } from '../../app/lib/actions'
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.0,
}
let currentViewtype = ''
let currentPage = 0
function ButtonSubmit(props) {
  const ref = useRef(null)
  const [page, setPage] = useState(0);
  //const [io, setIO] = useState(null);//true-input-load/false-output
  const router = useRouter()
  const searchParams = useSearchParams()
  currentViewtype = searchParams.get('viewtype')
  //currentPage = Number(searchParams.get('page'))

  const handleClick = useCallback(async () => {
    await toggleClick(props.id)
  }, [])
  //const callbackFunction = useCallback(async (entries: IntersectionObserverEntry[]) => {
  const callbackFunction = useCallback(async (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      /*if ((Number(props.index) + 1) === Number(props.length)) {
        setPage((page) => {
          let newPage = page + 1
          return newPage
        })
      }*/
      //setIO(true)//!prev state?
      scrollFSM(props.index, 'input')
    } else {
      //setIO(false)
      scrollFSM(props.index, 'output')
    }
  }, []);
  useEffect(() => {
    router.push(`?viewtype=${currentViewtype}&page=${page}`, { scroll: false });
  }, [page])
  useEffect(() => {
    console.log('mount', props.index)//page increment -> new mount?
    mountItem(props.index, props.obj)
    const observer = new IntersectionObserver(callbackFunction, options);
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [])

  //onClick={()=>handleClick()}
  return <button type="button" ref={ref} onClick={handleClick}><Suspense>{props.status}</Suspense></button>
}
export default ButtonSubmit