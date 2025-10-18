//import styles from "./page.module.css";
import Li from '../Li'

export default async function Home({params}) {
  //let resd=['sss','dddd']
  const resd = await Li.getList('marked')
  console.log('resd',resd)
  return resd
}
