import styles from "./page.module.css";
import React, { Suspense, Activity } from "react";
import statusMap from "../../statusMap";
import { revalidateTag, revalidatePath } from 'next/cache';
import ButtonSubmit from '../../../components/ButtonSubmit/page'
import { linkedList } from "../../LinkedList";
//import { createLinkedListInstance } from '../../lib/actions'

let resp
let startDate
let endDate
let startPage
let array3 = []
let res = ''

const ll = await createLinkedListInstance()
//ll.append({name: 'ioooo',id: 1})
//console.log('ll page', ll)

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
async function CalcData(params) {
    //console.log('CalcData', await params)
    //const count = await CountPage.getCount();
    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate());
    const page = await params.page

    /*if (Number(page) > 0) {
        const newPage = Number(currentDate.getDate()) + Number(page)
        currentDate.setDate(newPage);//+1
    }*/
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate());
    //console.log('page**', page)
    if (Number(page) > 0) {
        const newPage = Number(tomorrow.getDate()) + Number(page)
        //console.log('if', tomorrow.getDate())
        tomorrow.setDate(newPage);//+1
    }
    //console.log('myDate', new Intl.DateTimeFormat('ru-RU', optionsDate).format(currentDate))
    let startDate = currentDate.getFullYear() + '-' +
        (currentDate.getMonth() + 1) + '-' +
        currentDate.getDate();
    let endDate = tomorrow.getFullYear() + '-' +
        (tomorrow.getMonth() + 1) + '-' +
        tomorrow.getDate();
    //console.log('return data', startDate, endDate)
    /*return new Promise((resolve) => {
        resolve([startDate, endDate])
    })*/
    return [startDate, endDate]
}

async function List({ items, renderItem }) {
    //console.log('type items', Array.isArray(items), items.length)
    const res = await Promise.all(
        items.map(async (item, index) => {
            //console.log('llpoiyt', item.value)
            return await renderItem(item.value, index);
        }))
    return (
        <Suspense>{res}
        </Suspense>)
}
async function FormatStatus(params) {
    //console.log('FormatStatus', params)
    const status = Number(statusMap.get(Number(params)))
    let statusItem = 'ЗАКАЗАТЬ'
    if (status === 0) {
        statusItem = 'ЗАКАЗАТЬ'
    }
    else {
        statusItem = 'В КОРЗИНЕ'
    }
    //console.log('format return', params, statusItem)
    return statusItem
}
async function Row(props) {
    /*<span>{props.obj.id}</span>
    <span>{props.key}</span>
    <span>{props.obj.absolute_magnitude_h}</span>*/
    //console.log('qwasxz', props)
    const dataViewtype = props.obj.close_approach_data[0].miss_distance
    const status = await FormatStatus(props.obj.id)
    const formatData = await DataFormat(dataViewtype, props.viewtype)
    let Danger = ''
    if (Number(props.obj.is_potentially_hazardous_asteroid) === 1) {
        Danger = 'Опасен'
    }
    //conditional item.status render Link
    //const status1 = statusMap.get(Number(props.obj.id))
    //const item = props.item
    //console.log('item', item)
    //const status2 = await item.getStatus()
    //console.log('djkou', props.obj.id, statusMap.size, status1)
    return <Suspense>
        <li key={props.obj.id}>
            <div className={styles.flex_item}>
                <span className={styles.padding}>{props.dates}</span>
            </div>
            <span className={styles.name_link}>{props.obj.name}</span>
            <div className={styles.flex_container_row}>
                <span className={styles.name_link}>{
                    Math.round(Number(props.obj.estimated_diameter.meters.estimated_diameter_min))}
                </span>
                <span className={styles.name_link}>{
                    Math.round(Number(props.obj.estimated_diameter))}
                </span>
            </div>
            <Suspense>
                <output className={styles.padding}>{formatData}</output>
            </Suspense>
            <ButtonSubmit index={props.index} length={props.length}
                id={props.obj.id} obj={props.obj} status={status}/>
            <div className={styles.flex_item}>
                <div className={styles.flex_container_row}>
                    <span className={styles.danger}>{Danger}</span>
                </div>
            </div>
        </li>
    </Suspense>
}
/*async function RenderProp(product){
}*/
export default async function Home({ searchParams }) {
    //console.log('@list Home')
    const search = await searchParams;
    let [startDate, endDate] = await CalcData(search)
    //try {
    resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`,
        { cache: 'force-cache' },
        { next: { tags: ['items'] } }
    );
    if (Number(resp.status) === 200) {
        const dat = await resp.json()
        const list = dat.near_earth_objects
        const arrObjects = Object.values(list)
        await ll.fromArray(arrObjects[0])
        //array3 = array3.concat(arrObjects[0]);
        //array3 = arrObjects[0];
        array3 = await ll.toArray()
        return <List items={array3}
            renderItem={async (product, index) => {
                //console.log('product', product)
                /*const date = new Date(product.close_approach_data[0].epoch_date_close_approach)
                const prevDate = new Intl.DateTimeFormat("ru-RU", options).format(date);
                const datSlice = prevDate.slice(0, -2)
                const dateString = datSlice.replace('.', '');*/
                const dateString = startDate;
                /*
                viewtype={viewtype}
                */
                return <Suspense><Row
                    key={product.id}
                    obj={product}
                    index={index}
                    length={arrObjects[0].length}
                    dates={dateString}
                /></Suspense>
            }}
        />
        //return sab//String(res)
    } else {
        console.log('resp', resp.status)
    }
    /*}
    catch (err) {
        console.log(err)
    }*/
}