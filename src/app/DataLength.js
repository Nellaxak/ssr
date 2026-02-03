'use server'
//import { Suspense } from "react";//
import Item from "./Item";
import { linkedList } from "./LinkedList";
import generateSequence from "./Generator";
import PriorityQueue, { pq } from "./TaskQueue";
async function CalcData(params) {
  //console.log('CalcData', await params)
  //const count = await CountPage.getCount();
  let currentDate = new Date()
  currentDate.setDate(currentDate.getDate());
  const page = params

  //if (Number(page) > 0) {
  const newPage = Number(currentDate.getDate()) + Number(page)
  currentDate.setDate(newPage);//+1
  //}
  /*let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate());
  //console.log('page**', page)
  //if (Number(page) > 0) {
  const newPage1 = Number(tomorrow.getDate()) + Number(page)// + 1//+1 offset
  //console.log('if', tomorrow.getDate())
  tomorrow.setDate(newPage1);//+1
  //}
  */
  //console.log('myDate', new Intl.DateTimeFormat('ru-RU', optionsDate).format(currentDate))
  let startDate = currentDate.getFullYear() + '-' +
    (currentDate.getMonth() + 1) + '-' +
    currentDate.getDate();
  /*let endDate = tomorrow.getFullYear() + '-' +
      (tomorrow.getMonth() + 1) + '-' +
      tomorrow.getDate();*/
  //console.log('return data', startDate, endDate)
  /*return new Promise((resolve) => {
      resolve([startDate, endDate])
  })*/
  return startDate//, endDate]
}
//proxy object
class DataLength {
  static arr = [];
  static page = -1;
  constructor(id, obj) {
    //console.log('constructor', id, typeof id)

  }
  static async getArr() {
    return DataLength.arr
  }
  static async setArr(pageParam) {
    if (pageParam !== DataLength.page) {
      let resObj2
      //let generator = generateSequence();
      const startDate = await CalcData(pageParam)
      pq.enqueue(async () => {
        console.log('fetch')
        const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`,
          { cache: 'force-cache' },
          { next: { tags: ['items'] } }
        );
        const data = await resp.json()
        const list = data.near_earth_objects
        const arrObjects22 = Object.values(list)
        resObj2 = arrObjects22.flat()
        await Promise.all(//allSettled
          resObj2.map(data => new Item(Number(data.id))))
        /*generator.next('start')
        generator.next(pageParam, arrParams) */
        //linkedList.fromArray(arrParams)
        DataLength.arr = DataLength.arr.concat(resObj2)
      }, 10);
      pq.process();
      DataLength.page = pageParam
    }
    return true
  }
}
export default DataLength