'use server'
import { revalidateTag, revalidatePath } from 'next/cache';
//import { redirect, RedirectType } from 'next/navigation';
//import Li from '../Li';
//import statusMap from '../statusMap';
//import { method } from 'lodash';
import Item from '../Item';
async function toggleClick(formData) {
    console.log('toggleClick', formData)
    const id = Number(formData.get('id'))
    //const item = Item.arrObj.get(Numberid)//sync
    const item = await Item.findById(id)//sync
    console.log('item', item.id, item)
    item.setStatus()//sync
    //console.log('oldStatus',oldStatus)
    statusMap.set(id, !oldStatus)
    //revalidatePath('/')
    revalidateTag('items')
    //await Li.setViewtype(formData.get('viewtype'))
}
export default toggleClick