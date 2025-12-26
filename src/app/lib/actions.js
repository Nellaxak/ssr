'use server'
import { revalidateTag } from 'next/cache';
import Item from '../Item';
import LinkedList,{linkedList} from '../LinkedList'
import HFSM from '../HFSM'

const listInstances = new Map()
const instanceItem = new Map()
const instanceLinkedList = new Map()
//const ll = new LinkedList()
//instanceLinkedList.set(0, ll)
/*const initializeApp = function (eventMessage) {
    console.log('App initialized:', eventMessage);
    const ll = new LinkedList()
    instanceLinkedList.set(0, ll)
    return ll
};
const callOnce = (fn) => {
    let hasBeenCalled = false;
    let result; // Variable to store the result of the first call

    return function (...args) {
        if (!hasBeenCalled) {
            hasBeenCalled = true;
            // Use apply to ensure correct 'this' context and pass arguments
            result = fn.apply(this, args);
        }
        // Subsequent calls return the cached result
        return result;
    };
};*/
//export async function createLinkedListInstance() {
    //const initOnce = callOnce(initializeApp)
    //return initOnce(0)
    //const ll = instanceLinkedList.get(0)
    //return ll
    //console.log('single function call')

//}
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
                //console.log('_scroll inside', index, from)//, obj.id)
                if (from === 'outside') {
                    //linkedList.append(obj)//append next node ll
                    //tail.prev
                    //const ll = instanceLinkedList.get(0)
                    console.log('scroll inside', index, linkedList)//, obj.id)
                    //console.log('tail0000', ll.tail, ll.tail.value)//, obj.id)
                    // if (ll.tail.value) {
                    //console.log('tail_value', ll.tail?.value === obj)
                    // }
                    //,Object.getOwnPropertyNames(ll.tail))
                    /*if (ll.tail.value.id === obj.id) {
                        console.log('scroll inside tail', index)
                    }*/
                }
                //console.log('onAfterIoInput', index, from, to)
            },
            onAfterIoOutput: async (from, to) => {
                // Что то делаем
                if (from === 'inside') {
                    console.log('scroll outside', index, instanceLinkedList.get(0))
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
    //console.log('listInstances set', index)
    const item = new Item(Number(obj.id), obj)
    instanceItem.set(Number(obj.id), item)
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
export async function toggleClick(params) {
    const id = Number(params)
    const item = instanceItem.get(id)
    await item.setStatus()
    console.log('count', Item.count)
    //statusMap.set(id, !statusMap.get(id))
    revalidateTag('items', 'max')
}