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
  async getCount() {
    return DataLength.count
  }
  async setCount(pageParam, lenthParams) {
    if (pageParam !== page) {
      DataLength.count = DataLength.count + Number(lenthParams)
    }
  }
}
export default DataLength