import Image from "next/image";
import Form from 'next/form';
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
export default async function Home() {
  let startDate
  let endDate
  [startDate, endDate] = await CalcData()
  //const viewtype = params.viewtype
  //const items = await http<Item[]>(`http://localhost:3456/${viewtype}`) as Item[];
  //const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`);
  console.log('date', startDate, endDate)
  let streamResult=new Uint8Array(99999);
  //const uint8 = new Uint8Array(2);
  let TextResult=''
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
              const decoder = new TextDecoder('utf-8');
              // Decode the Uint8Array into a string
              const textString = decoder.decode(value);
              //console.log('textString', textString)
              TextResult=TextResult+textString
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
    });
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
  }*/
  return TextResult
  //return streamResult.buffer
}
