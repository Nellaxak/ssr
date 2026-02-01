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
    const find = await linkedList.find(params)//LinkedListNode
    await find.setStatus() 
    console.log('server action', params, find)
    revalidateTag('items', 'max')
}
export async function getStatus(params) {
    console.log('getStatus', params)
}