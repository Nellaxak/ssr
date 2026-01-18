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
      if (linkParams === 'start') {
        await dll.append(nodeDll)
      }
      else if (linkParams === 'next') {
        await dll.append(nodeDll.next)
      } else {
        await dll.prepend(nodeDll.prev)
      }
      DataLength.page = pageParam
    }
    return true
  }
}
export default DataLength