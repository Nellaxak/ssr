//import styles from "./page.module.css";
import Li from '../../Li'

export default function Home() {//async function {params}
  const resd = Li.getList('marked')
  return resd
}
