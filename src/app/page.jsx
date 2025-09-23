import React from "react";
import Image from "next/image";
import Form from 'next/form';
import { Transform } from "stream";
import { buttonClick } from './actions/updateStatus';
import styles from "./page.module.css";
import Li from './Li'

//let data = []
async function CalcData() {
  let currentDate = new Date()
  currentDate.setDate(currentDate.getDate());//+1
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate());//+1
  //console.log('myDate', currentDate, endNext)
  let startDate = currentDate.getFullYear() + '-' +
    (currentDate.getMonth() + 1) + '-' +
    currentDate.getDate();
  let endDate = tomorrow.getFullYear() + '-' +
    (tomorrow.getMonth() + 1) + '-' +
    tomorrow.getDate();
  //console.log('return data', startDate, endDate)
  return new Promise((resolve) => {
    resolve([startDate, endDate])
  })
  //return { startDate, endDate }
}

class RegexTransform extends Transform {
  constructor(regex, replacer) {
    super();
    this.regex = regex;
    this.replacer = replacer;
    this.buffer = ""; // Buffer to handle partial matches across chunks
  }

  _transform(chunk, encoding, callback) {
    this.buffer += chunk.toString(encoding); // Add current chunk to buffer

    // Process the buffer with the regex, potentially multiple times
    let match;
    let lastIndex = 0;
    while ((match = this.regex.exec(this.buffer)) !== null) {
      // Push the part before the match
      this.push(this.buffer.substring(lastIndex, match.index));
      // Push the replaced content
      this.push(match[0].replace(this.regex, this.replacer));
      lastIndex = this.regex.lastIndex;
    }

    // Keep only the un-matched tail of the buffer for the next chunk
    this.buffer = this.buffer.substring(lastIndex);
    callback();
  }

  _flush(callback) {
    // Push any remaining buffered content
    if (this.buffer.length > 0) {
      this.push(this.buffer);
    }
    callback();
  }
}
export default async function Home() {
  let startDate
  let endDate
  let sharedUint8Array
  [startDate, endDate] = await CalcData()
  //const viewtype = params.viewtype
  //const items = await http<Item[]>(`http://localhost:3456/${viewtype}`) as Item[];
  const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`);
  //const ress=await resp.arrayBuffer()
  const dat = await resp.json()
 // const obj = JSON.parse(dat);
  console.log('date', startDate, endDate, dat)
  //let streamResult=new Uint8Array(99999);
  /*let TextResult = ''
  let li
  await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`)
    .then((response) => response.body)
    .then((rb) => {
      const reader = rb.getReader();

      return new ReadableStream({
        start(controller) {
          // The following function handles each data chunk
          function push() {
            // "done" is a Boolean and value a "Uint8Array"
            reader.read().then(({ done, value }) => {
              // If there is no more data to read
              if (done) {
                console.log("done", done);
                controller.close();
                return;
              }
              // Get the data and send it to the browser via the controller
              controller.enqueue(value);
              // Check chunks by logging to the console
              console.log('chunk', done, value);
              //const sharedBuffer = new SharedArrayBuffer(value.byteLength);
              //sharedUint8Array = new Uint8Array(sharedBuffer);
              // 3. Copy the data from the original Uint8Array to the shared Uint8Array
              //sharedUint8Array.set(value);
              //console.log('sharedUint8Array',sharedUint8Array)
              const decoder = new TextDecoder('utf-8');
              // Decode the Uint8Array into a string
              const textString = decoder.decode(value);
              //:{"self":
              const regex = /:{"self":/g; //start li tag// g - глобальный флаг для поиска всех вхождений
              //const regexEnd = /},{"links":/g;
              /*const matchesIterator = textString.matchAll(regex);//matchAll->test 
              const matchesArray = Array.from(matchesIterator); // Преобразование итератора в массив
              const count = matchesArray.length;
              console.log('count', count)*/
  /*li=React.createElement('li',null,'dddd')//to Uint8Array
  console.log()
  textString.replaceAll(`:{"self":`,li);
  //create many li-for,while?-sync
  //new Li(e, dates[0])
  TextResult = TextResult + textString
  //streamResult.set(value)
  push();
});
}
push();
},
});
})
.then((stream) =>
// Respond with our stream
new Response(stream, { headers: { "Content-Type": "text/html" } }).text(),
)
.then((result) => {
// Do things with result
console.log(result);
});*/
  /*if (Number(resp.status) === 200) {
    data = await resp.json()
    //console.log('NASA data__________', data)
    const list = data.near_earth_objects
    const dates = Object.keys(list)
    const arrObjects = Object.values(list)
    await Promise.all(arrObjects[0].map(
      async (e) => new Li(e, dates[0])
    ));
  } else {
    console.log('Nasa api request status', resp.status)
  }
  return await Li.getList()*/
  //console.log('TextResult',TextResult)
  return 'sssssssssssss'//TextResult
}
