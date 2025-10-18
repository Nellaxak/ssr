import styles from "./page.module.css";
import Li from '../Li'

export default async function Home() {
  //let resd=[]
  const resd = await Li.getList('marked')
  console.log('resd',resd)
  return resd
}
