'use client'
import { useCallback, Suspense, useEffect, useState } from 'react'
//import { useRouter, useSearchParams } from 'next/navigation'
import { toggleClick, getStatus } from '../../app/lib/actions'


function ButtonSubmit(props) {
  const handleClick = useCallback(async () => {
    await toggleClick(props.id)
  }, [])
  //onClick={handleClick}
  //onClick={()=>handleClick()}
  return <button type="button" onClick={() => handleClick()}><Suspense>{props.status}</Suspense></button>
}
export default ButtonSubmit