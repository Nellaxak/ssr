'use server'
import dll from "./DoublyLinkedList";
class DataLength {
  static arr = [];
  static page = '-1';
  constructor(id, obj) {
    //console.log('constructor', id, typeof id)

  }
  static async getArr(url) {
    const find = await dll.find(url)
    //console.log('find', find)
    const arr = await dll.toArray(find)
    return arr
  }
  static async setArr(pageParam, linkParams, links, nodeDll) {
    //doubleLinkedList
    if (pageParam !== DataLength.page) {
      dll.dataNode = links
      if (linkParams === 'start' || linkParams === 'next') {
        await dll.append(nodeDll)
      } else {
        await dll.prepend(nodeDll)
      }
      DataLength.page = pageParam
    }
    return true
  }
}
export default DataLength