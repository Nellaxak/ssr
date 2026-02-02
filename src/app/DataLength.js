'use server'
//import { Suspense } from "react";//
import Item from "./Item";
import { linkedList } from "./LinkedList";
import generateSequence from "./Generator";
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
  static async setArr(pageParam, arrParams) {
    if (pageParam !== DataLength.page) {
      //let generator = generateSequence();
      arrParams.map(data => new Item(Number(data.id)));
      /*generator.next('start')
      generator.next(pageParam, arrParams) */
      //linkedList.fromArray(arrParams)
      DataLength.arr = DataLength.arr.concat(arrParams)
      DataLength.page = pageParam
    }
    return true
  }
}
export default DataLength