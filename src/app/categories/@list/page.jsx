import styles from "./page.module.css";
import React, { Suspense } from "react";
import statusMap from "../../statusMap";
import Link from "next/link";
import Form from "next/form";
import Item from "../../Item";
import { revalidateTag, revalidatePath } from 'next/cache';
import CountPage from "../../CountPage";
import ButtonSubmit from '../../../components/ButtonSubmit/page'

let resp
let startDate
let endDate
let startPage

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
    console.log('CalcData', await params)

    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate());
    /*if (params !== undefined) {
        currentDate.setDate(currentDate.getDate() + Number(params));//+1
    }*/
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate());
    if (await params.page !== undefined) {
        tomorrow.setDate(tomorrow.getDate() + Number(params));//+1
    }
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
    const res = await Promise.all(items.map(async (item, index) => {
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
    //console.log('qwasxz', props.obj.id, statusMap.get(props.obj.id))
    const dataViewtype = props.obj.close_approach_data[0].miss_distance
    const status = await FormatStatus(props.obj.id)
    const formatData = await DataFormat(dataViewtype, props.viewtype)
    let Danger = ''
    if (Number(props.obj.is_potentially_hazardous_asteroid) === 1) {
        Danger = 'Опасен'
    }
    //conditional item.status render Link
    /*<Link key={props.obj.id}
        className={styles.buttonItem}
        prefetch={false}
        href={`/categories?viewtype=${props.viewtype}&id=${props.obj.id}&status=${Number(!UrlStatus)}`}
        scroll={false}>
        <Suspense>{String(newStatus)}</Suspense>
    </Link>*/
    //<ButtonSubmit action={props.action} />
    const status1 = statusMap.get(Number(props.obj.id))
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
                <span className={styles.name_link}>Ø</span>
                <span className={styles.name_link}>{Math.round(Number(props.obj.estimated_diameter.meters.estimated_diameter_min))}</span>
            </div>
            <Suspense>
                <output className={styles.padding}>{formatData}</output>
            </Suspense>
            <div className={styles.flex_item}>
                <div className={styles.flex_container_row}>
                    <Form action={props.action} >
                        <input type='number' name='id' defaultValue={props.obj.id} hidden></input>
                        <button type="submit"><Suspense>{status}</Suspense>
                        </button>
                    </Form>
                    <span className={styles.danger}>{Danger}</span>
                </div>
            </div>
        </li>
    </Suspense>
}
/*async function RenderProp(product){
}*/
export default async function Home({ searchParams }) {
    async function toggleClick(formData) {
        'use server'
        //console.log('toggleClickPage', formData)
        const id = Number(formData.get('id'))
        //console.log('id type',typeof id)
        const item = await Item.findById(id)
        await item.setStatus()
        //statusMap.set(id, !statusMap.get(id))
        //revalidatePath('/')
        revalidateTag('items')
    }
    const search = await searchParams;
    console.log('searchParams', search)
    [startDate, endDate] = await CalcData(search)
    const viewtype = await search.viewtype
    if (statusMap.size === 0) {
        startPage = true
    } else {
        startPage = false
    }

    //try {
    resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`,
        //{ cache: 'force-cache' }
        { next: { tags: ['items'] } }
    );
    if (Number(resp.status) === 200) {
        const dat = await resp.json()
        //readable stream-chunk textDecoder->json
        //console.log('element_count', dat.element_count)
        const list = dat.near_earth_objects
        const arrObjects = Object.values(list)
        return <List items={arrObjects[0]}
            renderItem={async (product) => {
                //let item
                const date = new Date(product.close_approach_data[0].epoch_date_close_approach)
                const prevDate = new Intl.DateTimeFormat("ru-RU", options).format(date);
                const datSlice = prevDate.slice(0, -2)
                const dateString = datSlice.replace('.', '');
                if (startPage) {
                    new Item(Number(product.id))
                    //console.log('item1',item)
                }
                //console.log('renderProp item', item)
                return <Suspense><Row
                    key={product.id}
                    obj={product}
                    viewtype={viewtype}
                    dates={dateString}
                    action={toggleClick}
                /></Suspense>
            }}
        /*
    }
    }
/>*/
        />
    }
    /*}
    catch (err) {
        console.log(err)
    }*/
}