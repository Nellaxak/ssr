'use server'
//import { Suspense } from "react";//
import statusMap from "./statusMap";
//proxy object
class Item {
  static count = 0;
  static arrObj = new Map();
  constructor(id, obj) {
    if (obj) {
      Object.entries(obj).map(([key, value]) => this[key] = value);
    }
    this.id = id
    this.status = 0
    statusMap.set(Number(id), 0)
    Item.arrObj.set(Number(id), this)
    //console.log('constructor', id)
  }
  /*async getStatus() {
    console.log('getStatus', this.id, this.status, typeof this.status)
    if (this.status === 1) {
      //await Item.setCount(1)
      return 'В КОРЗИНЕ'
    } else {
      //await Item.setCount(-1)
      return 'ЗАКАЗАТЬ'
    }
  }*/
  async setStatus() {
    console.log('setStatus old', this.id, this.status)
    this.status = Number(!this.status)
    if (Number(this.status) === 1) {
      await Item.setCount(1)
    }
    else {
      await Item.setCount(-1)
    }
   // Item.arrObj.set(Number(id), this)
    statusMap.set(Number(this.id), this.status)
  }
  static async findById(ppp) {
    //console.log('findById', ppp, typeof ppp)
    return this//Item.arrObj.get(ppp);
  }
  static async setCount(value) {
    Item.count = Item.count + value
  }
  static async getCount() {
    return Item.count
  }
}
export default Item