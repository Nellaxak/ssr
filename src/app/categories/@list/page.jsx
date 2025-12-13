import styles from "./page.module.css";
import React, { Suspense } from "react";
import statusMap from "../../statusMap";
import Link from "next/link";
import Form from "next/form";
import Item from "../../Item";
import { revalidateTag, revalidatePath } from 'next/cache';
import CountPage from "../../CountPage";
import ButtonSubmit from '../../../components/ButtonSubmit/page'
import { toggleClick } from '../../lib/actions'
import linkedList from '../../LinkedList'
import array3 from "../../lib/ArrayGlob";

let resp
let startDate
let endDate
let startPage
//let array3 = []
let res = ''
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
    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate());
    const page = await params.page

    if (Number(page) > 0) {
        const newPage = Number(currentDate.getDate()) + Number(page)
        currentDate.setDate(newPage);//+1
    }
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
    const res = await Promise.all(
        items.map(async (item, index) => {
        //console.log('item_map',item)
        return await renderItem(item);
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
    const dataViewtype = { meters: 0 }//props.obj.close_approach_data[0].miss_distance
    //const status = await FormatStatus(props.obj.id)
    const formatData = await DataFormat(dataViewtype, 'main')//props.viewtype)
    let Danger = ''
    // if (Number(props.obj.is_potentially_hazardous_asteroid) === 1) {
    Danger = 'Опасен'
    // }
    //conditional item.status render Link
    //<ButtonSubmit action={props.action} />
    //const status1 = statusMap.get(Number(props.obj.id))
    //const item = props.item
    //console.log('item', item)
    //const status2 = await item.getStatus()
    //console.log('djkou', props.obj.id, statusMap.size, status1)
    /*<span className={styles.name_link}>{
                Math.round(Number(props.obj.estimated_diameter.meters.estimated_diameter_min))}
                </span>*/
    return <Suspense>
        <li key={props.obj.id}>
            <div className={styles.flex_item}>
                <span className={styles.padding}>{props.dates}</span>
            </div>
            <span className={styles.name_link}>{props.obj.name}</span>
            <div className={styles.flex_container_row}>
                <span className={styles.name_link}>Ø</span>
                <span className={styles.name_link}>{
                    Math.round(Number(props.obj.estimated_diameter))}
                </span>
            </div>
            <Suspense>
                <output className={styles.padding}>{formatData}</output>
            </Suspense>
            <ButtonSubmit id={props.obj.id} name={props.obj.name} />
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
    const search = await searchParams;
    //console.log('searchParams', search)
    let [startDate, endDate] = await CalcData(search)
    //console.log('page ssr', await search.page)
    //console.log('date', startDate, endDate)
    const viewtype = await search.viewtype
    const page = await search.page
    //const output = await search.output
    //console.log('output', output)
    //try {
    resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&page=${page}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`,
        { cache: 'force-cache' },
        { next: { tags: ['items'] } }
    );
    if (Number(resp.status) === 200) {
        //const arrayBuffer = await resp.arrayBuffer();
        const dat = await resp.json()
        const list = dat.near_earth_objects
        const arrObjects = Object.values(list)
        //console.log('list',arrObjects[0])
        /*if (output === undefined) {
            console.log('ll appends')
            await linkedList.fromArray(arrObjects[0])
        }*/
        //array3 = array3.concat(arrObjects[0]);
        array3=arrObjects[0]
        //const list1 = await linkedList.toArray()
        return <List items={array3}
            renderItem={async (product) => {
                /*const date = new Date(product.close_approach_data[0].epoch_date_close_approach)
                const prevDate = new Intl.DateTimeFormat("ru-RU", options).format(date);
                const datSlice = prevDate.slice(0, -2)
                const dateString = datSlice.replace('.', '');*/
                const dateString = startDate;
                //console.log('exsist', product.id, Boolean(Item.findById(Number(product.id))))
                //if (!Boolean(Item.findById(Number(product.id)))) {
                //const item = new Item(Number(product.id, product))//not concat
                //linkedList.append(item)       //console.log('item1',item)
                //}
                //console.log('renderProp product', product.value)
                return <Suspense><Row
                    key={product.value.id}
                    obj={product.value}
                    viewtype={viewtype}
                    dates={dateString}
                    action={toggleClick}
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