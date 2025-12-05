'use server'
//import statusMap from "./statusMap";
//proxy object
class CountPage {
  static count = 0;
  constructor() {
    //console.log('constructor', id, typeof id)
   // this.id = id
    //this.status = 0
  }
  static async setCount(value) {
    CountPage.count = CountPage.count + value
  }
  static async getCount() {
    return CountPage.count
  }
}
//const count=new CountPage()
export default CountPage