//'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Form from 'next/form'
import toggleClick from '../../app/actions/toggleClick'
//import styles from "./page.module.css";
//тоже renderProp
function ButtonSubmit(props) {
  return  <Form action={toggleClick} >
    <input type='text' name='id' defaultValue={props.id} hidden></input>
    <button type="submit">0</button>
  </Form>
}
export default ButtonSubmit