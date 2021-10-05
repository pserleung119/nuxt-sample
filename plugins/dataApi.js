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
    try {
      return unWrap(await fetch(`https://${process.env.algoliaAppId}-dsn.algolia.net/1/indexes/homes/`, { headers }))
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getHome (homeId) {
    try {
      return unWrap(await fetch(`https://${process.env.algoliaAppId}-dsn.algolia.net/1/indexes/homes/${homeId}`, { headers }))
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function unWrap (response) {
    const json = await response.json()
    const { ok, status, statusText } = response
    return {
      json,
      ok,
      status,
      statusText
    }
  }

  function getErrorResponse (error) {
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      json: {}
    }
  }
}
