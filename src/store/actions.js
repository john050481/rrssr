import fetch from 'isomorphic-fetch'

import { fetchPopularRepos } from '.././shared/api'

export const INIT_STORE = 'INIT_STORE'
export const REQUEST_REPOS = 'REQUEST_REPOS'
export const RECEIVE_REPOS = 'RECEIVE_REPOS'
export const SELECT_LANGUAGE = 'SELECT_LANGUAGE'

export function initStore(store = {}) {
  return {
    type: INIT_STORE,
    store
  }
}

export function selectLanguage(language) {
  return {
    type: SELECT_LANGUAGE,
    language
  }
}

function requestRepos(language) {
  return {
    type: REQUEST_REPOS,
    language
  }
}

function receiveRepos(language, items) {
  return {
    type: RECEIVE_REPOS,
    language,
    repos: items, //json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchRepos(language) {
  return dispatch => {
    dispatch(requestRepos(language))
    return fetchPopularRepos(language)
      .then(items => dispatch(receiveRepos(language, items)))
  }
}

function shouldFetchRepos(state, language) {
  const repos = state.reposByLanguage[language]
  if (!repos) {
    return true
  } else if (repos.isFetching) {
    return false
  } else {
    return false
  }
}

export function fetchReposIfNeeded(language) {
  return (dispatch, getState) => {
    if (shouldFetchRepos(getState(), language)) {
      return dispatch(fetchRepos(language))
    }
  }
}