import Li from '../../Li'

export default async function Home() {// {params}
  const resd = await Li.getList('marked')
  return resd
}
