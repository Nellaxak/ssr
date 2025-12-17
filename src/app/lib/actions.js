'use server'
import { revalidateTag } from 'next/cache';
import items from '../../app/lib/ArrayGlob'
import Item from '../Item';
import HFSM from '../HFSM'
//let cameraFSM
//let instance
const listInstances = new Map()
export async function mountItemFSM(index) {
    //function closure() {
    const instanceFSM = new HFSM(index)
    listInstances.set(index, instanceFSM)
    //}
    //return closure()
}
export async function startFSM(index) {
    const instance = listInstances.get(index)
    console.log(instance, 'start', index)
    instance.dispatch('press')
    //cameraFSM.trigger("start", index);
}
export async function scrollFSMDown(index) {
    //cameraFSM.trigger("outgoingCall", "ScrollDown");
}
export async function scrollFSMUp(index) {
    //cameraFSM.trigger("outgoingCall", "ScrollUp");
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
export async function toggleClick(formData) {
    //console.log('toggleClickPage', formData)
    const id = Number(formData.get('id'))
    //console.log('id type',typeof id)
    const item = await Item.findById(id)
    await item.setStatus()
    //statusMap.set(id, !statusMap.get(id))
    //revalidatePath('/')
    revalidateTag('items')
}