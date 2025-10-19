'use server'
import { revalidateTag } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';
import Li from '../Li';
//import { method } from 'lodash';

export async function buttonClick(formData) {
    const id = formData.get('id')
    /*const item = await Li.findById(Number(id));
    //console.log('find li', id,item)
    const oldStatus = Number(await item.getStatus())
    const newStatus = Number(!Boolean(oldStatus))
    item.setStatus(newStatus)*/
    /*revalidateTag(`count`)*/
}