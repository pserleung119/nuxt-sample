export default function (context, inject) {
  inject('dataApi', {
    getHome,
    getHomes,
    getReviews,
    getFeaturedHomes,
    getFilteredHomes
  })

  const headers = {
    'X-Algolia-API-Key': process.env.algoliaApiKey,
    'X-Algolia-Application-Id': process.env.algoliaAppId
  }

  async function getHomes () {
    try {
      return unWrap(await fetch(`https://${process.env.algoliaAppId}-dsn.algolia.net/1/indexes/dev_homes/`, { headers }))
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getFeaturedHomes () {
    try {
      return unWrap(await fetch(`https://${process.env.algoliaAppId}-dsn.algolia.net/1/indexes/dev_homes/query`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          hitsPerPage: 5,
          page: 0
        })
      }))
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getFilteredHomes (query, page) {
    try {
      return unWrap(await fetch(`https://${process.env.algoliaAppId}-dsn.algolia.net/1/indexes/dev_homes/query`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          query,
          hitsPerPage: 5,
          page
        })
      }))
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getHome (homeId) {
    try {
      return unWrap(await fetch(`https://${process.env.algoliaAppId}-dsn.algolia.net/1/indexes/dev_homes/${homeId}`, { headers }))
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getReviews (homeId) {
    try {
      return unWrap(await fetch(`https://${process.env.algoliaAppId}-dsn.algolia.net/1/indexes/dev_home_reviews/query`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          filters: `homeId:${homeId}`
        })
      }))
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
