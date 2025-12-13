'use server'
import { revalidateTag } from 'next/cache';
import array3 from '../../app/lib/ArrayGlob'
import Item from '../Item';

export async function pagination(index) {
    //console.log('pagination', id)
    //output delete linked list
    //const obj = LinkedList.arrObj.get(Number(id))
    //console.log('dlete obj',obj)
    //await linkedList.delete(obj)//must be object
    //await CountPage.setCount(1)
    console.log('io output',array3.length)
    //array3.splice(index,1)
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