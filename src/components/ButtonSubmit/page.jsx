'use client'//?

import { useEffect, useState, useCallback, Suspense, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Form from 'next/form'
import { toggleClick } from '../../app/lib/actions'
import { pagination } from '../../app/lib/actions'

//import styles from "./page.module.css";
//intersection observer
const options = {
  root: null,
  rootMargin: "100px",
  threshold: 1.0,
}
function ButtonSubmit(props) {
  //console.log('ButtonSubmit props',props)
  const ref = useRef(null)
  const [page, setPage] = useState(0);
  const router = useRouter()

  //const callbackFunction = useCallback(async (entries: IntersectionObserverEntry[]) => {

  const callbackFunction = useCallback(async (entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      //console.log('output button', props)
      pagination(props.id)
      //router.push()without page=0
    } else {
      //console.log('input button', props)
    }
  }, []);
  useEffect(() => {
    //socket.emit('addPage')
    const observer = new IntersectionObserver(callbackFunction, options);
    observer.observe(ref.current);
    //mobserver.observe(ref.current, config);
    //socket.on('page', data => {
    //router.refresh()
    //})
    return () => {
      observer.disconnect();
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