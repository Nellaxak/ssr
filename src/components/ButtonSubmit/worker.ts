import { Worker, workerData, isMainThread, parentPort } from 'node:worker_threads';
//const { Worker, workerData, isMainThread, parentPort } = require('worker_threads');
//const { parentPort, workerData } = require('worker_threads');
/*parentPort.on('message', (msg) => {
    console.log('in_worker', msg)
    const result = msg * 2;
    parentPort.postMessage(result);
});*/
self.onmessage = async (e: MessageEvent<string>) => {
    console.log('worker222', e.data)
    //const url = `https://dog.ceo/api/breeds/image/random/${e.data}`;

    //const response = await fetch(url).then((res) => res.json());

    self.postMessage(e.data);

};
