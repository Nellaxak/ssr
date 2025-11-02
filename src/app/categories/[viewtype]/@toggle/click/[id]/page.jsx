//import Image from "next/image";
//import styles from "./page.module.css";
import Li from '../../../../../../app/Li'
//import ToggleComponent from '../../../../../../../../components/Toggle/page'
//import ParallelLayout from '../../../../layouts/layout';

export default async function Home({ params }) {// 
  //console.log('sssaaa', process.env)
  let resd
  try {
    const paramsPromise = await params
    const viewtype = paramsPromise.viewtype
    //console.log('page list item status interceptor', paramsPromise)
    //const items = await http<Item[]>(`http://localhost:3456/${viewtype}`) as Item[];
    const find = await Li.findById(paramsPromise.id)
    //const oldStatus = find.status
    //get status from url
    //if (Li.viewtype === viewtype) {
    await find.setStatus()//paramsPromise.value)
    //}
    //add toggle, then
    resd = await Li.getList(viewtype)
  } catch (err) { console.log('err', err) }
  //console.log('resd',resd)
  return (
  <div>
    {resd}
  </div>)
}
/*Home.getLayout = function getLayout(page) {
    return <ParallelLayout>{page}</ParallelLayout>;
};*/