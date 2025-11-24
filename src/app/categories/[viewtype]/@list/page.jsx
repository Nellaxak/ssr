import styles from "./page.module.css";
import React, { Suspense } from "react";
import statusMap from "../../../statusMap";
import Link from "next/link";

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
    //await Promise.all(arrObjects[0].map(
    const res = await Promise.all(items.map(async (item, index) => {
        return await renderItem(item);
    }))
    return (
        <ul className={styles.row}>
            {res}</ul>)
}

async function Row(props) {
    console.log('Row', props)
    /*<Form action={toggleClick}>
            <input type='number' name='id' defaultValue={props.obj.id} hidden />
            <button type='submit'>{statusMap.get(props.obj.id)}</button>
        </Form>*/
    /*<span>{props.obj.id}</span>
    <span>{props.key}</span>
    <span>{props.obj.absolute_magnitude_h}</span>*/
    const dataViewtype = props.obj.close_approach_data[0].miss_distance
    const status = statusMap.get(props.obj.id)
    const formatData = await DataFormat(dataViewtype, props.viewtype)
    return <Suspense><li className={styles.flex_container}>
        <div className={styles.flex_item}>
            <span className={styles.padding}>{props.dates}</span>
        </div>
        <span>{props.obj.name}</span>
        <span>{props.obj.estimated_diameter.meters.estimated_diameter_min}</span>
        <Suspense>
            <output className={styles.padding}>{formatData}</output>
        </Suspense>
        <div className={styles.flex_item}>
            <Link key={props.obj.id}
                className={styles.buttonItem}
                prefetch={false}
                href={`/categories/${props.viewtype}/click/${props.obj.id}`}
                scroll={false}><Suspense>{String(status)}</Suspense></Link>
            <span>{String(props.obj.is_potentially_hazardous_asteroid)}</span>
        </div>
    </li></Suspense>
}
export default async function Home({ params }) {
    [startDate, endDate] = await CalcData()
    const promiseParams = await params
    const viewtype = promiseParams.viewtype

    //try {
    resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`,
        { next: { tags: ['posts'] } }
    );//revalidate tag change viewtype
    if (Number(resp.status) === 200) {
        const dat = await resp.json()
        const list = dat.near_earth_objects
        const dates = Object.keys(list)
        const arrObjects = Object.values(list)

        return <List items={arrObjects[0]}
            renderItem={async (product) => {
                //console.log('dates', product.close_approach_data[0].epoch_date_close_approach
                const date = new Date(product.close_approach_data[0].epoch_date_close_approach)
                const prevDate = new Intl.DateTimeFormat("ru-RU", options).format(date);
                const datSlice = prevDate.slice(0, -2)
                const dateString = datSlice.replace('.', '');
                //updated status
                if (statusMap.get(product.id) !== 1) {
                    statusMap.set(product.id, 0)
                }
                return <Row
                    key={product.id}
                    obj={product}
                    viewtype={viewtype}
                    dates={dateString}
                />
            }
            }
        />
    }

}