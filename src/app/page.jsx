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
  let list
  let arrayHandler
  //const viewtype = params.viewtype
  //const items = await http<Item[]>(`http://localhost:3456/${viewtype}`) as Item[];
  const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`);
  if (Number(resp.status) === 200) {
    const dat = await resp.json()
    console.log('date', startDate, endDate, dat)
    //let descriptor = Object.getOwnPropertyDescriptor(dat, 'element_count');
    //Object.setPrototypeOf(dat, person)
    const obj = dat.near_earth_objects
    console.log('objProto',Object.getPrototypeOf(obj),Array.isArray(obj))
    list = Object.values(obj)
    /*list = new Proxy(list, {
      get(target, prop) {
        console.log('getter list',target[prop])
        if (prop in target) {
          return target[prop]
        } else { return 0 }
      }
    })*/
    arrayHandler = {
      // Intercept 'get' operations (reading properties or calling methods)
      get(target, prop, receiver) {
        console.log(`Getting property: ${String(prop)}`);
        // Example: Custom behavior for 'length'
        if (prop === 'length') {
          return target.length + 1; // Return a modified length
        }
        // Default behavior for other properties/methods
        const dddd=Reflect.get(target, prop, receiver)
        console.log('dddd',dddd)//array objects
        return React.createElement('li',null,'1111111111111111')
        //return Reflect.get(target, prop, receiver);
      },

      // Intercept 'set' operations (assigning values to properties)
      set(target, prop, value, receiver) {
        console.log(`Setting property: ${String(prop)} to ${value}`);
        // Example: Validate that only numbers can be added
        if (typeof value !== 'number' && typeof prop === 'string' && !isNaN(parseInt(prop))) {
          console.warn('Warning: Non-numeric value attempted to be added to the array.');
          return false; // Prevent the assignment
        }
        // Default behavior for other assignments
        return Reflect.set(target, prop, value, receiver);
      },

      // Intercept 'deleteProperty' operations (deleting properties)
      deleteProperty(target, prop) {
        console.log(`Deleting property: ${String(prop)}`);
        // Example: Prevent deletion of the first element
        if (prop === '0') {
          console.warn('Warning: Cannot delete the first element.');
          return false;
        }
        return Reflect.deleteProperty(target, prop);
      }
    };
    Object.defineProperty(obj, "2025-09-25", {
      get: function () {
        console.log('Получаем значение');
        return this.value; // Возвращаем внутреннее свойство
      },
      set: function (newValue) {
        console.log('Устанавливаем значение');
        if (typeof newValue === 'number') {
          this.value = newValue; // Устанавливаем внутреннее свойство
        } else {
          console.error('Значение должно быть числом!');
        }
      }
    });
    console.log('obj', obj["2025-09-25"])//,dat.near_earth_objects)
    
  } else {
    console.log('NASA API error fetch status', resp.status)
  }
  //const proxiedArray = new Proxy(list, arrayHandler);
  //console.log('proxiedArray',proxiedArray[0])
  return 'ssssss'//proxiedArray[0]
}
