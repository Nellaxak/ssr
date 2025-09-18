import Image from "next/image";
import styles from "./page.module.css";
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
export default async function Home() {
  let startDate
  let endDate
  [startDate, endDate] = await CalcData()
  //const viewtype = params.viewtype
  //const items = await http<Item[]>(`http://localhost:3456/${viewtype}`) as Item[];
  const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`);
  //console.log('data', resp.status)
  if (Number(resp.status) === 200) {
    const data = await resp.json()
    console.log('data', data)
  } else {
    console.log('request status',resp.status)
  }
  return (
    <ul>

    </ul>
  )
}
