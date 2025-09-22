//import Li from '@/app/api/Li'

export async function GET(request, response) {
    //detail,click link item
    const body = await request.json()
    console.log('handler get item',body)
    //get item from Li class
    //response.status(200).json(data)
    return new Response('ЗАКАЗАТЬ44444',JSON.stringify({ status: 200 }));
}
export async function POST(request, response) {
    console.log("POST rew")
    //add single item
    //const body = await request.json()
    //new Li(body)//not work
    return new Response(JSON.stringify({ status: 200 }));
}
