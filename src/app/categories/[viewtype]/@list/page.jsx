import Li from "../../../Li";
import Form from "next/form";
import styles from "./page.module.css";
import React from "react";
import statusMap from "../../../statusMap";
import Link from "next/link";
import { toggleClick } from '../../../actions/toggleClick'

let resp
let startDate
let endDate
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
    //console.log('renderItem', renderItem)
    return (
        <div className="List">
            {items.map((item, index) => {
                //const isHighlighted = index === selectedIndex;
                return renderItem(item);
            })}</div>)
}

function Row(props) {
    console.log('Row', props)
    /*<Form action={toggleClick}>
            <input type='number' name='id' defaultValue={props.obj.id} hidden />
            <button type='submit'>{statusMap.get(props.obj.id)}</button>
        </Form>*/
    const dataViewtype = props.obj.close_approach_data[0].miss_distance
    const status=statusMap.get(props.obj.id)
    return <li>
        <span>{props.dates}</span>
        <span>{props.key}</span>
        <span>{props.obj.name}</span>
        <span>{props.obj.id}</span>
        <span>{props.obj.absolute_magnitude_h}</span>
        <output>
            {(props.viewtype === 'main') ?
                dataViewtype.kilometers :
                dataViewtype.lunar
            }</output>
        <span>{String(props.obj.is_potentially_hazardous_asteroid)}</span>
        <Link key={props.obj.id}
            className={styles.buttonItem}
            prefetch={false}
            href={`/categories/${props.viewtype}/click/${props.obj.id}`}
            scroll={false}>{String(status)}</Link>
    </li>
}
export default async function Home({ params }) {
    [startDate, endDate] = await CalcData()
    const promiseParams = await params
    const viewtype = promiseParams.viewtype

    //try {
    resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`,
        { next: { tags: ['posts'] } }
    );//revalidate tag change viewtype
    if (Number(resp.status) === 200) {
        const dat = await resp.json()
        const list = dat.near_earth_objects
        const dates = Object.keys(list)
        const arrObjects = Object.values(list)
        return <List items={arrObjects[0]}
            renderItem={(product) => {
                if (statusMap.get(product.id) !== undefined) {
                    statusMap.set(product.id, 0)
                }
                return <Row
                    key={product.id}
                    obj={product}
                    viewtype={viewtype}
                    dates={dates[0]}
                />
            }
            }
        />
    }

}