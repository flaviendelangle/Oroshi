import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import CircularProgress from 'material-ui/CircularProgress';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { getDetails } from 'services/actions/publicAPI';
import { getSeasonDetails } from 'services/actions/publicAPI/tv_shows';

import './style.css'


class Details extends Component {
  
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
  
  render() {
    return (
      <Paper
        zDepth={3}
        className="details"
        style={this.style}
      >
        <div className="expand" onClick={this.handleShowLess}>
          <NavigationExpandLess style={this.style}/>
        </div>
        <Content {...this.props} />
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
      <Title title={props.title} muiTheme={props.muiTheme} />
      <Season
        season_number={props.season_number}
        seasons={props.seasons}
        loadSeason={props.loadSeason}
        tmdbId={props.data.tmdbId}
      />
    </div>
  );
};

const Title = ({ title, muiTheme }) => (
  <div className="title">{title}</div>
);

const Season = ({ season_number, seasons, loadSeason, tmdbId }) => {
  if(!seasons[season_number]) {
    if(!seasons.hasOwnProperty(season_number)) {
      loadSeason(tmdbId, season_number);
    }
    return null;
  }
  const data = seasons[season_number];
  return (
    <div>
      <div>{data.name}</div>
      <Episodes data={data.episodes} />
    </div>
  );
};

const Episodes = ({ data }) => {
  return data.map(episode => {
    console.log(episode);
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
    season_number: root.season_number,
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