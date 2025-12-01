'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Form from 'next/form'
import toggleClick from '../../app/actions/toggleClick'
//import styles from "./page.module.css";

function ButtonSubmit() {
  const handleClick = useCallback((value) => {
    console.log('click', value)
    //setViewtype(viewtypeChange)
  }, [])
  return <Form action={toggleClick} >
    <input type='text' name='id' value={id} onChange={() => handleClick('input')} hidden></input>
    <button type="submit" onClick={() => handleClick(1)}>0</button>
  </Form>

}
export default ButtonSubmit