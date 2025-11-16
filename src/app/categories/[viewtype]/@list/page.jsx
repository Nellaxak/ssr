import Li from "../../../Li";
import Link from "next/link";
import styles from "./page.module.css";

let resp
let startDate
let endDate
let resf
async function CalcData() {
    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate());//+1
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate());//+1
    //console.log('myDate', currentDate, endNext)
    let startDate = currentDate.getFullYear() + '-' +
        (currentDate.getMonth() + 1) + '-' +
        currentDate.getDate();
    let endDate = tomorrow.getFullYear() + '-' +
        (tomorrow.getMonth() + 1) + '-' +
        tomorrow.getDate();
    //console.log('return data', startDate, endDate)
    return new Promise((resolve) => {
        resolve([startDate, endDate])
    })
    //return { startDate, endDate }
}
function* getLangs(viewtype) {
    yield Li.setViewtype(viewtype);
    return Li.getList(viewtype);
    //yield 'rust';
}
export default async function Home({ params }) {
    [startDate, endDate] = await CalcData()
    //console.log('cdfg',startDate, endDate)
    const promiseParams = await params
    const viewtype = promiseParams.viewtype
    //await Li.setViewtype(viewtype)
    const generator = getLangs(viewtype)
    console.log('step1',generator.next())
    const size = await Li.getSize()
    //promiseParams.params.then(async (data) => {
    if (viewtype === 'main' && size === 0) {
        try {
            resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`
            );//revalidate tag
            if (Number(resp.status) === 200) {
                const dat = await resp.json()
                const list = dat.near_earth_objects
                const dates = Object.keys(list)
                const arrObjects = Object.values(list)
                await Promise.all(arrObjects[0].map(
                    async (e) => {
                        //Object.setPrototypeOf(e, li);
                        console.log('ffffffw', e)
                        new Li(e, dates[0])
                    }
                ));
                //Object.setPrototypeOf(arrObjects, parent);
                //console.log('zzzzzxxxxx', arrObjects.getCount())
                //console.log('ffffffwget', Object.getPrototypeOf(arrObjects))
            } else {
                //console.log('NASA API error fetch status', resp.status)
            }
        } catch (err) {
            //console.log('NASA API error fetch status###########', err)
        }
        //return data.viewtype
    }
    //}).then(async (data) => {
    //Li.viewtype=viewtype
    //return data
    // }).then(async (data) => {
    resf = generator.next()//await Li.getList(viewtype)
    //return resf
    //})
    console.log('ggggzzz', size)
    //const resf = await Li.getList(viewtype)
    return <main>
        {(viewtype !== 'marked') ? <div><h6 className={styles.h6}>Ближайшие подлёты астероидов</h6>
            <nav>
                <Link href="/categories/main" scroll={false}
                    className={(viewtype === 'main') ? 'km' : 'moon'}>в километрах</Link>
                <span className={styles.space}>|</span>
                <Link href="/categories/moon" scroll={false}
                    className={(viewtype === 'main') ? 'moon' : 'km'}>в лунных орбитах</Link>
            </nav></div> : <h6 className={styles.h6}>Заказ отправлен!</h6>}
        <ul>{resf}</ul>
    </main>
}