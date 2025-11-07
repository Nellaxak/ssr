'use server'
import React, { createElement, Suspense } from "react";
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
  static arrResultMoon = new Map();
  static arrObj = new Map();
  static count = 0;
  static viewtype = 'main'//async getter
  //static hiddenElements = new Map();
  //static pageSizeItems = 15//for first load
  //static countFirstPageSize=0//add getter/setter
  //private result: any;
  constructor(obj, dates) {
    Object.entries(obj).map(([key, value]) => this[key] = value);
    if (!Li.arrObj.get(Number(this.id))) {
      this.status = 0
      this.form = [this.getName(), this.getButton('main')]
      //Li.setViewtype('moon')
      this.formMoon = [this.getName(), this.getButton('moon')]
      //Li.setViewtype('main')
      Li.arrObj.set(Number(this.id), this)
      this.result = createElement('li', { key: this.id, className: styles.li }, this.form)
      this.resultMoon = createElement('li', { key: this.id, className: styles.li }, this.formMoon)
      Li.arrResult.set(Number(this.id), this.result)
      Li.arrResultMoon.set(Number(this.id), this.resultMoon)
    }
  }
  static async getSize(){
    return Li.arrObj.size
  }
  static async getViewtype() {
    return Li.viewtype;
  }
  static async setViewtype(value) {
    Li.viewtype = value;
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
    //change css
    if (this.status) {
      //await setCount(1)
      return 'в корзине'
    } else {
      //await setCount(-1)
      return 'заказать'
    }
  }
  async getButton(par) {
    let status = await this.getStatus()
    //let viewtype1 = await Li.getViewtype()
    let dfff = 'main'
    if (typeof par === "undefined") {
      dfff = await Li.getViewtype()
    } else {
      dfff = par
    }
    //par = await Li.getViewtype()
    //console.log('getter viewtype', viewtype1)
    return createElement(Link, {
      key: this.id,
      className: styles.buttonItem,
      prefetch: false,
      href: `/categories/${dfff}/click/${this.id}`,
      scroll: false,
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
  async setForm(par) {
    if (par === 'main') {
      this.form = [await this.getName(), await this.getButton(par)]
    }
    else {
      this.formMoon = [await this.getName(), await this.getButton(par)]
    }
  }
  /*async setFormMoon() {
    this.formMoon = [await this.getName(), await this.getButton('moon')]
  }*/
  static async getList(par) {
    //console.log('getList', par)
    let resd
    //main
    if (par === 'main') {
      resd = Array.from(Li.arrResult.values())
    } else {
      resd = Array.from(Li.arrResultMoon.values())
    }
    //moon
    return resd
    /*return new Promise(resolve =>
      resolve(Li.arrResult)
    )*/
  }
  async setStatus(viewtype) {
    this.status = Number(!this.status);//Number(!Boolean(oldStatus))
    //let vvvv = await Li.getViewtype()
    await this.setForm(viewtype)
    //await this.setFormMoon()
    this.result = createElement('li', { key: this.id, className: styles.li }, this.form)
    this.resultMoon = createElement('li', { key: this.id, className: styles.li }, this.formMoon)//formMoon
    Li.arrResult.set(Number(this.id), this.result)
    Li.arrResultMoon.set(Number(this.id), this.resultMoon)
  }
}
export default Li