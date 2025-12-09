'use server'
import { revalidateTag } from 'next/cache';
//import { redirect, RedirectType } from 'next/navigation';
//import CountPage from '../CountPage'
//import { method } from 'lodash';
import Item from '../Item';
import statusMap from '../statusMap';

export async function pagination(formData) {
    console.log('pagination',formData)//.get('page'))
    revalidateTag('items')
}
export async function toggleClick(formData) {
    console.log('toggleClick button', formData, statusMap,Item.arrObj)
    const id = Number(formData.get('id'))
    //console.log('id type',typeof id)
    //const item = Item.arrObj.get(id)//sync
    const item = await Item.findById(id)//sync
    //console.log('item', item)
    await item.setStatus()//sync
    //console.log('oldStatus',oldStatus)
    statusMap.set(id, !statusMap.get(id))
    //revalidatePath('/')
    revalidateTag('items')//call Item constructor
}