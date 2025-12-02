'use server'
import { revalidateTag, revalidatePath } from 'next/cache';
//import { redirect, RedirectType } from 'next/navigation';
import statusMap from '../statusMap';
import Item from '../Item';
async function toggleClick(formData) {
    console.log('toggleClick', formData, statusMap,Item.arrObj)
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
export default toggleClick