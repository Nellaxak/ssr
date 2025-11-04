'use server'
import { revalidateTag } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';
import Li from '../Li';
//import { method } from 'lodash';

export async function toggleClick(formData) {
    //console.log('toggleClick',formData)
    await Li.setViewtype(formData.viewtype)
    //const viewtype = formData.get('viewtype')
    /*const item = await Li.findById(Number(id));
    //console.log('find li', id,item)
    const oldStatus = Number(await item.getStatus())
    const newStatus = Number(!Boolean(oldStatus))
    item.setStatus(newStatus)*/
    /*revalidateTag(`count`)*/
}