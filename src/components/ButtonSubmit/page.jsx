'use client'
import { useEffect, useCallback, Suspense, useRef } from 'react'
import { toggleClick, mountItem, scrollFSM } from '../../app/lib/actions'
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.0,
}
function ButtonSubmit(props) {
  const ref = useRef(null)

  const handleClick = useCallback(async () => {
    await toggleClick(props.id)
  }, [])
  //const callbackFunction = useCallback(async (entries: IntersectionObserverEntry[]) => {
  const callbackFunction = useCallback(async (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      scrollFSM(props.index, 'input')
    } else {
      scrollFSM(props.index, 'output')
    }
  }, []);
  useEffect(() => {
    console.log('mount', props.index)//page increment -> new mount?
    mountItem(props.index, props.obj)
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