'use server'
/*import worker_threads from 'node:worker_threads';
const { Worker } = require('worker_threads');*/

import { revalidateTag } from 'next/cache';
import Item from '../Item';
import DataLength from '../DataLength';
import statusMap from '../statusMap';
import pq from '../TaskQueue';

export async function scrollDirection(params) {
    console.log('scrollDirection', DataLength.count)
    //const count = await DataLength.getCount()
    return true//count
}
export async function toggleClick(params) {
    //pq.enqueue(async () => {
    console.log('Item.arrObj.size', Item.arrObj.size)
    const id = Number(params)
    const find = Item.arrObj.get(id)//statusMap.get(id)
    //console.log('toggle status', id, find)
    if (find !== undefined) {
        //statusMap.set(id, !oldStatus)
        await find.setStatus()
        //console.log('new status', id, find.status)
        /*if (find) {
            await find.setStatus()*/
        revalidateTag('items', 'max')
    }
    //}, 1);
}
export async function getStatus(params) {
    console.log('getStatus', params)
}