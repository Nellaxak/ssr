'use server'
import worker_threads from 'node:worker_threads';
const { Worker } = require('worker_threads');

import { revalidateTag } from 'next/cache';
import Item from '../Item';
import DataLength from '../DataLength';
import statusMap from '../statusMap';
import LinkedList, { linkedList } from '../LinkedList';

export async function scrollDirection(params) {
    console.log('scrollDirection', DataLength.count)
    //const count = await DataLength.getCount()
    return true//count
}
export async function toggleClick(params) {
    queueMicrotask(async () => {
        //console.log('executing microtask');
        const id = Number(params)
        const find = Item.arrObj.get(id)//statusMap.get(id)
        console.log('toggle status', id, find)
        if (find !== undefined) {
            //statusMap.set(id, !oldStatus)
            await find.setStatus()
            console.log('new status', id, find.status)
            /*if (find) {
                await find.setStatus()*/
            revalidateTag('items', 'max')
        }
    });

}
export async function getStatus(params) {
    console.log('getStatus', params)
}