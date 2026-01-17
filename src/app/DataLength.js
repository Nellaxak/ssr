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
    //console.log(linkParams,'mmmm',arrParams.length)
    if (pageParam !== DataLength.page) {
      //shift/unshift
      if (linkParams === 'start' || linkParams === 'bottom') {
        //console.log('start',...arrParams)
        //DataLength.arr = DataLength.arr.concat(arrParams)//insert in head/tail arr
        DataLength.arr.push(...arrParams)
      } else {
        console.log('startllll', linkParams)
        DataLength.arr.unshift(...arrParams)
      }
      DataLength.page = pageParam
    }
    return true
  }
}
export default DataLength