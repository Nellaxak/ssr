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
  const paramsPromise = await params
  //const viewtype = paramsPromise.viewtype
  //{Math.round(Number(product.estimated_diameter.meters.estimated_diameter_min))}
  return (
    <Suspense>
      <Suspense>
        <li className={styles.flex_container}>
          <Suspense>{toggleViewtype}</Suspense>
          <Suspense>{toggleStatus}</Suspense>
          <div className={styles.flex_item}>
            <span className={styles.padding}>'dates'</span>
          </div>
          <span className={styles.name_link}>'name'</span>
          <div className={styles.flex_container_row}>
            <span className={styles.name_link}>Ø</span>
            <span className={styles.name_link}>'Math.round'
              </span>
          </div>
          <output className={styles.padding}><Suspense>{children}</Suspense></output>
          <div className={styles.flex_item}>
            <div className={styles.flex_container_row}>
              <Link key={1}
                className={styles.buttonItem}
                prefetch={false}
                href={`/categories/main/click/${1}`}
                scroll={false}><Suspense>0</Suspense></Link>
              <span className={styles.danger}>'Danger'</span>
            </div>
          </div>
        </li>
      </Suspense>
    </Suspense>
  )
}