'use client'//?

import { useEffect, useState, useCallback, Suspense, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from 'next/form'
import { toggleClick, mountItem } from '../../app/lib/actions'

function ButtonSubmit(props) {
  //console.log('ButtonSubmit props',props)
  const ref = useRef(null)
  /*const [page, setPage] = useState(0);
  //const [io, setIO] = useState(null);//true-input-load/false-output
  const router = useRouter()
  const searchParams = useSearchParams()
  currentViewtype = searchParams.get('viewtype')*/
  //currentPage = Number(searchParams.get('page'))

  const handleClick = useCallback(async () => {
    await toggleClick(props.id)
  }, [])
  useEffect(() => {
    mountItem(props.index, props.obj)
  }, [])

  //onClick={()=>handleClick()}
  return <button type="button" ref={ref} onClick={handleClick}><Suspense>{props.status}</Suspense></button>
  /*<Form action={toggleClick} ref={ref}>
   <input type='number' name='id' defaultValue={props.id} hidden></input>*/
  //</Form>
}
export default ButtonSubmit