import React, { createElement, Suspense } from "react";
import styles from "./page.module.css";
import Link from "next/link";
//import Li from "../../../Li";
//import http from '@/utils/http'

/*export interface Count {
  count: number;
}*/
async function Page( {params} ) {
  const paramsPromise = await params
  const viewtype = paramsPromise.viewtype
  //console.log('paramsPromise',paramsPromise)
  //await Li.setViewtype(viewtype)
  return  'dddddkiooVVVVV'
}
export default Page