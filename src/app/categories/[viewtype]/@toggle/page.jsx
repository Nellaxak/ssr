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
    //console.log('viewtype1111111111111111', params)
    let startDate
    let endDate
    [startDate, endDate] = await CalcData()
    //viewtypePromise = await params//then
    params.then(async (data) => {
        console.log('then1', data)
        if (data.viewtype === 'main') {
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
            }
        }
        return data.viewtype
    }).then((data) => {
        console.log('then2', data)
        Li.setViewtype(data)
        return data
    }).then(async (data) => {
        console.log('then3', data)
        resf = await Li.getList(data)
        return resf
    })
    //viewtype1 = viewtypePromise.viewtype
    //if (Li.viewtype !== viewtype1) {
    //console.log('sawefv',viewtype1)

    //Li.viewtype = viewtype1


    //Li.setViewtype(viewtype1).then(data=>)
    //resd = await Li.getList(viewtype1)

    return (
        <div>
            <ToggleComponent />
            <Suspense><ul>{resf}</ul></Suspense>
        </div>)
}
/*Home.getLayout = function getLayout(page) {
    return <ParallelLayout>{page}</ParallelLayout>;
};*/