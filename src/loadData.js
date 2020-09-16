export default async function loadData(path) {
  let responses = await Promise.all([fetch(`${path}/actor.json`), fetch(`${path}/outbox.json`)])
  let [actor, outbox] = await Promise.all(responses.map(res => res.json()))
  return [actor, outbox]
}