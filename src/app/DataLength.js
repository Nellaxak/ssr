'use server'
//import dll, { DoublyLinkedList } from "./DoublyLinkedList";
import cll from './CircularLinkedList'
class DataLength {
  static arr = [];
  static page = '-1';
  constructor(id, obj) {
    //console.log('constructor', id, typeof id)

  }
  static async getArr() {
    //const find = await dll.find(url)
    //console.log('find', find)
    //const arr = //await dll.toArray(find)
    return DataLength.arr
  }
  static async setArr(pageParam, linkParams, nodeDll, page) {
    //console.log('linkParams', linkParams)
    if (pageParam !== DataLength.page) {
      DataLength.arr = []
      const respP = await fetch(`${nodeDll.prev}`,
        { cache: 'force-cache' }
      );
      const dataP = await respP.json()
      console.log('prev', dataP.element_count)
      const listP = dataP.near_earth_objects
      const arrObjects22P = Object.values(listP)
      const resObj2P = arrObjects22P.flat()
      DataLength.arr = DataLength.arr.concat(resObj2P);
      const resp = await fetch(`${nodeDll.self}`,
        { cache: 'force-cache' }
      );
      const data = await resp.json()
      console.log('self', data.element_count)

      const list = data.near_earth_objects
      const arrObjects22 = Object.values(list)
      const resObj2 = arrObjects22.flat()
      //nodes.push(...resObj2);//concat
      DataLength.arr = DataLength.arr.concat(resObj2);//concat

      const respN = await fetch(`${nodeDll.next}`,
        { cache: 'force-cache' }
      );
      const dataN = await respN.json()
      console.log('next', dataN.element_count)
      const listN = dataN.near_earth_objects
      const arrObjects22N = Object.values(listN)
      const resObj2N = arrObjects22N.flat()
      //nodes = nodes.concat(resObj2N);//concat
      DataLength.arr = DataLength.arr.concat(resObj2N);//concat
      for (let i = 0; i < 10; i++) {//page*9
        await cll.append(DataLength.arr[i]);
      }
      DataLength.page = pageParam
    }
    return true
  }
}
export default DataLength