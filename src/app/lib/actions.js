'use server'
import { revalidateTag } from 'next/cache';
//import { redirect, RedirectType } from 'next/navigation';
//import CountPage from '../CountPage'
//import { method } from 'lodash';
import Item from '../Item';
import statusMap from '../statusMap';
import linkedList, { LinkedList } from '../LinkedList';
import CountPage from '../CountPage'
import array3 from '../../app/lib/ArrayGlob'

export async function pagination(index, length) {
    //console.log('pagination', id)
    //output delete linked list
    //const obj = LinkedList.arrObj.get(Number(id))
    //console.log('dlete obj',obj)
    //await linkedList.delete(obj)//must be object
    //if last id => increment Page
    if ((index + 1) === length) {
        await CountPage.setCount(1)
        revalidateTag('items')
    }
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