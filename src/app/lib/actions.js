'use server'
import { revalidateTag } from 'next/cache';
import Item from '../Item';
import DataLength from '../DataLength';
import statusMap from '../statusMap';
import { linkedList } from '../LinkedList';

export async function scrollDirection(params) {
    console.log('scrollDirection', DataLength.count)
    //const count = await DataLength.getCount()
    return true//count
}
export async function toggleClick(params) {
    //const id = Number(params)
    const find = await linkedList.find(params)
    console.log('server action', params, find)
    //const oldStatus = statusMap.get(id)
    //console.log('toggle status', id, item)
    //statusMap.set(id,!oldStatus)
    /*if (item !== undefined) {
        await item.setStatus()
    }*/
    revalidateTag('items', 'max')
}
export async function getStatus(params) {
    console.log('getStatus', params)
}