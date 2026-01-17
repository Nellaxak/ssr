'use server'

class DataLength {
  static arr = [];
  static page = '-1';
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
    return true
  }
}
export default DataLength