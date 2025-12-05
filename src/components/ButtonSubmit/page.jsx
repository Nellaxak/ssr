'use client'//?

import { useEffect, useState, useCallback,Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Form from 'next/form'
import toggleClick from '../../app/actions/toggleClick1'
//import styles from "./page.module.css";
//intersection observer
function ButtonSubmit(props) {
  //console.log('ButtonSubmit',props)
  return  <Form action={toggleClick} >
    <input type='number' name='id' defaultValue={props.id} hidden></input>
    <button type="submit"><Suspense>444444</Suspense></button>
  </Form>
}
export default ButtonSubmit