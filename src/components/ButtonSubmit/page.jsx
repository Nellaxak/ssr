'use client'//?

import { useEffect, useState, useCallback, Suspense, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from 'next/form'
import { toggleClick } from '../../app/lib/actions'
import { pagination, mountItemFSM, startFSM, scrollFSMDown, scrollFSMUp } from '../../app/lib/actions'

import OutputItemsSet from '../../app/OutputItemsSet'
//import CountPage from '../../app/CountPage'
//import styles from "./page.module.css";
//intersection observer
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
}
let currentViewtype = ''
let currentPage = 0
let cameraFSM
function ButtonSubmit(props) {
  //console.log('ButtonSubmit props',props)
  const ref = useRef(null)
  const [page, setPage] = useState(0);
  const router = useRouter()
  const searchParams = useSearchParams()
  currentViewtype = searchParams.get('viewtype')
  currentPage = Number(searchParams.get('page'))
  //const callbackFunction = useCallback(async (entries: IntersectionObserverEntry[]) => {
  let item
  const callbackFunction = useCallback(async (entries) => {
    const [entry] = entries;
    //callFSM.trigger("outgoingCall", "Alice");
    if (entry.isIntersecting) {
      //if (props.index === 0) {
      //scrollFSMDown(props.index)
      startFSM(item, props.index)
      console.log('input', item, props.index)
      //}
      //if (currentPage > 0) {
      //pagination(props.index)
      /*if ((props.index + 1) >= props.length) {//scroll down
        setPage((page) => page++)
      }*/
      //} /*else if ((props.index + 1) <= props.length) {//scroll top
      //currentPage = currentPage - 1
      //router.push(`?viewtype=${currentViewtype}&page=${currentPage}`, { scroll: false });
      //}*/
    } else {
      //if (props.index === 0) {
      //cameraFSM.trigger("outgoingCall", "ScrollUp");
      //scrollFSMUp(props.index)
      startFSM(item, props.index)
      console.log('output', item, props.index)
      //}
      /*if (page > 0) {
        OutputItemsSet.add(Number(props.index))
      }*/
      //console.log('output',props.index)
      //currentPage = currentPage + 1
      //router.push(`?viewtype=${currentViewtype}&page=${currentPage}`, { scroll: false });
      //console.log('input button', props)
    }
    //}, 1000)
  }, []);
  /*useEffect(() => {
    router.push(`?viewtype=${currentViewtype}&page=${page}`, { scroll: false });
    router.refresh()
  }, [page])*/
  useEffect(() => {
    const fetch = async () => {
      item = await mountItemFSM(props.index)
      const observer = new IntersectionObserver(callbackFunction, options);
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
    fetch()
  }, [])
  //console.log('ButtonSubmit',props)
  return <Form action={toggleClick} ref={ref}>
    <input type='number' name='id' defaultValue={props.id} hidden></input>
    <button type="submit"><Suspense>444444</Suspense></button>
  </Form>
}
export default ButtonSubmit