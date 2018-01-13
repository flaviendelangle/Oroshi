import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Home from 'scenes/Home';
import Login from 'scenes/Login';
import Logout from 'scenes/Logout';
import Collection from 'scenes/Collection';
import CollectionSettings from 'scenes/CollectionSettings';
import ElementSuggestions from 'scenes/ElementSuggestions';

import { notifyRouteChange } from 'services/actions/router';
import { getProfile } from 'services/actions/users';
import { collectionTypes } from 'appConfig';


class Main extends Component {
  
  get style() {
    return {
      backgroundColor: this.props.muiTheme.baseTheme.palette.backgroundColor
    }
  }
  
  getProfile = _ => {
    const { location, profile, oauth, username, getProfile } = this.props;
    if (
      location.pathname !== '/logout/' &&
      !profile &&
      oauth &&
      username
    ) {
      getProfile(username);
    }
  };
  
  getSceneProps = (el, props) => ({
    ...props,
    config: el,
    scene: el.name,
    collection: {
      pk: props.match.params.collection_id,
    },
  });
  
  componentDidMount() {
    this.getProfile();
  }
  
  componentWillReceiveProps(newProps) {
    const { location } = this.props;
    if (location.pathname !== newProps.location.pathname) {
      this.props.notifyRouteChange(newProps.location);
      this.getProfile();
    }
  }
  
  render() {
    return (
      <main style={this.style}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login/' component={Login} />
          <Route path='/logout/' component={Logout} />
          
          {collectionTypes.map(el => [
            <Route
              path={`/collections/${el.name}/:collection_id/suggestions/:element_id/`}
              render={props => <ElementSuggestions {...this.getSceneProps(el, props)} />}
            />,
            <Route
              path={`/collections/${el.name}/:collection_id/settings/`}
              render={props => <CollectionSettings {...this.getSceneProps(el, props)} />}
            />,
            <Route
              path={`/collections/${el.name}/:collection_id/public/`}
              render={props => <Collection  {...this.getSceneProps(el, props)}  isPublic={true} />}
            />,
            <Route
              path={`/collections/${el.name}/:collection_id/`}
              render={props => <Collection {...this.getSceneProps(el, props)} isPublic={false} />}
            />
          ])}
          
        </Switch>
      </main>
    );
  }
}


const mapStateToProps = state => {
  const root = state.app;
  return {
    profile: root.profile,
    oauth: root.oauth,
    username: root.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    notifyRouteChange: location => dispatch(notifyRouteChange(location)),
    getProfile: username => dispatch(getProfile(username))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(Main)));