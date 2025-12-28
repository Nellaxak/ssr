'use client'
import { useEffect, useCallback, Suspense, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toggleClick, mountItem, scrollFSM } from '../../app/lib/actions'
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.0,
}
let currentPage
let ref
let searchParams
function ButtonSubmit(props) {
  ref = useRef(null)
  const [page, setPage] = useState(0);
  searchParams = useSearchParams()
  //const [searchParams, setSearchParams] = useSearchParams();
  currentPage = Number(searchParams.get('page'))

  const handleClick = useCallback(async () => {
    await toggleClick(props.id)
  }, [])
  /*useEffect(() => {
    // This code runs whenever the component mounts or the searchParams change
    const currentPage = Number(searchParams.get('page'))
    setPage(currentPage)
    // You can perform side effects here, such as fetching data based on the new params
    // fetchData(sort, category);
  }, [searchParams]);*/
  //useEffect(() => {
  // This might capture a stale 'searchParams' if not handled carefully
  //fetchData(searchParams.get('filter')); 
  //}, [setSearchParams]);
  //const callbackFunction = useCallback(async (entries: IntersectionObserverEntry[]) => {
  const callbackFunction = useCallback(async (entries) => {
    const [entry] = entries;
    //console.log('currentPage', currentPage)
    if (currentPage > 0) {
      if (entry.isIntersecting) {
        scrollFSM(props.index, 'input')
      } else {
        scrollFSM(props.index, 'output')
      }
    }
  }, [currentPage]);
  useEffect(() => {
    console.log('mount', props.index)
    mountItem(props.index, props.obj)//await
    const observer = new IntersectionObserver(callbackFunction, options);
    observer.observe(ref.current);
    return () => {
      //delete fsm instance
      observer.disconnect();
    };
  }, [])

  //onClick={()=>handleClick()}
  return <button type="button" ref={ref} onClick={handleClick}><Suspense>{props.status}</Suspense></button>
}
export default ButtonSubmit