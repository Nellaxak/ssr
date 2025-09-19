//import _ from 'lodash';
import Li from '@/app/Li'

export async function GET(request, context) {
  let level1
  //const sss = await context
  //const ssd = await sss.params
  const resolvedParams = await context.params;
  //const { pages } = resolvedParams;
  console.log('get http1', resolvedParams)
  //?_page=2&_limit=5
  /*const resp = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${0}&_limit=15`

  )
  const data = await resp.json()
  data.map((item) => {
    //console.log('item', item)
    //level1 = _.pick(item, ['id', 'name', 'email', 'body']);
    /*if (!Li.findById(level1.id)) {
      new Li(level1)
    }*/
  //}
  //)
  return new Response({ status: 200 });
}
export async function POST(request, context) {
  const body = await request.json()
  const id = body.id_scroll
  const typeAction = body.typeAction
  await Li.outputItem(id, typeAction)
  return new Response({ status: 200 });
}