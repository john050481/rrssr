import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  selectLanguage,
  fetchReposIfNeeded,
  initStore
} from '.././store/actions'

class Grid extends Component {
  constructor(props) {
    super(props)

    let initState
    if (__isBrowser__) {
      initState = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      initState = this.props.staticContext.data
    }

    this.props.initStore(initState);

    this.fetchRepos = this.fetchRepos.bind(this)
  }
  componentDidMount () {
    if (!this.props.repos.length) {
      this.fetchRepos(this.props.match.params.id)
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchRepos(this.props.match.params.id)
    }
  }
  fetchRepos (lang) {
    this.props.selectLanguage(lang);
    this.props.fetchReposIfNeeded(lang);
  }
  render() {
    const { repos, isFetching } = this.props;

    if (isFetching === true) {
      return <p>LOADING</p>
    }

    return (
      <ul style={{display: 'flex', flexWrap: 'wrap'}}>
        {repos.map(({ name, owner, stargazers_count, html_url }) => (
          <li key={name} style={{margin: 30}}>
            <ul>
              <li><a href={html_url}>{name}</a></li>
              <li>@{owner.login}</li>
              <li>{stargazers_count} stars</li>
            </ul>
          </li>
        ))}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  const { selectedLanguage, reposByLanguage } = state
  const { isFetching, lastUpdated, items: repos } = reposByLanguage[
      selectedLanguage
      ] || {
    isFetching: true,
    items: []
  }
  return {
    selectedLanguage,
    repos,
    isFetching,
    lastUpdated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectLanguage : (language) => dispatch(selectLanguage(language)),
    fetchReposIfNeeded : (language) => dispatch(fetchReposIfNeeded(language)),
    initStore : (store) => dispatch(initStore(store))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid)