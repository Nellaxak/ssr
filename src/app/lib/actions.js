'use server'
import { revalidateTag } from 'next/cache';
//import { redirect, RedirectType } from 'next/navigation';
//import CountPage from '../CountPage'
//import { method } from 'lodash';
import Item from '../Item';
import statusMap from '../statusMap';
import linkedList, { LinkedList } from '../LinkedList';

export async function pagination(id) {
    //console.log('pagination', id)
    //output delete linked list
    const obj = LinkedList.arrObj.get(Number(id))
    //console.log('dlete obj',obj)
    await linkedList.delete(obj)//must be object
    revalidateTag('items')
}
export async function toggleClick(formData) {
    //console.log('toggleClickPage', formData)
    const id = Number(formData.get('id'))
    //console.log('id type',typeof id)
    const item = await Item.findById(id)
    await item.setStatus()
    //statusMap.set(id, !statusMap.get(id))
    //revalidatePath('/')
    revalidateTag('items')
}