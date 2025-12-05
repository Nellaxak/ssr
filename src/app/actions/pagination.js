'use server'
import { revalidateTag } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';
import CountPage from '../CountPage'
//import { method } from 'lodash';

export async function pagination(formData) {
    console.log('pagination',formData.get('scroll'),CountPage.count)
    CountPage.count = CountPage.count + 1
    //await Li.setViewtype(formData.get('viewtype'))
}