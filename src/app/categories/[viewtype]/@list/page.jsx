import Li from "../../../Li";
import Form from "next/form";
import styles from "./page.module.css";
import React from "react";
import toggleClick from '../../../actions/toggleClick'

let resp
let startDate
let endDate
let resf
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
function List({ items, renderItem }) {
    //const [selectedIndex, setSelectedIndex] = useState(0);
    console.log('renderItem', renderItem)
    return (
        <div className="List">
            {items.map((item, index) => {
                //const isHighlighted = index === selectedIndex;
                return renderItem(item);
            })}</div>)
}
function Row(props) {
    console.log('Row', props)
    return <li>
        <span>{props.dates}</span>
        <span>{props.key}</span>
        <span>{props.obj.name}</span>
        <span>{props.obj.id}</span>
        <span>{props.obj.absolute_magnitude_h}</span>
        <output>{props.obj.close_approach_data[0].miss_distance.kilometers}</output>
        <span>{String(props.obj.is_potentially_hazardous_asteroid)}</span>
        <Form action={toggleClick}>
            <input type='number' name='status' defaultValue={0} hidden/>
            <button type='submit' />
        </Form>
    </li>
}
export default async function Home({ params }) {
    [startDate, endDate] = await CalcData()
    const promiseParams = await params
    const viewtype = promiseParams.viewtype

    //try {
    resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`
    );//revalidate tag change viewtype
    if (Number(resp.status) === 200) {
        const dat = await resp.json()
        const list = dat.near_earth_objects
        const dates = Object.keys(list)
        const arrObjects = Object.values(list)
        return <List items={arrObjects[0]}
            renderItem={(product) =>
                <Row
                    key={product.id}
                    obj={product}
                    viewtype={viewtype}
                    dates={dates[0]}
                />
            }
        />
    }

}