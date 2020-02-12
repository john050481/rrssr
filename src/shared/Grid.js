import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  selectLanguage,
  fetchReposIfNeeded
} from '.././store/actions'

function Grid (props) {
  const { repos, isFetching } = props;

  useEffect(() => {
    if (props.match.params.id !== props.selectedLanguage)
      props.selectLanguage(props.match.params.id);
    //return () => { /*componentWillUnmount*/ };
  }, [props.match.params.id]);

  useEffect(() => {
    if (!props.isFetching && props.selectedLanguage)
      props.fetchReposIfNeeded(props.selectedLanguage);
    //return () => { /*componentWillUnmount*/ };
  }, [props.selectedLanguage]);

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

function mapStateToProps(state) {
  const { selectedLanguage, reposByLanguage } = state
  const { isFetching, lastUpdated, items: repos = [] } = reposByLanguage[
      selectedLanguage
      ] || {
    isFetching: false,
    repos: []
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
    fetchReposIfNeeded : (language) => dispatch(fetchReposIfNeeded(language))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid)
