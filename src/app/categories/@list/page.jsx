import styles from "./page.module.css";
import React, { Suspense, Activity } from "react";
import worker_threads from 'node:worker_threads';
//const { Worker, isMainThread, parentPort } = require('worker_threads');
import statusMap from "../../statusMap";
//import { revalidateTag, revalidatePath } from 'next/cache';
import ButtonSubmit from '../../../components/ButtonSubmit/page'
import Item from "../../Item";
import DataLength from "../../DataLength";
import Script from 'next/script'
import {queue} from '../../TaskQueue'
//import { linkedList } from "../../LinkedList";
//import generator from "../../Generator";

let resp = ''
let startDate = ''
let res = ''
let search = ''
let page = 0
let viewtype = 'main'
let array3 = [];
let list
let newArr
let offset = []
let scroll
let data
let arrObjects22
let resObj2
let success
let date
let prevDate
let datSlice
let dateString
export default async function Home({ searchParams }) {
    search = await searchParams;
    page = await search.page
    //console.log('n,mkmkmk', typeof page)
    //startDate = await CalcData(page)
    viewtype = await search.viewtype
    scroll = await search.scroll
    //try {
    

   // if (Number(resp.status) === 200) {
        
        success = await DataLength.setArr(Number(page))
        console.log('success',success)
        /*if (success === true) {
            data_items = await DataLength.getArr()
            //data_items = await linkedList.toArray()
        }*/
        return  success
    /*} else {
        console.log('resp', resp.status)   
    }*/
    /* }
     catch (err) {
         console.log(err)
     }*/
}