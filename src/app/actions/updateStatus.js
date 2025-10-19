'use server'
import { revalidateTag } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';
import Li from '../Li';
//import { method } from 'lodash';

export async function buttonClick(formData) {
    //revalidate count
    const id = formData.get('id')
    const item = await Li.findById(Number(id));
    //console.log('find li', id,item)
    const oldStatus = Number(await item.getStatus())
    const newStatus = Number(!Boolean(oldStatus))
    //console.log('fdddd', id, oldStatus, newStatus)
    /*const resp = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/app/api/item/${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: id//JSON.stringify(postData)
    },
        { next: { tags: [`/item/${id}/status`] } }
    )*/
    item.setStatus(newStatus)
    //revalidateTag(`/item/${id}/status`)
    revalidateTag(`count`)
    /*revalidateTag(`list`)*/
}