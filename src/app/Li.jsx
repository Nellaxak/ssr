'use server'
import { createElement, Suspense } from "react";
import Link from 'next/link'
import styles from "./page.module.css";
//шаблон стратегия
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
  //static arrResultMoon = new Map();
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
      this.form = [this.getName(), this.getButton(), this.getDiameter(), this.getHazardous(), this.getDistance()]
      //this.formMoon = [this.getName(), this.getButton('moon'), this.getDiameter(), this.getHazardous(), this.getDistance()]
      Li.arrObj.set(Number(this.id), this)
      this.result = createElement('li', { key: this.id, className: styles.li }, this.form)
      //this.resultMoon = createElement('li', { key: this.id, className: styles.li }, this.formMoon)
      Li.arrResult.set(Number(this.id), this.result)
      //Li.arrResultMoon.set(Number(this.id), this.resultMoon)
    }
  }
  static set viewtype(v){
    console.log('setter vvvv',v)
    viewtype=v
  }
  static async getSize() {
    return Li.arrObj.size
  }
  static async getViewtype() {
    return Li.viewtype;
  }
  static async setViewtype(value) {
    //console.log('setViewtype',value)
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
  async getDistance() {
    if (Li.viewtype === 'main') {
      return <output><Suspense>
        {this.close_approach_data[0].miss_distance.kilometers}
      </Suspense></output>
    } else if (Li.viewtype === 'moon') {
      return <output><Suspense>{this.close_approach_data[0].miss_distance.lunar}</Suspense>
      </output>
    }
  }
  async getDiameter() {
    return this.absolute_magnitude_h
  }
  async getEstimatedDiameter() {
    return this.estimated_diameter
  }
  async getHazardous() {
    return this.is_potentially_hazardous_asteroid
  }
  async getStatus() {
    console.log('getStatus', this.id, this.status)
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
    //let dfff //= 'main'
    //if (typeof par === "undefined") {
    //dfff = await Li.getViewtype()
    // } else {
    // dfff = par
    //}
    //console.log('getter viewtype', viewtype1)
    return createElement(Link, {
      key: this.id,
      className: styles.buttonItem,
      prefetch: false,
      href: `/categories/${Li.viewtype}/click/${this.id}`,
      scroll: false,
    }, <Suspense>{status}</Suspense>)
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
    this.form = [await this.getName(), await this.getButton(), await this.getDiameter(), await this.getHazardous(), await this.getDistance()]
    //this.formMoon = [await this.getName(), await this.getButton('moon'), await this.getDiameter(), await this.getHazardous(), await this.getDistance()]
  }
  static async getList(par) {
    //console.log('getList', par)
    let resd
    //if (par === 'main') {
    resd = await Array.fromAsync(Li.arrResult.values())
    //}
    //else if (par === 'moon') {
    //resd = await Array.fromAsync(Li.arrResultMoon.values())
    //}
    //else {
    //resd = ''
    //}
    return resd
    /*return new Promise(resolve =>
      resolve(Li.arrResult)
    )*/
  }
  async setStatus() {
    this.status = Number(!this.status);//Number(!Boolean(oldStatus))
    await this.setForm()
    this.result = createElement('li', { key: this.id, className: styles.li }, this.form)
    //this.resultMoon = createElement('li', { key: this.id, className: styles.li }, this.formMoon)//formMoon
    Li.arrResult.set(Number(this.id), this.result)
    //Li.arrResultMoon.set(Number(this.id), this.resultMoon)
  }
}
export default Li