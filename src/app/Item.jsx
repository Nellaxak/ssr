'use server'
import { Suspense } from "react";

class Item {
  static count = 0;
  /*constructor(id) {
    this.id = id
    this.status = 0
  }*/
  static async setCount(value) {
    Item.count = Item.count + value
  }
  static async getCount() {
    return Item.count
  }
}
export default Item