//import React,{Suspense} from 'React'
//import SVG from "@/components/SVG/page";
import React, { createElement, Suspense } from "react";

import Link from "next/link";
import styles from "./page.module.css";
//const inter = Inter({ subsets: ['latin'] })

export default async function ItemLayout({
  children, params,
  toggleViewtype,
  toggleStatus,
}/*: {
  children: React.ReactNode,
  count: React.ReactNode,
  list: React.ReactNode
}*/) {
  console.log('ItemLayout',children)
  //const paramsPromise = await params
  //const viewtype = paramsPromise.viewtype
  //{Math.round(Number(product.estimated_diameter.meters.estimated_diameter_min))}
  return (
    <Suspense>
      {children}
    </Suspense>
  )
}