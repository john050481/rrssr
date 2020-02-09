import { combineReducers } from 'redux'
import {
  INIT_STORE,
  SELECT_LANGUAGE,
  REQUEST_REPOS,
  RECEIVE_REPOS
} from './actions'

function selectedLanguage(state = '', action) {
  switch (action.type) {
    case INIT_STORE:
      return action.store.selectedLanguage
          ? action.store.selectedLanguage
          : state
    case SELECT_LANGUAGE:
      return action.language
    default:
      return state
  }
}

function repos(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_REPOS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_REPOS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.repos,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function reposByLanguage(state = {}, action) {
  switch (action.type) {
    case INIT_STORE:
      return action.store.reposByLanguage
          ? Object.assign({}, state, action.store.reposByLanguage)
          : state
    case RECEIVE_REPOS:
    case REQUEST_REPOS:
      return Object.assign({}, state, {
        [action.language]: repos(state[action.language], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  reposByLanguage,
  selectedLanguage
})
export default rootReducer