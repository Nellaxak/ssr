'use server'
//import { Suspense } from "react";//
import Item from "./Item";
import { linkedList } from "./LinkedList";
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
      // arrParams.map(data => new Item(Number(data.id)));
      linkedList.fromArray(arrParams)
      //DataLength.arr = DataLength.arr.concat(arrParams)
      DataLength.page = pageParam
    }
    return true
  }
}
export default DataLength