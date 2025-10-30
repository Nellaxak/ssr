'use server'
import React, { createElement } from "react";
//import Button from "@/components/Button/page";
//import LiItemLayout from "@/layouts/layout";
import Link from 'next/link'
import styles from "./page.module.css";
//import { buttonClick } from "./actions/updateStatus";
//import ListItem1 from "@/components/ListItem1/page";
//import Form from 'next/form'
//import FSM from "./finite-state-machines";
//import LiItemLayout from "@/app/categories/[viewtype]/[page]/@list/layout";
/*import Server from 'socket.io';

Server.on('connection', (socket) => {
  socket.on('output', async (data) => {
    console.log('output', data)
  })
})*/
class Li {
  /*private date: any;
  private element_count: any;
  private id: any;
  private name: any;
  private diameter: any;
  private status: any;
  private button: any;
  private updateUserWithId: any;
  private text: any;
  private form: any;*/
  static arrResult = new Map();
  static arrObj = new Map();
  static count = 0;
  static viewtype = 'main'//async getter
  //static hiddenElements = new Map();
  //static pageSizeItems = 15//for first load
  //static countFirstPageSize=0//add getter/setter
  //private result: any;
  constructor(obj, dates) {
    Object.entries(obj).map(([key, value]) => this[key] = value);
    this.status = 0
    this.form = [this.getName(), this.getButton()]
    Li.arrObj.set(Number(this.id), this)
    this.result = createElement('li', { key: this.id, className: styles.li }, this.form)
    Li.arrResult.set(Number(this.id), this.result)
    //}
  }
  static getViewtype() {
    return Li.viewtype; // Static method to access the static variable
  }
  /*static async #getInternalAsyncValue() {
    //await new Promise(resolve => setTimeout(resolve, 1000));
    return Li.viewtype//"This is a private async static value.";
  }*/

  /*static get asyncValue() {
    return Li.#getInternalAsyncValue();
  }*/
  /*static async initializeData(value) {
    // Perform async operations here
    //await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
    Li.viewtype = value;
    //console.log(`Static data initialized to: ${MyClass._data}`);
  }*/
  static async deleted(action, col) {
    if (action === 'down') {
      //Li.arrResult.splice(0, Number(col));
      console.log('after down', Li.arrResult.length)
    }
  }
  static async getCount() {
    return new Promise(resolve => {
      resolve(Li.count);
    });
  }
  static async setCount(value) {
    Li.count = Li.count + value
  }
  /*async getId() {
    return createElement('input',
      { type: "text", key: 'id', defaultValue: this.id, name: 'id' })
  }*/
  async getName() {
    return createElement(Link, {
      key: this.id,
      className: styles.link,
      prefetch: false,
      href: `/itemDetail/${this.id}`,
    }, this.name)
  }
  async getStatus() {
    //change css
    if (this.status) {
      //await setCount(1)
      return 'в корзине'
    } else {
      //await setCount(-1)
      return 'заказать'
    }
  }
  async getButton() {
    let status = await this.getStatus()
    //let viewtype1 = await Li.#getInternalAsyncValue()
    let viewtype1 = Li.getViewtype()//String(Li.viewtype)
    return createElement(Link, {
      key: this.id,
      className: styles.buttonItem,
      prefetch: false,
      href: `/categories/${viewtype1}/click/${this.id}/status/${this.status}`,
    }, String(status))
  }
  /*async getDate() {
    return createElement('span', { key: 'date' }, this.date)
  }*/
  static async findById(ppp) {
    let resss = false
    resss = Li.arrObj.get(Number(ppp));
    if (resss === undefined) {
      resss = false
    }
    return resss
  }
  async setForm() {
    this.form = [await this.getName(), await this.getButton()]
  }
  static async getList() {
    const resd = Array.from(Li.arrResult.values())
    return resd
    /*return new Promise(resolve =>
      resolve(Li.arrResult)
    )*/
  }
  async setStatus() {
    this.status = Number(!this.status);//Number(!Boolean(oldStatus))
    await this.setForm()
    this.result = createElement('li', { key: this.id, className: styles.li }, this.form)
    //Li.arrObj.set(Number(this.id), this)
    Li.arrResult.set(Number(this.id), this.result)
  }
}
export default Li