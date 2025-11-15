'use server'
import { revalidateTag } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';
import Li from '../Li';
//import { method } from 'lodash';

export async function toggleClick(formData) {
    console.log('toggleClick',formData)
    await Li.setViewtype(formData.get('viewtype'))
}