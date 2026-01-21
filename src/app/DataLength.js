'use server'
import dll, { DoublyLinkedList } from "./DoublyLinkedList";
class DataLength {
  static arr = [];
  static page = '-1';
  constructor(id, obj) {
    //console.log('constructor', id, typeof id)

  }
  static async getArr() {
    //const find = await dll.find(url)
    //console.log('find', find)
    const arr = await dll.toArray()
    return arr
  }
  static async setArr(pageParam, linkParams, nodeDll) {
    //console.log('linkParams', linkParams)
    if (pageParam !== DataLength.page) {
      //switch case/object literals
      //if (linkParams === 'start') {
      await dll.append(nodeDll.self, true)
      await dll.prepend(nodeDll.prev)
      //console.log('vvvvv', DoublyLinkedList.dataNode)
      //dll.dataNode = self
      //}
      //if (linkParams === 'next') {
      //console.log('bottom scroll', nodeDll, nodeDll.next)
      await dll.append(nodeDll.next)
      //console.log('vvvvvN', DoublyLinkedList.dataNode)
      //console.log('vvvvvN', self)
      //dll.dataNode = next
      //}
      //if (linkParams === 'prev') {
      //dll.dataNode = prev
      //}
      DataLength.page = pageParam
    }
    return true
  }
}
export default DataLength