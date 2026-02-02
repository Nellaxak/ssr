'use server'
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
    //const find = await linkedList.find(params)//LinkedListNode
    //console.log('server action', params)
    //console.log(params, 'Item.arrObj', statusMap.size)
    const id = Number(params)
    const find = Item.arrObj.get(id)//statusMap.get(id)
    console.log('toggle status', id, find)
    if (find !== undefined) {
        //statusMap.set(id, !oldStatus)
        await find.setStatus()
        console.log('new status', id, statusMap.get(id))
        /*if (find) {
            await find.setStatus()*/
        revalidateTag('items', 'max')
    }
}
export async function getStatus(params) {
    console.log('getStatus', params)
}