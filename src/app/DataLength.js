'use server'
import dll from "./DoublyLinkedList";
class DataLength {
  static arr = [];
  static page = '-1';
  constructor(id, obj) {
    //console.log('constructor', id, typeof id)

  }
  static async getArr() {
    const arr = await dll.toArray()
    return arr
  }
  static async setArr(pageParam, linkParams, links, nodeDll) {
    //doubleLinkedList
    if (pageParam !== DataLength.page) {
      dll.dataNode = links
      if (linkParams === 'start' || linkParams === 'next') {
        await dll.append(nodeDll)
        //DataLength.arr = DataLength.arr.concat(arrParams)//insert in head/tail arr
        //DataLength.arr.push(...arrParams)
      } else {
        await dll.prepend(nodeDll)
        //DataLength.arr.unshift(...arrParams)
      }
      DataLength.page = pageParam
    }
    return true
  }
}
export default DataLength