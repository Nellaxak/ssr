import styles from "./page.module.css";
//import http from '@/utils/http'

/*export interface Count {
  count: number;
}*/
let value//:number
async function Page() {
  value = 0//await http<Count>('http://localhost:3456/count') as Count;

  return <output className={styles.padding_count}>{value}</output>
}
export default Page