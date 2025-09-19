import Li from '@/app/api/Li'

export async function GET(request, context) {
    const resolvedParams = await context.params;
    const { item, status } = resolvedParams;
    //detail,click link item
    const itemFind = await Li.findById(Number(item));
    let text = "ЗАКАЗАТЬ"
    let statusItem = '4444'
    if (itemFind) {
        statusItem = await itemFind.getStatus()
    }
    console.log('____________________serrr', item, itemFind.id, statusItem)
    /*if (Number(statusItem) === 1) {
        text = "В КОРЗИНЕ"
    } else {
        text = "ЗАКАЗАТЬ"
    }*/
    return new Response(JSON.stringify({
        status: 200,
        "message": statusItem
    }));
}
export async function POST(request, response) {
    const id = await request.json()
    console.log("POST item status", id)
    const item = await Li.findById(Number(id));
    //console.log('find li', id,item)
    const oldStatus = Number(await item.getStatus())
    const newStatus = Number(!Boolean(oldStatus))
    console.log('fdddd', id, oldStatus, newStatus)
    if (newStatus === 1) {
        await Li.setCount(1)
    }
    else {
        await Li.setCount(-1)
    }
    await item.setStatus(newStatus)
    await item.setForm()
    return new Response(JSON.stringify({ status: 200 }));
}
