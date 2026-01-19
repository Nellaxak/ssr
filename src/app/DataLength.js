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
    console.log('linkParams', linkParams)
    if (pageParam !== DataLength.page) {
      dll.dataNode = links
      //switch case
      if (linkParams === 'start') {
        await dll.append(nodeDll)
      }
      if (linkParams === 'next') {
        console.log('bottom scroll', nodeDll.next)
        await dll.append(nodeDll.next)
      }
      if (linkParams === 'prev') {
        await dll.prepend(nodeDll.prev)
      }
      DataLength.page = pageParam
    }
    return true
  }
}
export default DataLength