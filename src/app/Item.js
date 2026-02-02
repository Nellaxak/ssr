'use server'
//import { Suspense } from "react";//
import statusMap from "./statusMap";
import Singleton from './Singleton'
//proxy object
class Item {
  static count = 0;
  static arrObj = new Map();
  //static instance=null
  constructor(id) {
    /*if (obj) {
      Object.entries(obj).map(([key, value]) => this[key] = value);
    }*/
    /*if (Item.instance) {
      return Item.instance; // Возвращаем уже созданный экземпляр
    }*/
    //this.data = "Я единственный экземпляр";
    //Item.arrObj.size===0?
    // if (Item.arrObj.get(Number(id)) === undefined) {
    //this = new Singleton();
    this.id = id
    this.status = false//new Status()
    //statusMap.set(Number(id), this.status)
    this.setStatus = this.setStatus.bind(this);
    Item.arrObj.set(Number(id), this)
    //console.log('constructor', id)
  }
  // Item.instance = this; // Сохраняем экземпляр
  //}
  /*static async getStaticProperty(){
    return Item.arrObj
  }
  static async setStaticProperty(newValue){
    return Item.arrObj.set(Number(id), newValue)
  }*/
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
  //this.fullName = function() {
  async setStatus() {
    console.log('setStatus old', this.id, this.status)
    this.status = !this.status
    console.log('setStatus new', this.id, this.status)
    /*if (Number(this.status) === 1) {
      await Item.setCount(1)
    }
    else {
      await Item.setCount(-1)
    }*/
    Item.arrObj.set(Number(this.id), this)
    // if (statusMap.get(Number(this.id)) === undefined) {
    //statusMap.set(Number(this.id), this.status)
    // }
  }
  /*static async findById(ppp) {
    //console.log('findById', ppp, typeof ppp)
    return this//Item.arrObj.get(ppp);
  }*/
  static async setCount(value) {
    Item.count = Item.count + value
  }
  static async getCount() {
    return Item.count
  }
}
Item.arrObj = new Map();
export default Item