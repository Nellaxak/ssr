'use client'
import { useCallback, Suspense, useEffect, useState, useRef } from 'react'
//import { useRouter, useSearchParams, useParams } from 'next/navigation'
import { toggleClick } from '../../app/lib/actions'

function ButtonSubmit(props) {
  //console.log('ButtonSubmit', props)
  const handleClick = useCallback(async () => {
    await toggleClick(props.id)
  }, [])
  //onClick={()=>handleClick()}
  return <button type="button" onClick={handleClick} ><Suspense>{props.status}</Suspense></button>
}
export default ButtonSubmit