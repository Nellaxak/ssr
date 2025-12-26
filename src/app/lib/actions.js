'use server'
import { revalidateTag } from 'next/cache';
import Item from '../Item';
import LinkedList from '../LinkedList'

const listInstances = new Map()
const instanceItem = new Map()
const instanceLL = new Map()
export async function createLinkedListInstance() {
    const ll = new LinkedList()
    instanceLL.set(0, ll)
    return ll
}
export async function notIO(index, obj) {
    console.log('ll acc', instanceLL.get(0))
}
export async function mountItem(index, obj) {
    //console.log('ll acc', instanceLL.get(0))
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
    const item = instanceItem.get(id)
    await item.setStatus()
    console.log('count', Item.count)
    //statusMap.set(id, !statusMap.get(id))
    revalidateTag('items', 'max')
}