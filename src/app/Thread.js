import worker_threads from 'node:worker_threads';
const { Worker, isMainThread, parentPort } = require('worker_threads');
export class Thread {
    //static _instance = null
    constructor() {
        /* Код главного потока */
        // Инициализируем буфер c двумя счетчиками 
        // [*делают броски*, *тренируют катание*]
        const buffer = new SharedArrayBuffer(2);
    }
    getData() { }

}
