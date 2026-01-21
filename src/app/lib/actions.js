'use server'
import { revalidateTag } from 'next/cache';
import Item from '../Item';
import DataLength from '../DataLength';

import LinkedList, { linkedList } from '../LinkedList'
import HFSM from '../HFSM'
import dll, { DoublyLinkedList } from '../DoublyLinkedList';
const listInstances = new Map()
const instanceItem = new Map()
const instanceLinkedList = new Map()

/*export async function createLinkedListInstance() {
    const ll = new LinkedList()
    instanceLinkedList.set(0, ll)
    return ll
}*/
export async function mountItem(index, obj) {
    const instanceFSM = new HFSM({
        initial: "idle", // Камера по умолчанию неактивна
        index: index,
        obj: obj,
        transitions: {
            idle: [{ event: "start", to: "started" }], // Событие "start" -&gt; попытка запуска камеры
            started: [
                { event: "ioInput", to: "inside" },
                { event: "ioOutput", to: "outside" },// успешно запущена и готова к звонку
            ],
            inside: [{ event: "ioOutput", to: "outside" }],   // Закрыть камеру
            outside: [{ event: "ioInput", to: "inside" }],
        },
        callbacks: {
            onAfterIoInput: async (from, to) => {
                // Что то делаем
                if (from === 'outside') {
                    //tail.prev
                    //const ll = instanceLinkedList.get(0)
                    console.log('scroll inside', index)//, obj.id)
                }
                //console.log('onAfterIoInput', index, from, to)
            },
            onAfterIoOutput: async (from, to) => {
                // Что то делаем
                if (from === 'inside') {
                    //const ll = instanceLinkedList.get(0)
                    console.log('scroll outside', index)
                    //ll.delete(obj)
                }
                //console.log('onAfterIoOutput', index, from, to)
            },
            onAfterError: async (from, to, err) => {
                // Что то делаем
                console.log('onAfterError', from, to, err)
            }
        }
    });
    listInstances.set(index, instanceFSM)
    //console.log('listInstances set', index)
    //const item = new Item(Number(obj.id), obj)
    //instanceItem.set(Number(obj.id), item)
    await instanceFSM.trigger("start");
}
export async function scrollFSM(index, action) {
    const instance = listInstances.get(index)
    //console.log('listInstances get', index, instance)
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
export async function scrollEnd(params) {
    //const id = Number(params)
    //const item = instanceItem.get(id)
    //const item = Item.arrObj.get(id)
    //await item.setStatus()
    console.log('scrollend')
    //statusMap.set(id, !statusMap.get(id))
    //revalidateTag('items', 'max')
    //const count = await DataLength.getCount()
    return 0
}
export async function toggleClick(params) {
    const id = Number(params)
    //const item = instanceItem.get(id)
    const item = Item.arrObj.get(id)
    await item.setStatus()
    //console.log('count', Item.count)
    //statusMap.set(id, !statusMap.get(id))
    //revalidateTag('items', 'max')
    //return item.status
}
export async function getStatus(params) {
    console.log('getStatus', params)
}
export async function scrollStart(page) {
    await DataLength.setArr(String(page) + 'self', 'start', DoublyLinkedList.links)
}
export async function scrollBottom() {

}
export async function scrollTop() {
    //dll.prepend()
}