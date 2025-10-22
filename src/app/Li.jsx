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
  static arrResult = []//new Map();
  static arrObj = new Map();
  static count = 0;
  //static hiddenElements = new Map();
  //static pageSizeItems = 15//for first load
  //static countFirstPageSize=0//add getter/setter
  //private result: any;
  constructor(obj, dates) {
    //console.log('_____________________________________________bbb',dates)
    Object.entries(obj).map(([key, value]) => this[key] = value);
    this.status = false
    this.form = [this.getName(), this.getButton()]
    Li.arrObj.set(Number(this.id), this)
    this.result = createElement('li',{ key: this.id, className: styles.li }, this.form)
    //console.log('constructor',this.id)
    Li.arrResult.push(Number(this.id), this.result)
    //}
  }
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
    return this.status
  }
  async getButton() {
    const status=!this.status//await this.getStatus()
    //return createElement('button', { key: 'btn', type: 'submit' }, status)
    return createElement(Link, {
      key: this.id,
      className: styles.buttonItem,
      prefetch: false,
      href: `/categories/main/click/${this.id}`,//get categories/viewtype? in ssr component
    }, status)
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
  /*async setForm() {
    this.form = <Form action={buttonClick}>
      {[await this.getId(), await this.getName(), await this.getButton()]}
    </Form>
  }*/
  static async getList(viewtype) {
    //const resd = Array.from(Li.arrResult.values())
    return Li.arrResult
    /*return new Promise(resolve =>
      resolve(Li.arrResult)
    )*/
  }
  /*static async getSizeList(){
    return Li.arrResult.size
  }*/
  async setStatus() {
    //console.log('setStatus', value, this.id)
    const oldStatus=0//await this.getStatus()
    this.status = !Boolean(oldStatus);
    this.form = [await this.getName(), await this.getButton()]
    this.result = createElement('li', { key: this.id, className: styles.li }, this.form)
    Li.arrResult.push(Number(this.id), this.result)
  }
}
export default Li