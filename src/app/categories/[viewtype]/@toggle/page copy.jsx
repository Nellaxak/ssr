import React, { createElement, Suspense } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Li from "../../../Li";
//import ToggleComponent from '../../../../components/Toggle/page'
//import ParallelLayout from '../../layouts/layout';

let viewtypePromise
let viewtype1 = 'main'
let res
let resp
let resd
let resf
let arr
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
export default async function Home({ params }) {
    let startDate
    let endDate
    [startDate, endDate] = await CalcData()
    params.then(async (data) => {
        if (data.viewtype === 'main') {
            try {
                resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`
                );//tag
                if (Number(resp.status) === 200) {
                    const dat = await resp.json()
                    const list = dat.near_earth_objects
                    const dates = Object.keys(list)
                    const arrObjects = Object.values(list)
                    await Promise.all(arrObjects[0].map(
                        //change prototype li
                        async (e) => new Li(e, dates[0])
                    ));
                } else {
                    console.log('NASA API error fetch status', resp.status)
                    return data.viewtype
                }
            } catch (err) {
                //console.log('NASA API error fetch status###########', err)
            }
        }
        return data.viewtype
    }).then(async (data) => {
        await Li.setViewtype(data)
        return data
    }).then(async (data) => {
        if (data === 'main') {
            res = <nav className={styles.labelWrapper} key='1'>
                <Link href="/categories/main" scroll={false}
                    className={styles.km} key='1'>в километрах</Link>
                <span className={styles.space} key='2'>|</span>
                <Link href="/categories/moon" scroll={false}
                    className={styles.moon} key='3'>в лунных орбитах</Link>
            </nav>
        }
        else {
            res = <nav className={styles.labelWrapper} key='2'>
                <Link href="/categories/main" scroll={false} key='1'
                    className={styles.moon}>в километрах</Link>
                <span className={styles.space} key='2'>|</span>
                <Link href="/categories/moon" scroll={false}
                    className={styles.km} key='3'>в лунных орбитах</Link>
            </nav>
        }

        resf = await Li.getList(data)
        arr = [res, <ul key='ul'>{resf}</ul>]
        return arr
    })
    //if (Li.viewtype !== viewtype1) {
    return arr
}
/*Home.getLayout = function getLayout(page) {
    return <ParallelLayout>{page}</ParallelLayout>;
};*/