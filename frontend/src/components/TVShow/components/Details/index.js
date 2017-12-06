import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog'
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
      color: palette.paperColor,
      paddingLeft: 0,
      paddingRight: 0,
    }
  };
  
  /**
   * Hide the modal
   */
  handleShowLess = () => {
    this.props.onCollapse();
  };
  
  /**
   * Change the season we want to display in the modal
   * @param {number} season - the season to show
   */
  switchSeason = season => {
    this.setState({ season });
  };
  
  componentWillReceiveProps(newProps) {
    if (!this.props.loaded && !this.props.show && newProps.show) {
      this.props.load(this.props.collection, this.props.data.getPublicId());
    }
  }
  
  render() {
    return (
      <Dialog
        title={this.title}
        modal={false}
        open={this.props.show}
        onRequestClose={this.handleShowLess}
        autoScrollBodyContent={true}
        className="tv-show-details"
        bodyStyle={this.style}
        actionsContainerStyle={this.style}
        actions={
          <Footer
            details={this.props.details}
            muiTheme={this.props.muiTheme}
            switchSeason={this.switchSeason}
          />
        }
      >
        <Content
          {...this.props}
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
    </div>
  );
};

const Title = ({ title, seasons, season }) => {
  let fullTitle = title;
  if (seasons[season]) {
    fullTitle += ' - ' + seasons[season].name;
  }
  return (
    <div className="title">{fullTitle}</div>
  );
};

const Footer = ({ details, muiTheme, switchSeason }) => {
  if(!details) {
    return null;
  }
  const short = details.seasons.length > 5;
  const Elements = details.seasons.map((season, index) => {
    return (
      <SeasonButton
        key={index}
        season={season}
        short={short}
        muiTheme={muiTheme}
        switchSeason={switchSeason}
      />
    );
  });
  return (
    <div className="footer">
      <ScrollArea
        speed={0.8}
        vertical={false}
      >
        {Elements}
      </ScrollArea>
    </div>
  );
};

const SeasonButton = ({ season, short, muiTheme, switchSeason }) => {
  let title;
  if (season.season_number === 0) {
    title = short ? 'S0' : 'Specials';
  } else {
    title = (short ? 'S' : 'Season ') + season.season_number;
  }
  
  let style;
  if(short) {
    style = {
      color: muiTheme.palette.paperColor,
      minWidth: 0
    };
  } else {
    style = {
      color: muiTheme.palette.paperColor
    };
  }
  return (
    <FlatButton
      key={season.season_number}
      label={title}
      style={style}
      onClick={() => switchSeason(season.season_number)}
    />
  );
};

const Season = ({ season, seasons, loadSeason, tmdbId, muiTheme }) => {
  if (!seasons[season]) {
    if (!seasons.hasOwnProperty(season)) {
      setTimeout(() => loadSeason(tmdbId, season));
    }
    return (
      <div className="progress">
        <CircularProgress />
      </div>
    );
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