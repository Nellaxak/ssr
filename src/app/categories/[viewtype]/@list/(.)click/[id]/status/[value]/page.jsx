//import Image from "next/image";
//import styles from "./page.module.css";
import Li from '../../../../../../../Li'
//import ParallelLayout from '../../../../layouts/layout';

export default async function Home({ params }) {// 
  //console.log('sssaaa', process.env)
  const paramsPromise = await params
  const viewtype = viewtypePromise.viewtype
  //console.log('page list item status interceptor', paramsPromise)
  //const items = await http<Item[]>(`http://localhost:3456/${viewtype}`) as Item[];
  const find = await Li.findById(paramsPromise.id)
  //const oldStatus = find.status
  //get status from url
  // if (Li.viewtype === viewtype) {
  await find.setStatus(viewtype)//paramsPromise.value)
  //}
  const resd = await Li.getList(paramsPromise)//viewtype
  //console.log('resd',resd)
  return resd
}
/*Home.getLayout = function getLayout(page) {
    return <ParallelLayout>{page}</ParallelLayout>;
};*/