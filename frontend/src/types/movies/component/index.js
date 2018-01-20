import React, { Component } from 'react';
import { connect } from 'react-redux';

import muiThemeable from 'material-ui/styles/muiThemeable';
import ImageEye from 'material-ui/svg-icons/image/remove-red-eye';

import Element from 'components/element/Element';
import { addElement, removeElement } from 'services/actions/collections';
import { switchSeenOnElement } from 'types/movies/actions';
import { publicRoot } from 'services/TheMovieDatabaseJS/movies';
import date from 'services/content/date';



const LAYOUT = {
  title: {
    label: 'Title'
  },
  year: {
    label: 'Year of release'
  },
  grade: {
    label: 'Public grade'
  },
  seen: {
    label: 'Have you seen it ?'
  },
  suggestions: {
    label: 'Find others suggested movies'
  },
  add: {
    label: 'Add to collection'
  }
};

/** Class representing a movie frame, used mainly in the layouts (Grid + Stream) */
class Movie extends Component {
  
  getFooterData = () => {
    const { data } = this.props;
    const release_date = date(data.getReleaseDate(), date.TMDB_FORMAT, date.YEAR_FORMAT);
    return [
      { key: 'year', value: release_date, },
      { key: 'title', value: data.getTitle(), link: publicRoot + data.getPublicId(), },
    ];
  };
  
  /**
   * Check if we are in test mode
   */
  isTesting = () => {
    return this.props.mode === 'test';
  };
  
  /**
   * Switch the seen paramter of the movie
   */
  switchSeen = () => {
    const { data, switchSeen } = this.props;
    if (this.isTesting()) {
      return null;
    }
    switchSeen(data);
  };

  render() {
    const {
      collection,
      data,
      create,
      destroy,
      creationMode
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
        footer={this.getFooterData()}
        topRightAction={
          <Seen
            creation_mode={creationMode}
            seen={data.hasBeenSeen()}
            handleClick={this.switchSeen}
          />
        }
        topRightActionKey="seen"
        topLeftAction="suggestions"
      />
    );
  }
  
}

const Seen = ({ seen, handleClick, creation_mode }) => {
  if (creation_mode) {
    return null;
  }
  const color = seen ? 'green' : 'red';
  return (
    <ImageEye
      style={{color}}
      onClick={handleClick}
    />
  );
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    create: (collection, element) => {
      dispatch(addElement('movies', collection, element));
    },
    destroy: (collection, element) => {
      dispatch(removeElement('movies', collection, element));
    },
    switchSeen: (data) => dispatch(switchSeenOnElement(data))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(Movie));
