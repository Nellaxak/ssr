import styles from "./page.module.css";
import React, { Suspense } from "react";
import statusMap from "../../statusMap";
import Link from "next/link";
import ItemLayout from "../../layouts/layout";

let resp
let startDate
let endDate
const options = {
    /*era: 'long',*/
    year: 'numeric',
    month: 'short',//long
    day: 'numeric',
    // weekday: 'long',
    timeZone: "UTC",
    //hour12: false,
    /*hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'*/
};
async function DataFormat(param, viewtype) {
    //let resultToggle
    let resultFormat
    if (viewtype === 'main') {
        const roundValue = Math.round(Number(param.kilometers))
        resultFormat = new Intl.NumberFormat("ru", { style: "unit", unit: "kilometer", unitDisplay: "short" }).format(roundValue);
    } else {
        const roundValue = Math.round(Number(param.lunar))
        const resultToggle = new Intl.NumberFormat("ru", { style: "decimal" }).format(roundValue);
        let map = new Map();
        map.set(/0|[5-9]$/, ["ых", ""]);
        map.set(/[2-4]$/, ["ые", "ы"]);
        map.set(/\d?[1][0-9]$/, ["ых", ""]);//10,11-19
        map.set(/\d?[1-9][0]{1,9}$/, ["ых", ""]);//20-90,100-900
        map.set(/[1]$/, ["ая", "а"]);

        const rootMoon = "лунн"
        const rootOrbit = "орбит"
        let fullResult = ''
        map.forEach((value, key) => {
            const result = resultToggle.match(key)
            if (result !== null) {
                fullResult = rootMoon + value[0] + " " + rootOrbit + value[1]
            }
        })
        resultFormat = resultToggle + " " + fullResult
    }
    return resultFormat
    //const ruDiameter = new Intl.NumberFormat("ru", { style: "unit", unit: "meter", unitDisplay: "short" }).format(roundDiameter);
}
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
async function List({ items, renderItem }) {
    const res = await Promise.any(items.map(async (item, index) => {
        return await renderItem(item);
    }))
    //<ul className={styles.row}>
    return (
        <Suspense>{res}
        </Suspense>)
}
async function FormatStatus(params) {
    const status = statusMap.get(params)
    let statusItem = 'ЗАКАЗАТЬ'
    if (status === 0) {
        statusItem = 'ЗАКАЗАТЬ'
    }
    else {
        statusItem = 'В КОРЗИНЕ'
    }
    return statusItem
}
async function Row(props) {
    /*<span>{props.obj.id}</span>
    <span>{props.key}</span>
    <span>{props.obj.absolute_magnitude_h}</span>*/
    const dataViewtype = props.obj.close_approach_data[0].miss_distance
    const status = await FormatStatus(props.obj.id)
    const formatData = await DataFormat(dataViewtype, props.viewtype)
    let Danger = ''
    if (Number(props.obj.is_potentially_hazardous_asteroid) === 1) {
        Danger = 'Опасен'
    }
    return <Suspense>
        <div className={styles.flex_item}>
            <span className={styles.padding}>{props.dates}</span>
        </div>
        <span className={styles.name_link}>{props.obj.name}</span>
        <div className={styles.flex_container_row}>
            <span className={styles.name_link}>Ø</span>
            <span className={styles.name_link}>{Math.round(Number(props.obj.estimated_diameter.meters.estimated_diameter_min))}</span>
        </div>
        <Suspense>
            <output className={styles.padding}>{formatData}</output>
        </Suspense>
        <div className={styles.flex_item}>
            <div className={styles.flex_container_row}>
                <Link key={props.obj.id}
                    className={styles.buttonItem}
                    prefetch={false}
                    href={`/categories/${props.viewtype}/click/${props.obj.id}`}
                    scroll={false}><Suspense>{String(status)}</Suspense></Link>
                <span className={styles.danger}>{Danger}</span>
            </div>
        </div>
    </Suspense>
}
/*async function RenderProp(product){
}*/
export default async function Home({ params }) {
    [startDate, endDate] = await CalcData()
    const promiseParams = await params
    const viewtype = promiseParams.viewtype
    //try {
    resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`,
        { cache: 'force-cache' }
        //{ next: { tags: ['items'] } }
    );//revalidate tag after change viewtype
    //console.log('sss',resp)

    if (Number(resp.status) === 200) {
        const reader = resp.body.getReader(); // Get a reader for the stream
        //let receivedLength = 0; // Track the total bytes received
        let result
        // Loop to read chunks from the stream
        while (true) {
            const { done, value } = await reader.read(); // Read a chunk
            if (done) {
                console.log("Stream finished.");
                break; // Exit the loop when the stream is done
            }
            result = new SharedArrayBuffer(value.byteLength);
            //new TextDecoder().decode(value)
        }
        //console.log('success')
        //const dat = await resp.json()
        //const list = dat.near_earth_objects
        //const arrObjects = Object.values(list)
        console.log('value', result)
        return result/*<List items={arrObjects[0]}
            renderItem={async (product) => {
                const date = new Date(product.close_approach_data[0].epoch_date_close_approach)
                const prevDate = new Intl.DateTimeFormat("ru-RU", options).format(date);
                const datSlice = prevDate.slice(0, -2)
                const dateString = datSlice.replace('.', '');
                if (statusMap.get(product.id) !== 1) {
                    statusMap.set(product.id, 0)
                }
                const dataViewtype = product.close_approach_data[0].miss_distance
                const status = await FormatStatus(product.id)
                const formatData = await DataFormat(dataViewtype, viewtype)*/
        /*let Danger = ''
        if (Number(product.is_potentially_hazardous_asteroid) === 1) {
            Danger = 'Опасен'
        }*/
        /*return <Suspense><Row
            key={product.id}
            obj={product}
            viewtype={viewtype}
            dates={dateString}
        /></Suspense>*/
        //return <ItemLayout children={formatData} />
        /*return formatData
    }
    }
/>*/
    }
    /*}
    catch (err) {
        console.log(err)
    }*/
    /*Home.getLayout = function getLayout(page) {
        return (<li className={styles.flex_container}>
          <Suspense>{toggleViewtype}</Suspense>
          <Suspense>{toggleStatus}</Suspense>
          <div className={styles.flex_item}>
            <span className={styles.padding}>'dates'</span>
          </div>
          <span className={styles.name_link}>'name'</span>
          <div className={styles.flex_container_row}>
            <span className={styles.name_link}>Ø</span>
            <span className={styles.name_link}>'Math.round'
              </span>
          </div>
          <output className={styles.padding}><ItemLayout>{page}</ItemLayout></output>
          <div className={styles.flex_item}>
            <div className={styles.flex_container_row}>
              <Link key={1}
                className={styles.buttonItem}
                prefetch={false}
                href={`/categories/main/click/${1}`}
                scroll={false}><Suspense>0</Suspense></Link>
              <span className={styles.danger}>'Danger'</span>
            </div>
          </div>
        </li>)
    };*/
}