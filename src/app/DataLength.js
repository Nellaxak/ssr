'use server'
import dll from "./DoublyLinkedList";
class DataLength {
  static arr = [];
  static page = '-1';
  constructor(id, obj) {
    //console.log('constructor', id, typeof id)

  }
  static async getArr(url) {
    //const find = await dll.find(url)
    //console.log('find', find)
    const arr = await dll.toArray(dll.dataNode)
    return arr
  }
  static async setArr(pageParam, linkParams, nodeDll) {
    //console.log('linkParams', linkParams)
    if (pageParam !== DataLength.page) {
      //switch case/object literals
      if (linkParams === 'start') {
        const self = await dll.append(nodeDll.self)
        console.log('vvvvv', self)
        //dll.dataNode = self
      }
      if (linkParams === 'next') {
        //console.log('bottom scroll', nodeDll, nodeDll.next)
        const next = await dll.append(nodeDll.next)
        //console.log('vvvvvN', self)
        //dll.dataNode = next
      }
      if (linkParams === 'prev') {
        const prev = await dll.prepend(nodeDll.prev)
        //dll.dataNode = prev
      }
      DataLength.page = pageParam
    }
    return true
  }
}
export default DataLength