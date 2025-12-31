'use client'
import { useCallback, Suspense, useEffect, useState, useRef } from 'react'
import { useRouter, useSearchParams, useParams } from 'next/navigation'
import { toggleClick, getStatus } from '../../app/lib/actions'

const options = {
  root: null,
  rootMargin: "100px",
  threshold: 1.0,
}
function ButtonSubmit(props) {
  const [outside, setOutside] = useState(0)
  const ref = useRef(null)
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const currentPage = params.pages
  const currentViewtype = searchParams.get('viewtype')


  const handleClick = useCallback(async () => {
    await toggleClick(props.id)
  }, [])
  const callbackFunction = useCallback(async (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      /*if ((props.index + 1) === props.length) {
        currentPage = currentPage + 1
        router.push(`?viewtype=${currentViewtype}&page=${currentPage}`, { scroll: true });
      }*/
      //router.push(`?viewtype=${currentViewtype}&page=${currentPage}&output=${props.id}`, { scroll: false });//very many rerender
    } else {
      //console.log('input button', props)
      setOutside(0)
    }
  }, []);
  useEffect(() => {
    router.push(`/page/${currentPage}?viewtype=${currentViewtype}&outside=${0}`, { scroll: false });//very many rerender
  }, [outside])

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
  //onClick={handleClick}
  //onClick={()=>handleClick()}
  return <button type="button" onClick={handleClick} ref={ref}><Suspense>{props.status}</Suspense></button>
}
export default ButtonSubmit