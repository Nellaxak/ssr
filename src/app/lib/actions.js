'use server'
import { revalidateTag } from 'next/cache';
import items from '../../app/lib/ArrayGlob'
import Item from '../Item';
import HFSM from '../HFSM'
//call import before fromArray ssr
import LinkedList, { linkedList } from '../LinkedList';

const listInstances = new Map()
const instanceItem = new Map()

//add observer subscribe
//console.log('linkedlist', linkedList)
export async function mountItem(index, obj) {
    const item = new Item(Number(obj.id), obj)
    instanceItem.set(Number(obj.id), item)
}
export async function scrollFSM(index, action) {
    const instance = listInstances.get(index)
    if (instance !== undefined) {
        //console.log('scroll', index, action)
        if (action === 'input') {
            await instance.trigger("ioInput");
        } else {
            await instance.trigger("ioOutput");
        }
    }
}
export async function scrollFSMDown(index) {
}
export async function scrollFSMUp(index) {
}
export async function pagination(index) {
    //console.log('pagination', id)
    //output delete linked list
    //const obj = LinkedList.arrObj.get(Number(id))
    //console.log('dlete obj',obj)
    //await linkedList.delete(obj)//must be object
    //await CountPage.setCount(1)
    //console.log('io output',items.length)
    //array3.splice(index,1)
    //revalidateTag('items')
}
export async function toggleClick(params) {
    const id = Number(params)
    //const item = await Item.findById(id)
    const item = instanceItem.get(id)
    console.log('toggle', id, item)
    await item.setStatus()
    //statusMap.set(id, !statusMap.get(id))
    revalidateTag('items', 'max')
}