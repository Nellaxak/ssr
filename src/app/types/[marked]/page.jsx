//import styles from "./page.module.css";
import Li from '../../Li'

export default async function Home() {//async function {params}
  const resd = await Li.getList('marked')
  return resd
}
