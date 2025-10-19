import Image from "next/image";
import styles from "./page.module.css";
import Li from '../Li'

let data = []
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
export default async function Home({ params }) {
  let startDate
  let endDate
  let resp
  [startDate, endDate] = await CalcData()
  //console.log('sssaaa', process.env)
  const viewtypePromise = await params
  const viewtype = viewtypePromise.viewtype
  console.log('page list', viewtypePromise)
  //const items = await http<Item[]>(`http://localhost:3456/${viewtype}`) as Item[];
  //if (viewtype === 'main') {//or moon
    resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`
    );//tag
  //}
  if (Number(resp.status) === 200) {
    const dat = await resp.json()
    const list = dat.near_earth_objects
    const dates = Object.keys(list)
    const arrObjects = Object.values(list)
    await Promise.all(arrObjects[0].map(
      //change prototype li
      async (e) => new Li(e, dates[0])
    ));
  } else {
    console.log('NASA API error fetch status', resp.status)
  }
  const resd = await Li.getList(viewtype)
  //console.log('resd',resd)
  return resd
}
