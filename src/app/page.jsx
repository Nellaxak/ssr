import styles from "./page.module.css";
import React, { Suspense, Activity } from "react";
/*import statusMap from "../../statusMap";
//import { revalidateTag, revalidatePath } from 'next/cache';
import ButtonSubmit from '../../../components/ButtonSubmit/page'
import LinkedList, { linkedList } from "../../LinkedList";
import Item from "../../Item";
import { createLinkedListInstance } from '../../lib/actions'*/

let resp
//let startDate
let endDate
let startPage
let res = ''
let search = ''
let page = 0
let viewtype = 'main'
let array3 = []//null;
let data
let list
let arrObjects
let currentDate = new Date()
let startDate = currentDate.getFullYear() + '-' +
    (currentDate.getMonth() + 1) + '-' +
    currentDate.getDate();
let set = new Map()
//const ll = await createLinkedListInstance()

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
async function predicate(item, index, arr) {//renderItem?
    if (item.visible === 1) {
        return await RenderProp(item, index)
    }
    return false
}
async function RenderProp(product, index) {
    console.log('RenderProp', product)
    const date = new Date(product.close_approach_data[0].epoch_date_close_approach)
    const prevDate = new Intl.DateTimeFormat("ru-RU", options).format(date);
    const datSlice = prevDate.slice(0, -2)
    const dateString = datSlice.replace('.', '');
    new Item(Number(product.id), product)
    //const dateString = startDate;
    return <Suspense><Row
        key={product.id}
        obj={product}
        viewtype={viewtype}
        index={index}
        dates={dateString}
    /></Suspense>
}
async function List({ items, renderItem }) {
    console.log('type items', Array.isArray(items))
    /*const res = await Promise.all(items.forEach(async (item) => {
        //console.log('llpoiyt', item)
        //.filter(predicate) 
        return await renderItem(item);
    }))*/

    return (
        <Suspense>{items}
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
    return <li>{props.bite}</li>
    /*const dataViewtype = props.obj.close_approach_data[0].miss_distance
    const status = 0//Number(statusMap.get(Number(props.obj.id)))
    //console.log('id', props.obj.id, 'status', status)
    //await FormatStatus(props.obj.id)
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
            <ButtonSubmit id={props.obj.id} obj={props.obj} status={status} />
            <div className={styles.flex_item}>
                <div className={styles.flex_container_row}>
                    <span className={styles.danger}>{Danger}</span>
                </div>
            </div>
        </li>
    </Suspense>*/
}

export default async function Home({ searchParams }) {
    //search = await searchParams;
    //let [startDate, endDate] = await CalcData(search)
    //viewtype = await search.viewtype
    //page = await search.page
    console.log('@list Home', await searchParams)

    //try {
    resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`,
        { cache: 'force-cache' },//deduplicate fetch
        { next: { tags: ['items'] } }
    );
    data = await resp.json()
    console.log('count', data.element_count)
    list = data.near_earth_objects
    arrObjects = Object.values(list)
    //concat arr
    //array3 = array3.concat(arrObjects[0]);
    arrObjects[0].map((item,index) => set.set(item.id,item))
    console.log('concat', set.size)
    //let result = '';
    /*resp.then((response) => {
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8'); // Specify the encoding
        new ReadableStream({
            start(controller) {
                return pump();
                function pump() {
                    return reader.read().then(({ done, value }) => {
                        // When no more data needs to be consumed, close the stream
                        if (done) {
                            controller.close();
                            return;
                        }
                        // Enqueue the next data chunk into our target stream
                        controller.enqueue(value);
                        /*const sharedBuffer = new SharedArrayBuffer(value.length);
                        const sharedUint8Array = new Uint8Array(sharedBuffer);
                        sharedUint8Array.set(value);*/
    /*array3 = value//sharedUint8Array
    //result += decoder.decode(value, { stream: true });
    console.log('value', value)
    return pump();
});
}
},
});
return <List items={array3} renderItem={async (bite) => {
return <Suspense><Row
key={bite}
bite={bite}
/></Suspense>
}} />
})*/
    /*return <List items={array3} renderItem={async (bite) => {
        console.log('bite', bite)
        //console.log('exsist', product.id, Boolean(Item.findById(Number(product.id))))
        //if (!Boolean(Item.findById(Number(product.id)))) {
        //new Item(Number(product.id))
        //console.log('item1',item)
        //}
        //console.log('renderProp item', item)
        return <Suspense><Row
            key={bite}
            bite={bite}
        /></Suspense>*/
    /*return <Suspense><Row
        key={product.id}
        obj={product}
        viewtype={viewtype}
        dates={dateString}
    /></Suspense>*/
    // }} />
    /*if (Number(resp.status) === 200) {
        //console.log('not from cache')
        const dat = await resp.json()
        const list = dat.near_earth_objects
        const arrObjects = Object.values(list)
        await ll.fromArray(arrObjects[0])
        const array3 = await ll.toArray()

        //console.log('array3', array3)
        return <List items={array3} renderItem={async (product) => {
            //console.log('product', product)
            //let item
            const date = new Date(product.close_approach_data[0].epoch_date_close_approach)
            const prevDate = new Intl.DateTimeFormat("ru-RU", options).format(date);
            const datSlice = prevDate.slice(0, -2)
            const dateString = datSlice.replace('.', '');
            //console.log('exsist', product.id, Boolean(Item.findById(Number(product.id))))
            //if (!Boolean(Item.findById(Number(product.id)))) {
            //new Item(Number(product.id))
            //console.log('item1',item)
            //}
            //console.log('renderProp item', item)
            return <Suspense><Row
                key={product.id}
                obj={product}
                viewtype={viewtype}
                dates={dateString}
            /></Suspense>
        }} />
        //return sab//String(res)
    } else {
        console.log('resp', resp.status)
    }*/
    /*}
    catch (err) {
        console.log(err)
    }*/
}