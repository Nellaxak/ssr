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
      const self = await dll.append(nodeDll.self, true)
      await dll.prepend(nodeDll.prev)
      await dll.append(nodeDll.next)
      DataLength.page = pageParam
    }
    return true
  }
}
export default DataLength