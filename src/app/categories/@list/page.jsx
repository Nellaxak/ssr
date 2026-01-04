import styles from "./page.module.css";
import React, { Suspense, Activity } from "react";
import statusMap from "../../statusMap";
//import { revalidateTag, revalidatePath } from 'next/cache';
import ButtonSubmit from '../../../components/ButtonSubmit/page'
//import LinkedList, { linkedList } from "../../../LinkedList";
import Item from "../../Item";
import dll from "../../DoublyLinkedList";
//import { createLinkedListInstance } from '../../../lib/actions'

let resp
let endDate
let startPage
let res = ''
let search = ''
let page = 0
let viewtype = 'main'
let array3 = [];
let list
let newArr
let offset = []
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
    const page = params

    //if (Number(page) > 0) {
    const newPage = Number(currentDate.getDate()) + Number(page)
    currentDate.setDate(newPage);//+1
    //}
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate());
    //console.log('page**', page)
    //if (Number(page) > 0) {
    const newPage1 = Number(tomorrow.getDate()) + Number(page)// + 1//+1 offset
    //console.log('if', tomorrow.getDate())
    tomorrow.setDate(newPage1);//+1
    //}
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
    const res = await Promise.all(items.map(async (item) => {
        //console.log('llpoiyt', item.visible)//linked list
        return await renderItem(item);
    }))

    return (<Suspense>{res}
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
    </Suspense>
}
/*function forProxy(params) {
    console.log('forProxy', params)
    return 'ffff'
}
const fProxy = new Proxy(forProxy, {
    get(target, prop) {
        console.log('get fProxy', target, prop)
        /*if (prop in target) {
            return target[prop];
        } else {
            return -1; // значение по умолчанию
        }*/
/* },
 set(target, prop, val) {
     console.log('set proxy func')
     //if (val !== target[prop]) {
     //console.log('proxy set ', target, prop, target[prop], val)
     //console.log('added', target, prop, target[prop], val)
     //target[prop] = val;
     //dll.append({value1:90})//data.links.self)
     //}
     return true
 }
})
function sum(a, b) {
 return a + b;
}
const handler = {
 apply: function (target, thisArg, argumentsList) {
     console.log('xvbm,', Array.isArray(argumentsList), argumentsList[0])
     //argumentsList[0] page 
     console.log(`Calculate sum: ${argumentsList}`); // Logs: "Calculate sum: 1,2"

     // Call the original function using Reflect.apply for best practice
     const result = Reflect.apply(target, thisArg, argumentsList);

     // Modify the result (e.g., multiply by 10)
     return result * 10;
 }
};

const proxy = new Proxy(sum, handler);*/
let targetPage = { page: -1, data: null }
const pageProxy = new Proxy(targetPage, {
    get(target, prop) {
        //console.log('proxy get', target, prop)
        if (prop in target) {
            return target[prop];
        } else {
            return -1; // значение по умолчанию
        }
    },
    set(target, prop, val) {
        //console.log('proxy set', target, prop, val, target.data)
        if (typeof val == 'number') {//only page
            if (val !== target[prop]) {//singleton pattern by proxy
                target[prop] = val;
                //dll.append(target.data.links)//append one
                //data.links.self,next,prev)
            }
        } else {
            target[prop] = val;
        }
        return true
    }
})
export default async function Home({ searchParams }) {
    const search = await searchParams;
    const page = await search.page
    let [startDate, endDate] = await CalcData(page)
    const viewtype = await search.viewtype
    const scroll = await search.scroll
    //const data = { 
    //const links = { links: { next: {}, prev: {}, self: {} } }

    //console.log('scroll', scroll)
    //try {
    const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`,
        { cache: 'force-cache' },
        // { cache: 'no-store' },//add io
        { next: { tags: ['items'] } }
    );
    let newArrNext = []
    let newArrPrev = []
    if (Number(resp.status) === 200) {
        const data = await resp.json()
        pageProxy.data = data.links
        pageProxy.page = Number(page)
        //dll.append(data.links.self)
        /*if (Number(page) === 0) {
            //only next
            const respNext = await fetch(`${data.links.next}`,
                { cache: 'force-cache' },
            );
            const data1 = await respNext.json()
            const listNext = data1.near_earth_objects
            const arrObjects1 = Object.values(listNext)
            newArrNext = arrObjects1.flat()
        } *//*else {
            const respPrev = await fetch(`${data.links.prev}`,
                { cache: 'force-cache' },
            );
            const dataPrev = await respPrev.json()
            const listPrev = dataPrev.near_earth_objects
            const arrObjects2 = Object.values(listPrev)
            newArrPrev = arrObjects2.flat()
            const respNext = await fetch(`${data.links.next}`,
                { cache: 'force-cache' },
            );
            const data1 = await respNext.json()
            const listNext = data1.near_earth_objects
            const arrObjects1 = Object.values(listNext)
            newArrNext = arrObjects1.flat()
        }*/
        if (Number(scroll) === 1) {
            if (Number(page) > 0) {
                const respPrev = await fetch(`${data.links.prev}`,
                    { cache: 'force-cache' },
                );
                const dataPrev = await respPrev.json()
                const listPrev = dataPrev.near_earth_objects
                const arrObjects2 = Object.values(listPrev)
                newArrPrev = arrObjects2.flat()
            }
            //console.log('add nextpage')
            //console.log('data', data.links.next)//data.links.next/prev/self url for fetch
            const respNext = await fetch(`${data.links.next}`,
                { cache: 'force-cache' },
            );
            const data1 = await respNext.json()
            const listNext = data1.near_earth_objects
            const arrObjects1 = Object.values(listNext)
            newArrNext = arrObjects1.flat()
        }
        const list = data.near_earth_objects
        //console.log('element_count', data.element_count)
        //if (Number(data.element_count) < 9) {

        //}
        const arrObjects = Object.values(list)
        const newArr = arrObjects.flat()
        // {[...newArr, ...newArrNext]}
        return <List items={[...newArr, ...newArrNext]} renderItem={async (product) => {
            //console.log('product', product)
            const date = new Date(product.close_approach_data[0].epoch_date_close_approach)
            const prevDate = new Intl.DateTimeFormat("ru-RU", options).format(date);
            const datSlice = prevDate.slice(0, -2)
            const dateString = datSlice.replace('.', '');

            //new Item(Number(product.id))
            return <Suspense><Row
                key={product.id}
                obj={product}
                viewtype={viewtype}
                dates={dateString}
            /></Suspense>
        }} />
    } else {
        console.log('resp', resp.status)
        //return not empty render
        /*return <List items={newArr} renderItem={async (product) => {
            //console.log('product', product)
            const date = new Date(product.close_approach_data[0].epoch_date_close_approach)
            const prevDate = new Intl.DateTimeFormat("ru-RU", options).format(date);
            const datSlice = prevDate.slice(0, -2)
            const dateString = datSlice.replace('.', '');
    
            //new Item(Number(product.id))
            return <Suspense><Row
                key={product.id}
                obj={product}
                viewtype={viewtype}
                dates={dateString}
            /></Suspense>
        }} />*/
    }
    /*}
    catch (err) {
        console.log(err)
    }*/
}