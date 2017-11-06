import React, { Component } from 'react'
import { connect } from 'react-redux'
import DataTables from 'material-ui-datatables'

import SaveButton from './components/SaveButton'
import Movie from './components/Movie'
import { date } from '../../../../../../services/utils'

const TABLE_COLUMNS = [
  {
    label: 'Title',
    key: 'title',
    style: {
      width: '50%',
      overflow: 'hidden'
    }
  }, {
    label: 'Release',
    render: (name, all) => {
      return date(all.release_date, date.TMDB_FORMAT, date.YEAR_FORMAT);
    }
  }, {
    render: (name, all) => {
      if(all.already_in_collection)
        return null;
      return <SaveButton data={all} />
    }
  }
];

class MoviesList extends Component {
  
  renderList = () => {
    return this.props.data.results.map(el => {
      console.log(el);
      return (
        <Movie
          data={el}
          //collection={this.props.collection}
          key={el.id}
        />
      )
    })
  };

  render() {
    if(this.props.data.results.length === 0) {
      return (null);
    }
    return (
      <div style={{textAlign: 'center'}}>
        {this.renderList()}
      </div>
      /*<DataTables
        height={'auto'}
        selectable={false}
        showRowHover={true}
        columns={TABLE_COLUMNS}
        data={this.props.data.results}
        showCheckboxes={false}
        page={1}
        count={this.props.data.results.length}
      />*/
    )
  }
  
}

const mapStateToProps = state => {
  return {
    data: state.collectionMovies.dialogAddMovie.moviesList.main.data
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);