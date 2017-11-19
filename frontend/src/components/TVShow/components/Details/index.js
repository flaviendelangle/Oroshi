import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import muiThemeable from 'material-ui/styles/muiThemeable';

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
  
  componentDidMount() {
    if(!this.props.loaded) {
      this.props.load(this.props.collection, this.props.data.tmdbId);
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
      <Paper
        zDepth={3}
        className="details"
        style={this.style}
      >
        <div className="content">
            <Content
              {...this.props}
              switchSeason={this.switchSeason}
              season={this.state.season}
            />
        </div>
        <div className="expand" onClick={this.handleShowLess}>
          <NavigationExpandLess style={this.style}/>
        </div>
      </Paper>
    )
  }
  
}

const Content = ({ loaded, details, ...props }) => {
  if(!loaded || !details) {
    return (
      <div className="progress">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div>
      <Title
        title={props.title}
        muiTheme={props.muiTheme}
        season={props.season}
        seasons={props.seasons}
      />
      <Season
        season={props.season}
        seasons={props.seasons}
        loadSeason={props.loadSeason}
        tmdbId={props.data.tmdbId}
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
  if(seasons[season]) {
    fullTitle += ' - ' + seasons[season].name;
  }
  return (
    <div className="title">{fullTitle}</div>
  );
};

const Footer = ({ seasons, muiTheme, switchSeason }) => {
  const Elements = seasons.map(season => {
    let title;
    if(season.season_number === 0) {
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

const Season = ({ season, seasons, loadSeason, tmdbId }) => {
  if(!seasons[season]) {
    if(!seasons.hasOwnProperty(season)) {
      setTimeout(() => loadSeason(tmdbId, season));
    }
    return null;
  }
  const data = seasons[season];
  return (
    <div>
      <Episodes data={data.episodes} />
    </div>
  );
};

const Episodes = ({ data }) => {
  return data.map(episode => {
    return <Episode {...episode} key={episode.episode_number} />
  })
};

const Episode = ({ episode_number, name }) => {
  return (
    <div>
      <div>E{episode_number} : {name}</div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const root = state.tv_shows[ownProps.data.tmdbId];
  if(!root) {
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