'use server'
//import { Suspense } from "react";//
//import statusMap from "./statusMap";
//proxy object
class DataLength {
  static count = 0;
  static page = 0;
  constructor(id, obj) {
    //console.log('constructor', id, typeof id)

  }
  static async getCount() {
    return DataLength.count
  }
  static async setCount(pageParam, lenthParams) {
    if (pageParam !== DataLength.page) {
      DataLength.count = DataLength.count + Number(lenthParams)
      DataLength.page = pageParam
    }
  }
}
export default DataLength