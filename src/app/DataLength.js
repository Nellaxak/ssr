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
  static async setArr(pageParam, arrParams, linkParams) {
    if (pageParam !== DataLength.page) {
      //shift/unshift
      if (linkParams === 'bottom') {
        //DataLength.arr = DataLength.arr.concat(arrParams)//insert in head/tail arr
        DataLength.arr.shift(arrParams)
      } else {
        DataLength.arr.unshift(arrParams)
      }
      DataLength.page = pageParam
    }
    return true
  }
}
export default DataLength