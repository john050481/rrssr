import PropTypes from 'prop-types';
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  selectLanguage,
  fetchReposIfNeeded
} from '.././store/actions'

function Grid (props) {
  const { repos, isFetching, match, selectedLanguage } = props;

  useEffect(() => {
    if (match.params.id !== selectedLanguage)
      props.selectLanguage(match.params.id);
    //return () => { /*componentWillUnmount*/ };
  }, [match.params.id]);

  useEffect(() => {
    if (!isFetching && selectedLanguage)
      props.fetchReposIfNeeded(selectedLanguage);
    //return () => { /*componentWillUnmount*/ };
  }, [selectedLanguage]);

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

Grid.propTypes = {
  match: PropTypes.object.isRequired,
  selectedLanguage: PropTypes.string,
  repos: PropTypes.array,
  isFetching: PropTypes.bool,
  lastUpdated: PropTypes.number,
  selectLanguage: PropTypes.func.isRequired,
  fetchReposIfNeeded: PropTypes.func.isRequired
};
Grid.defaultProps = {
  selectedLanguage: '',
  repos: [],
  isFetching: false,
  lastUpdated: 0
};