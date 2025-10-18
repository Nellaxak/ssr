//import styles from "./page.module.css";
import Li from '../../Li'

export default function Home({params}) {//async function
  //let resd=['sss','dddd']
  const resd = Li.getList('marked')
  console.log('resd',resd)
  return resd
}
