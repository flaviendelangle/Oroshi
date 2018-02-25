import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScrollArea from 'react-scrollbar'
import PropTypes from 'prop-types'

import Dialog from 'material-ui/Dialog'
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less'
import CircularProgress from 'material-ui/CircularProgress'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import muiThemeable from 'material-ui/styles/muiThemeable'

import { getDetails } from '../../../../services/actions/publicAPI/index'
import { getSeasonDetails } from '../../publicActions'

import './style.css'


class Details extends Component {
  static propTypes = {
    onCollapse: PropTypes.func.isRequired,
    muiTheme: PropTypes.object.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    show: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired,
    collection: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    details: PropTypes.object.isRequired,
  }

  state = {
    season: 1,
  }

  componentWillReceiveProps(newProps) {
    const {
      isLoaded,
      show,
      load,
      collection,
      data,
    } = this.props
    if (
      !isLoaded &&
      !show && newProps.show
    ) {
      load(collection, data.getPublicId())
    }
  }

  get style() {
    const { muiTheme: { palette } } = this.props
    return {
      backgroundColor: palette.paperBackground,
      color: palette.paperColor,
      paddingLeft: 0,
      paddingRight: 0,
    }
  }

  /**
   * Hide the modal
   */
  handleShowLess = () => {
    this.props.onCollapse()
  }

  /**
   * Change the season we want to display in the modal
   * @param {number} season - the season to show
   */
  switchSeason = (season) => {
    this.setState({ season })
  }

  render() {
    const { show, details, muiTheme } = this.props
    const { season } = this.state
    return (
      <Dialog
        title={this.title}
        modal={false}
        open={show}
        onRequestClose={this.handleShowLess}
        autoScrollBodyContent
        className="tv-show-details"
        bodyStyle={this.style}
        actionsContainerStyle={this.style}
        actions={
          <Footer
            details={details}
            muiTheme={muiTheme}
            switchSeason={this.switchSeason}
          />
        }
      >
        <Content
          {...this.props}
          season={season}
        />
        <div
          role="button"
          tabIndex={0}
          className="expand"
          onClick={this.handleShowLess}
        >
          <NavigationExpandLess />
        </div>
      </Dialog>
    )
  }
}

const Content = ({
  isLoaded,
  details,
  title,
  season,
  seasons,
  muiTheme,
  loadSeason,
  data,
}) => {
  if (
    !isLoaded ||
    !details
  ) {
    return (
      <div className="progress">
        <CircularProgress />
      </div>
    )
  }
  return (
    <div className="content">
      <Title
        title={title}
        season={season}
        seasons={seasons}
      />
      <Season
        muiTheme={muiTheme}
        season={season}
        seasons={seasons}
        loadSeason={loadSeason}
        tmdbId={data.getPublicId()}
      />
    </div>
  )
}

Content.propTypes = {
  muiTheme: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  season: PropTypes.object.isRequired,
  seasons: PropTypes.array.isRequired,
  loadSeason: PropTypes.func.isRequired,
}

const Title = ({ title, seasons, season }) => {
  let fullTitle = title
  if (seasons[season]) {
    fullTitle += ` - ${seasons[season].name}`
  }
  return (
    <div className="title">{fullTitle}</div>
  )
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  season: PropTypes.object.isRequired,
  seasons: PropTypes.array.isRequired,
}

const Footer = ({ details, muiTheme, switchSeason }) => {
  if (!details) {
    return null
  }
  const isShort = details.seasons.length > 5
  return (
    <div className="footer">
      <ScrollArea
        speed={0.8}
        vertical={false}
      >
        {details.seasons.map(season => (
          <SeasonButton
            key={1}
            season={season}
            isShort={isShort}
            muiTheme={muiTheme}
            switchSeason={switchSeason}
          />
        ))}
      </ScrollArea>
    </div>
  )
}

Footer.propTypes = {
  details: PropTypes.object.isRequired,
  muiTheme: PropTypes.object.isRequired,
  switchSeason: PropTypes.func.isRequired,
}

const SeasonButton = ({
  season,
  isShort,
  muiTheme,
  switchSeason,
}) => {
  let title
  if (season.season_number === 0) {
    title = isShort ? 'S0' : 'Specials'
  } else {
    title = (isShort ? 'S' : 'Season ') + season.season_number
  }

  let style
  if (isShort) {
    style = {
      color: muiTheme.palette.paperColor,
      minWidth: 0,
    }
  } else {
    style = {
      color: muiTheme.palette.paperColor,
    }
  }
  return (
    <FlatButton
      key={season.season_number}
      label={title}
      style={style}
      onClick={() => switchSeason(season.season_number)}
    />
  )
}

SeasonButton.propTypes = {
  season: PropTypes.object.isRequired,
  isShort: PropTypes.bool.isRequired,
  muiTheme: PropTypes.object.isRequired,
  switchSeason: PropTypes.func.isRequired,
}

const Season = ({
  season,
  seasons,
  loadSeason,
  tmdbId,
  muiTheme,
}) => {
  if (!seasons[season]) {
    if (!Object.prototype.hasOwnProperty.call(seasons, season)) {
      setTimeout(() => loadSeason(tmdbId, season))
    }
    return (
      <div className="progress">
        <CircularProgress />
      </div>
    )
  }
  const data = seasons[season]
  return (
    <List className="episodes-list">
      <ScrollArea
        speed={0.8}
        horizontal={false}
      >
        <Episodes data={data.episodes} muiTheme={muiTheme} />
      </ScrollArea>
    </List>
  )
}

Season.propTypes = {
  muiTheme: PropTypes.object.isRequired,
  season: PropTypes.object.isRequired,
  seasons: PropTypes.array.isRequired,
  loadSeason: PropTypes.func.isRequired,
  tmdbId: PropTypes.number.isRequired,
}

const Episodes = ({ data, muiTheme }) => data.map(({ episodeNumber, ...episode }) => (
  <Episode
    {...episode}
    episodeNumber={episodeNumber}
    key={episodeNumber}
    muiTheme={muiTheme}
  />
))

const Episode = ({ episodeNumber, name, muiTheme }) => (
  <ListItem
    primaryText={`E${episodeNumber} : ${name}`}
    style={{ color: muiTheme.palette.paperColor }}
    innerDivStyle={{ padding: 8 }}
  />
)

Episode.propTypes = {
  episodeNumber: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  muiTheme: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const root = state.tv_shows[ownProps.data.getPublicId()]
  if (!root) {
    return {
      isLoaded: false,
    }
  }
  return {
    isLoaded: true,
    details: root.details,
    seasons: root.seasons,
  }
}

const mapDispatchToProps = dispatch => ({
  load: (collection, tmdbId) => {
    dispatch(getDetails('tv_shows', true, collection, tmdbId))
  },
  loadSeason: (tmdbId, season) => dispatch(getSeasonDetails(tmdbId, season)),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(muiThemeable()(Details))
