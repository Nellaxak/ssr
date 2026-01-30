'use server'
import { revalidateTag } from 'next/cache';
import Item from '../Item';
import DataLength from '../DataLength';


const listInstances = new Map()
const instanceItem = new Map()
const instanceLinkedList = new Map()

export async function scrollDirection(params) {
    //const id = Number(params)
    //const item = instanceItem.get(id)
    //const item = Item.arrObj.get(id)
    //await item.setStatus()
    console.log('scrollDirection', DataLength.count)
    //statusMap.set(id, !statusMap.get(id))
    //revalidateTag('items', 'max')
    const count = await DataLength.getCount()
    return count
}
export async function toggleClick(params) {
    const id = Number(params)
    //const item = instanceItem.get(id)
    const item = Item.arrObj.get(id)
    await item.setStatus()
    revalidateTag('items', 'max')
}
export async function getStatus(params) {
    console.log('getStatus', params)
}