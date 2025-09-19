'use server'
import { revalidateTag } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';
import Li from '@/app/api/Li';
import { method } from 'lodash';

export async function buttonClick(formData) {
    //revalidate count
    const id = formData.get('id')
    /*const item = await Li.findById(Number(id));
    //console.log('find li', id,item)
    const oldStatus = Number(await item.getStatus())
    const newStatus = Number(!Boolean(oldStatus))
    console.log('fdddd', id, oldStatus, newStatus)*/
    const resp = await fetch(`http://localhost:3000/api/item/${id}/status`,{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: id//JSON.stringify(postData)
    }
     // { next: { tags: [`/item/${this.id}/status`] } }
    )
    //item.status=newStatus
    //revalidateTag(`/item/${id}/status`)
    revalidateTag(`count`)
    //revalidateTag(`list`)
}