//import React from 'React'
//import SVG from "@/components/SVG/page";
import React, { createElement,Suspense} from "react";
import Link from "next/link";
import styles from "./page.module.css";
//import ToggleComponent from '../../../../components/Toggle/page'

//const inter = Inter({ subsets: ['latin'] })

export default function ParallelLayout({
  children,
}/*: {
  children: React.ReactNode,
  count: React.ReactNode,
  list: React.ReactNode
}*/) {
  return <Suspense>{children}</Suspense>
}