import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import muiThemeable from 'material-ui/styles/muiThemeable';
import ImageEye from 'material-ui/svg-icons/image/remove-red-eye';

import Element from 'components/element/Element';
import { addElement, removeElement } from 'services/actions/collections';
import { switchSeenOnElement } from 'types/movies/actions';
import { publicRoot } from 'services/TheMovieDatabaseJS/movies';
import date from 'services/content/date';


const LAYOUT = {
  title: {
    label: 'Title',
  },
  year: {
    label: 'Year of release',
  },
  grade: {
    label: 'Public grade',
  },
  seen: {
    label: 'Have you seen it ?',
  },
  suggestions: {
    label: 'Find others suggested movies',
  },
  add: {
    label: 'Add to collection',
  },
};

/** Class representing a movie frame, used mainly in the layouts (Grid + Stream) */
class Movie extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    collection: PropTypes.object.isRequired,
    create: PropTypes.func.isRequired,
    destroy: PropTypes.func.isRequired,
    onRender: PropTypes.func,
    creationMode: PropTypes.bool, // RENAME
    mode: PropTypes.string,
    switchSeen: PropTypes.func,
  };

  getFooterData = () => {
    const { data } = this.props;
    const releaseDate = date(data.getReleaseDate(), date.TMDB_FORMAT, date.YEAR_FORMAT);
    return [
      { key: 'year', value: releaseDate },
      { key: 'title', value: data.getTitle(), link: publicRoot + data.getPublicId() },
    ];
  };

  /**
   * Check if we are in test mode
   */
  isTesting = () => this.props.mode === 'test';

  /**
   * Switch the seen paramter of the movie
   */
  switchSeen = () => {
    const { data, switchSeen } = this.props;
    if (this.isTesting()) {
      return null;
    }
    return switchSeen(data);
  };

  render() {
    const {
      collection,
      data,
      create,
      destroy,
      creationMode,
      onRender,
    } = this.props;
    return (
      <Element
        data={data}
        collection={collection}
        type="movies"
        layout={LAYOUT}
        creationMode={creationMode}
        onSave={create}
        onDestroy={destroy}
        onRendery={onRender}
        footer={this.getFooterData()}
        topRightAction={
          <Seen
            creationMode={creationMode}
            seen={data.hasBeenSeen()}
            onClick={this.switchSeen}
          />
        }
        topRightActionKey="seen"
        topLeftAction="suggestions"
      />
    );
  }
}

const Seen = ({ seen, onClick, creationMode }) => {
  if (creationMode) {
    return null;
  }
  const color = seen ? 'green' : 'red';
  return (
    <ImageEye
      style={{ color }}
      onClick={onClick}
    />
  );
};

Seen.propTypes = {
  seen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  creationMode: PropTypes.bool, // RENAME
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  create: (collection, element) => {
    dispatch(addElement('movies', collection, element));
  },
  destroy: (collection, element) => {
    dispatch(removeElement('movies', collection, element));
  },
  switchSeen: data => dispatch(switchSeenOnElement(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(muiThemeable()(Movie));
