'use server'
//import { Suspense } from "react";//
import statusMap from "./statusMap";
//proxy object
class Item {
  static count = 0;
  constructor(id) {
    this.id = id
    this.status = 0
  }
  async getStatus() {
    console.log('getStatus', this.id, this.status, typeof this.status)
    if (this.status === 1) {
      //await Item.setCount(1)
      return 'В КОРЗИНЕ'
    } else {
      //await Item.setCount(-1)
      return 'ЗАКАЗАТЬ'
    }
  }
  async setStatus() {
    console.log('setStatus', this.id, Number(!this.status))
    //await Item.setCount(1)
    this.status = Number(!this.status)
  }
  static async findById(ppp) {
    console.log('findById', typeof ppp)
    const resss = statusMap.get(ppp);
    return resss
  }
  static async setCount(value) {
    Item.count = Item.count + value
  }
  static async getCount() {
    return Item.count
  }
}
export default Item