'use server'
//import { Suspense } from "react";//
//import statusMap from "./statusMap";
//proxy object
class DataLength {
  static arr = [];
  static page = 0;
  constructor(id, obj) {
    //console.log('constructor', id, typeof id)

  }
  static async getArr() {
    return DataLength.arr
  }
  static async setArr(pageParam, arrParams) {
    if (pageParam !== DataLength.page) {
      DataLength.arr = DataLength.arr.concat(arrParams)
      DataLength.page = pageParam
    }
  }
}
export default DataLength