import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { MatchMediaProvider } from '../utils/matchMedia';

const contextTypes = {
  location: React.PropTypes.object,
  router: React.PropTypes.object,
  store: React.PropTypes.object,
  muiTheme: React.PropTypes.object,
};

export class ContextProvider extends Component {

  static propTypes = {
    children: React.PropTypes.object,
    context: React.PropTypes.shape(contextTypes),
  };

  static childContextTypes = contextTypes;

  getChildContext() {
    return this.props.context;
  }

  render() {
    return (
      <MatchMediaProvider context={this.props.context}>
        { this.props && this.props.children }
      </MatchMediaProvider>
    );
  }
}

/**
 * Decorate components with context and observable
 * @param component
 * @returns {Function|Class}
 */
export function connect(component) {
  if (!component) return contextTypes;
  Object.assign(component, { contextTypes });
  return observer(component);
}
