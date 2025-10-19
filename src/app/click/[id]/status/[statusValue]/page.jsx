import Image from "next/image";
import styles from "./page.module.css";
import Li from '../../../../Li'
//import ParallelLayout from '../../../../layouts/layout';


//let data = []
export default async function Home({ params }) {//async function
  //console.log('sssaaa', process.env)
  //const viewtypePromise = await params
  //const viewtype = viewtypePromise.viewtype
  //console.log('page list item status', viewtypePromise)
  //const items = await http<Item[]>(`http://localhost:3456/${viewtype}`) as Item[];
  const resd = ['dddd','sxer']//Li.getList()//viewtype await
  //console.log('resd',resd)
  return resd
}
/*Home.getLayout = function getLayout(page) {
    return <ParallelLayout>{page}</ParallelLayout>;
};*/