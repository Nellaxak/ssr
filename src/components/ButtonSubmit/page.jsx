'use client'//?

import { useEffect, useState, useCallback, Suspense, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from 'next/form'
import { toggleClick } from '../../app/lib/actions'
import { pagination } from '../../app/lib/actions'
import OutputItemsSet from '../../app/OutputItemsSet'
//import CountPage from '../../app/CountPage'
//import styles from "./page.module.css";
//intersection observer
const options = {
  root: null,
  rootMargin: "100px",
  threshold: 1.0,
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
  currentPage = Number(searchParams.get('page'))
  //const callbackFunction = useCallback(async (entries: IntersectionObserverEntry[]) => {

  const callbackFunction = useCallback(async (entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      if (currentPage > 0) {
        OutputItemsSet.add(Number(props.index))
      }
      //console.log('input',props.index)
      //if (currentPage > 0) {
      //pagination(props.index)
      //if ((props.index + 1) >= props.length) {//scroll down
      //currentPage = currentPage + 1
      //router.push(`?viewtype=${currentViewtype}&page=${currentPage}`, { scroll: false });
      //}
      //} /*else if ((props.index + 1) <= props.length) {//scroll top
      //currentPage = currentPage - 1
      //router.push(`?viewtype=${currentViewtype}&page=${currentPage}`, { scroll: false });
      //}*/
    } else {
      //console.log('output',props.index)
      //currentPage = currentPage + 1
      //router.push(`?viewtype=${currentViewtype}&page=${currentPage}`, { scroll: false });
      //console.log('input button', props)
    }
  }, []);
  const handleScroll = useCallback(async () => {
    const elem = ref.current;//document.querySelector('#header')
    //const rect = elem.getBoundingClientRect()
    //console.log('rect', props.index, rect)
    /*const hh = rect.height
    //console.log('scrollend', rect, vertical, rect.y < vertical)
    let item = Math.abs(rect.y - vertical)
    //console.log('abs', item, hh)
    const col = Math.round(Math.abs((item - hh) / hh))
    if (rect.y < vertical) {
        router.push(`?action=down&col=${col}`, { scroll: false });
    } else {
        router.push(`?action=up&col=${col}`, { scroll: false });
    }
    vertical = rect.y*/
  }, [])
  useEffect(() => {
    //socket.emit('addPage')
    const observer = new IntersectionObserver(callbackFunction, options);
    observer.observe(ref.current);
    //document.addEventListener('scrollend', handleScroll)

    //mobserver.observe(ref.current, config);
    //socket.on('page', data => {
    //router.refresh()
    //})
    return () => {
      observer.disconnect();
      //document.removeEventListener('scrollend', handleScroll)

      //socket.off('page')
    };

  }, [])
  //console.log('ButtonSubmit',props)
  return <Form action={toggleClick} ref={ref}>
    <input type='number' name='id' defaultValue={props.id} hidden></input>
    <button type="submit"><Suspense>444444</Suspense></button>
  </Form>
}
export default ButtonSubmit