import Image from "next/image";
import styles from "./page.module.css";
import Li from '../Li'

export default async function Home({ params }) {
  const resd = await Li.getList('marked')
  //console.log('resd',resd)
  return resd
}
