import React from "react";
import Image from "next/image";
import Form from 'next/form';
import { Transform } from "stream";
import { buttonClick } from './actions/updateStatus';
import styles from "./page.module.css";
import Li from './Li'

//let data = []
async function CalcData() {
  let currentDate = new Date()
  currentDate.setDate(currentDate.getDate());//+1
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate());//+1
  //console.log('myDate', currentDate, endNext)
  let startDate = currentDate.getFullYear() + '-' +
    (currentDate.getMonth() + 1) + '-' +
    currentDate.getDate();
  let endDate = tomorrow.getFullYear() + '-' +
    (tomorrow.getMonth() + 1) + '-' +
    tomorrow.getDate();
  //console.log('return data', startDate, endDate)
  return new Promise((resolve) => {
    resolve([startDate, endDate])
  })
  //return { startDate, endDate }
}
const person = {
  firstName: "John",
  lastName: "Doe",
  element_count: 0,
  _age: 30, // Conventionally, a leading underscore indicates a private or internal property
  get element_count() {
    console.log('getter', this.element_count)
    return this.element_count;
  },
  set element_count(value) {
    console.log('setter', value)
    this.element_count = value;
  },
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  set age(newAge) {
    if (newAge >= 0 && newAge <= 120) { // Example validation
      this._age = newAge;
    } else {
      console.warn("Invalid age provided.");
    }
  },

  get age() {
    return this._age;
  }
};
export default async function Home() {
  let startDate
  let endDate
  [startDate, endDate] = await CalcData()
  //const viewtype = params.viewtype
  //const items = await http<Item[]>(`http://localhost:3456/${viewtype}`) as Item[];
  const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`);
  const dat = await resp.json()
  console.log('date', startDate, endDate, dat)
  //let descriptor = Object.getOwnPropertyDescriptor(dat, 'element_count');
  //Object.setPrototypeOf(dat, person)
  const obj=dat.near_earth_objects
  Object.defineProperty(obj, 'value', {
    get: function() {
      console.log('Получаем значение');
      return this.value; // Возвращаем внутреннее свойство
    },
    set: function(newValue) {
      console.log('Устанавливаем значение');
      if (typeof newValue === 'number') {
        this.value = newValue; // Устанавливаем внутреннее свойство
      } else {
        console.error('Значение должно быть числом!');
      }
    }
  });
  console.log('obj', dat.element_count)//,dat.near_earth_objects)
  return 'sssssssssssss'
}
