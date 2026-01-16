'use server'
//import { Suspense } from "react";//
//import statusMap from "./statusMap";
//proxy object
class DataLength {
  static arr = [];
  static page = -1;
  constructor(id, obj) {
    //console.log('constructor', id, typeof id)

  }
  static async getArr() {
    console.log('after concat', DataLength.arr.length)
    return DataLength.arr
  }
  static async setArr(pageParam, arrParams) {
    console.log('set arr all')
    if (pageParam !== DataLength.page) {
      console.log('set arr')
      DataLength.arr = DataLength.arr.concat(arrParams)
      DataLength.page = pageParam
    }
    return true
  }
}
export default DataLength