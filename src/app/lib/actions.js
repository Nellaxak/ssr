'use server'
import { revalidateTag } from 'next/cache';
import items from '../../app/lib/ArrayGlob'
import Item from '../Item';
import HFSM from '../HFSM'
//call import before fromArray ssr
import LinkedList, { linkedList } from '../LinkedList';

const listInstances = new Map()
const instanceLinkedList = new Map()

//add observer subscribe
//console.log('linkedlist', linkedList)
export async function createInstanceLinkedList() {
    //const linkedList = new LinkedList()
    instanceLinkedList.set(0, new LinkedList())
    console.log('size instances', instanceLinkedList.size)
}
export async function mountItemFSM(index, obj) {
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
                    //linkedList.append(obj)//append next node ll
                    //tail.prev
                    console.log('scroll inside', index, instanceLinkedList.get(0))//, obj.id)
                    /*if (linkedList.tail.id === obj.id) {
                        console.log('scroll inside tail', index)
                    }*/
                }
                //console.log('onAfterIoInput', index, from, to)
            },
            onAfterIoOutput: async (from, to) => {
                // Что то делаем
                if (from === 'inside') {
                    console.log('scroll outside', index)
                    //linkedList.delete(obj)
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
    await instanceFSM.trigger("start");
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
    const item = await Item.findById(id)
    await item.setStatus()
    //statusMap.set(id, !statusMap.get(id))
    revalidateTag('items','max')
}