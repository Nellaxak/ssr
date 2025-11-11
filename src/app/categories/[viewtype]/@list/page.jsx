import Li from "../../../Li";
let resp
let resf
let startDate
let endDate
const parent = {
  getCount() {
    console.log("Hello from parent!");
    return 'bbbbb'
  }
};
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
    [startDate, endDate] = await CalcData()
    //console.log('cdfg',startDate, endDate)
    const promiseParams = await params
    const viewtype = promiseParams.viewtype
    const size = await Li.getSize()
    if (viewtype === 'main' && size === 0) {
        try {
        resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`
        );//revalidate tag
        if (Number(resp.status) === 200) {
            const dat = await resp.json()
            Object.setPrototypeOf(dat, parent);
            console.log('zzzzzxxxxx',dat.getCount())
            const list = dat.near_earth_objects
            const dates = Object.keys(list)
            const arrObjects = Object.values(list)
            await Promise.all(arrObjects[0].map(
                async (e) => new Li(e, dates[0])
            ));

        } else {
            console.log('NASA API error fetch status', resp.status)
        }
        } catch (err) {
            console.log('NASA API error fetch status###########', err)
        }
    }
    resf = await Li.getList(viewtype)
    return resf
}