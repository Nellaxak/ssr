'use client'
import { useCallback, Suspense, useEffect, useState, useRef } from 'react'
//import { useRouter, useSearchParams, useParams } from 'next/navigation'
import { toggleClick } from '../../app/lib/actions'

function ButtonSubmit(props) {
  //console.log('ButtonSubmit', props)
  /*const workerRef = useRef(null)
  useEffect(() => {

        workerRef.current = new Worker(new URL("./worker.ts", import.meta.url));

        workerRef.current.onmessage = (event) => console.log(event.data);

        return () => {

            workerRef.current.terminate();

        };

    }, []);*/
  const handleClick = useCallback(async () => {
    await toggleClick(props.id)
    //workerRef.current.postMessage(props.id);
  }, [])
  //onClick={()=>handleClick()}
  return <button type="button" onClick={handleClick}><Suspense>{props.status}</Suspense></button>
}
export default ButtonSubmit