'use server'
import { revalidateTag } from 'next/cache';
import items from '../../app/lib/ArrayGlob'
import Item from '../Item';
import HFSM from '../HFSM'

const listInstances = new Map()
export async function mountItemFSM(index) {
    const instanceFSM = new HFSM({
        initial: "idle", // Камера по умолчанию неактивна
        index: index,
        transitions: {
            idle: [{ event: "start", to: "started" }], // Событие "start" -&gt; попытка запуска камеры
            started: [
                { event: "ioInput", to: "inside" },
                { event: "ioOutput", to: "outside" },// Камера успешно запущена и готова к звонку
                //{event: "error", to: "idle"}            // Ошибка при запуске камеры
            ],
            inside: [{ event: "ioOutput", to: "outside" }],   // Закрыть камеру
            outside: [{ event: "ioInput", to: "inside" }],
        },
        callbacks: {
            onAfterStart: (from, to) => {
                // Что то делаем
                console.log('onAfterStart', from, to)
            },
            onAfterOpenedForCall: (from, to, msg) => {
                // Что то делаем
                console.log('onAfterOpenedForCall', from, to, msg)
            },
            onAfterError: (from, to, err) => {
                // Что то делаем
                console.log('onAfterError', from, to, err)
            }
        }
    });
    listInstances.set(index, instanceFSM)
    instanceFSM.trigger("start");
}
export async function scrollFSM(index, action) {
    const instance = listInstances.get(index)
    console.log('scroll', index, action)
    if (instance !== undefined) {
        if (action === 'input') {
            instance.trigger("ioInput");
        } else {
            instance.trigger("ioOutput");
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