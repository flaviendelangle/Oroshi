import React, { Component } from 'react'
import { connect } from 'react-redux'

import Movie from './components/Movie'


class Results extends Component {
  
  renderList = () => {
    return this.props.data.results.map(el => {
      return (
        <Movie
          data={el}
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

export default connect(mapStateToProps, mapDispatchToProps)(Results);