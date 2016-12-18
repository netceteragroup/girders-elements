'use strict';

import React from 'react';

import ActivityIndicator from './pure/activityIndicator';

import ui from '../../ui';

class Loading extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    kind: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]).isRequired,
    uri: React.PropTypes.string.isRequired,
    where: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, kind, uri, where, random } = this.props;
    dispatch({type: 'READ_PERFORM', uri, where, kind, random});
  }

  render() {
    return (
      <ActivityIndicator />
    );
  }
}

ui.register(['__loading'], ({ element, dispatch}) => {
  return (
    <Loading
      kind={element.get('kind').toJS()}
      uri={element.get('uri')}
      where={element.get('where', 'content')}
      dispatch={dispatch}
      random={element.get('random')}/>
  );
});
