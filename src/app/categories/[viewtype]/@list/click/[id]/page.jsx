import Li from '../../../../../../Li'
export default async function Home({ params }) {
  let resd
  const paramsPromise = await params
  const viewtype = paramsPromise.viewtype
  //console.log('page list item status interceptor', paramsPromise)
  //const items = await http<Item[]>(`http://localhost:3456/${viewtype}`) as Item[];
  const find = await Li.findById(paramsPromise.id)
  await find.setStatus()
  resd = await Li.getList(viewtype)
  return resd
}