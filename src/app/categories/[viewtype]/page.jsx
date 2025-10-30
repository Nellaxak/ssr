import Link from "next/link";
import styles from "./page.module.css";
import Li from "../../Li";
//import ParallelLayout from '../../layouts/layout';

let viewtypePromise
let viewtype1
let res = <nav className={styles.labelWrapper} >
    <Link href="/categories/main"
        className={styles.km} scroll={false}>в километрах</Link>
    <span className={styles.space}>|</span>
    <Link href="/categories/moon"
        className={styles.moon} scroll={false}>в лунных орбитах</Link>
</nav>
let resM = <nav className={styles.labelWrapper} >
    <Link href="/categories/main" scroll={false}
        className={styles.moon}>в километрах</Link>
    <span className={styles.space}>|</span>
    <Link href="/categories/moon" scroll={false}
        className={styles.km}>в лунных орбитах</Link>
</nav>
export default async function Home({ params }) {
    viewtypePromise = await params
    viewtype1 = viewtypePromise.viewtype
    //console.log('viewtype', viewtype1)
    //if (Li.viewtype !== viewtype1) {
    //Li.initializeData(viewtype1)//await not work
    Li.viewtype = viewtype1
    //}
    switch (viewtype1) {
        //case 'main':  
        case 'moon':
            res = resM
            break;
        default: 'default'
    }
    return res
}
/*Home.getLayout = function getLayout(page) {
    return <ParallelLayout>{page}</ParallelLayout>;
};*/