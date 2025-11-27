//import Li from '../../../../../Li'
import Link from 'next/link'
import styles from "./page.module.css";
import statusMap from '../../../../../statusMap'
export default async function Home({ params }) {
  const paramsPromise = await params
  const viewtype = paramsPromise.viewtype
  const id = paramsPromise.id
  const oldStatus = statusMap.get(id)
  statusMap.set(id, !oldStatus)
  return 'sssss;loooo'
}