'use server'
import { revalidateTag } from 'next/cache';
import items from '../../app/lib/ArrayGlob'
import Item from '../Item';
import HFSM from '../HFSM'
//let cameraFSM
export async function mountItemFSM(index) {
    //function closure() {
    const instance = new HFSM(index)
    /*const cameraFSM = new HFSM({
        initial: "idle", // Камера по умолчанию неактивна
        index: index,
        transitions: {
            idle: [{ event: "start", to: "started" }], // Событие "start" -> попытка запуска камеры
            started: [
                { event: "openedForCall", to: "opened" }, // Камера успешно запущена и готова к звонку
                // { event: "error", to: "idle" }            // Ошибка при запуске камеры
            ],
            opened: [{ event: "close", to: "idle" }],   // Закрыть камеру
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
    return cameraFSM*/
    //}
    //return closure()
}
export async function startFSM(index) {
    console.log(cameraFSM, 'start', index)
    cameraFSM.trigger("start", index);
}
export async function scrollFSMDown(index) {
    cameraFSM.trigger("outgoingCall", "ScrollDown");
}
export async function scrollFSMUp(index) {
    cameraFSM.trigger("outgoingCall", "ScrollUp");
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