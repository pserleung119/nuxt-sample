export default function (context, inject) {
  inject('dataApi', {
    getHome,
    getHomes
  })

  const headers = {
    'X-Algolia-API-Key': process.env.algoliaApiKey,
    'X-Algolia-Application-Id': process.env.algoliaAppId
  }

  async function getHomes () {
    const response = await fetch(`https://${process.env.algoliaAppId}-dsn.algolia.net/1/indexes/homes/`, {
      headers
    })
    const json = await response.json()
    return json.hits
  }

  async function getHome (homeId) {
    const response = await fetch(`https://${process.env.algoliaAppId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
      headers
    })
    const json = await response.json()
    return json
  }
}
