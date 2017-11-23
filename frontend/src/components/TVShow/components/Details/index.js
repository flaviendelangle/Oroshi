import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog'
import Paper from 'material-ui/Paper';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ScrollArea from 'react-scrollbar'

import { getDetails } from 'services/actions/publicAPI';
import { getSeasonDetails } from 'services/actions/publicAPI/tv_shows';

import './style.css'


class Details extends Component {
  
  state = {
    season: 1
  };
  
  get style() {
    const palette = this.props.muiTheme.palette;
    return {
      backgroundColor: palette.paperBackground,
      color: palette.paperColor
    }
  };
  
  componentWillReceiveProps(newProps) {
    if (!this.props.loaded && !this.props.show && newProps.show) {
      this.props.load(this.props.collection, this.props.data.getPublicId());
    }
  }
  
  handleShowLess = () => {
    this.props.onCollapse();
  };
  
  switchSeason = season => {
    this.setState({ season });
  };
  
  render() {
    return (
      <Dialog
        title={this.title}
        modal={false}
        open={this.props.show}
        onRequestClose={this.handleShowLess}
        autoScrollBodyContent={true}
        className="tv-show-details"
      >
        <Content
          {...this.props}
          switchSeason={this.switchSeason}
          season={this.state.season}
        />
        <div className="expand" onClick={this.handleShowLess}>
          <NavigationExpandLess/>
        </div>
      </Dialog>
    )
  }
  
}

const Content = ({ loaded, details, ...props }) => {
  if (!loaded || !details) {
    return (
      <div className="progress">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="content">
      <Title
        title={props.title}
        muiTheme={props.muiTheme}
        season={props.season}
        seasons={props.seasons}
      />
      <Season
        muiTheme={props.muiTheme}
        season={props.season}
        seasons={props.seasons}
        loadSeason={props.loadSeason}
        tmdbId={props.data.getPublicId()}
      />
      <Footer
        seasons={details.seasons}
        muiTheme={props.muiTheme}
        switchSeason={props.switchSeason}
      />
    </div>
  );
};

const Title = ({ title, muiTheme, seasons, season }) => {
  let fullTitle = title;
  if (seasons[season]) {
    fullTitle += ' - ' + seasons[season].name;
  }
  return (
    <div className="title">{fullTitle}</div>
  );
};

const Footer = ({ seasons, muiTheme, switchSeason }) => {
  const Elements = seasons.map(season => {
    let title;
    if (season.season_number === 0) {
      title = 'Specials';
    } else {
      title = 'Season ' + season.season_number;
    }
    return (
      <FlatButton
        key={season.season_number}
        label={title}
        style={{color: muiTheme.palette.paperColor}}
        onClick={() => switchSeason(season.season_number)}
      />
    );
  });
  return <div className="footer">{Elements}</div> ;
};

const Season = ({ season, seasons, loadSeason, tmdbId, muiTheme }) => {
  if (!seasons[season]) {
    if (!seasons.hasOwnProperty(season)) {
      setTimeout(() => loadSeason(tmdbId, season));
    }
    return null;
  }
  const data = seasons[season];
  return (
    <List className="episodes-list">
      <ScrollArea
        speed={0.8}
        horizontal={false}
      >
        <Episodes data={data.episodes} muiTheme={muiTheme} />
      </ScrollArea>
    </List>
  );
};

const Episodes = ({ data, muiTheme }) => {
  return data.map(episode => {
    return (
      <Episode
        {...episode}
        key={episode.episode_number}
        muiTheme={muiTheme}
      />
    );
  })
};

const Episode = ({ episode_number, name, muiTheme }) => {
  return (
    <ListItem
      primaryText={'E' + episode_number + ' : ' + name}
      style={{color: muiTheme.palette.paperColor}}
      innerDivStyle={{padding: 8}}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const root = state.tv_shows[ownProps.data.getPublicId()];
  if (!root) {
    return {
      loaded: false
    };
  }
  return {
    loaded: true,
    details: root.details,
    seasons: root.seasons
  };
};

const mapDispatchToProps = dispatch => {
  return {
    load: (collection, tmdbId) => {
      dispatch(getDetails('tv_shows', true, collection, tmdbId));
    },
    loadSeason: (tmdbId, season) => dispatch(getSeasonDetails(tmdbId, season))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(Details));