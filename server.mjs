//server.js+proxy ip
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
async function CalcData(params) {
  //console.log('CalcData', await params)
  //const count = await CountPage.getCount();
  let currentDate = new Date()
  currentDate.setDate(currentDate.getDate());
  const page = params

  //if (Number(page) > 0) {
  const newPage = Number(currentDate.getDate()) + Number(page)
  currentDate.setDate(newPage);//+1
  let startDate = currentDate.getFullYear() + '-' +
    (currentDate.getMonth() + 1) + '-' +
    currentDate.getDate();
  return startDate
}
(async () => {
  //console.log('bbbb')
  // Proxy configuration
  const proxyHost = '66.80.0.115';
  const proxyPort = 3128;
  let startDate = await CalcData(0)//page
  //console.log('startDate', startDate)
  // Target website URL
  const targetUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`

  // Proxy URL
  const proxyUrl = `http://${proxyHost}:${proxyPort}`;

  // Create a new Proxy Agent
  const proxyAgent = new HttpsProxyAgent(proxyUrl);
  //console.log('proxyAgent', proxyAgent)
  // Fetch the target website using the proxy agent
  const response = await fetch(targetUrl, { agent: proxyAgent });
  //console.log('proxy response', response)
  console.log('response status', response.status)
})();
