'use server'
import { revalidateTag } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';
import Li from '../Li';
import statusMap from '../statusMap';
//import { method } from 'lodash';

export async function toggleClick(formData) {
    console.log('toggleClick', formData)
    const id = formData.get('id')
    const oldStatus = statusMap.get(id)
    statusMap.set(id, !oldStatus)
    //await Li.setViewtype(formData.get('viewtype'))
}