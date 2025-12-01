'use server'
import { Suspense } from "react";

class Item {
  static count = 0;
  constructor(id) {
    this.id = id
    this.status = 0
  }
  async getStatus() {
    if (this.status === 1) {
      //await Item.setCount(1)
      return 'В КОРЗИНЕ'
    } else {
      //await Item.setCount(-1)
      return 'ЗАКАЗАТЬ'
    }
  }
  async setStatus() {
    //await Item.setCount(1)
    this.status = !this.status
  }
  static async setCount(value) {
    Item.count = Item.count + value
  }
  static async getCount() {
    return Item.count
  }
}
export default Item