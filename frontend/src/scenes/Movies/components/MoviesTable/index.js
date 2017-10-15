import { connect } from 'react-redux'

import ContentTable from '../../../../components/ContentTable'

const TABLE_COLUMNS = [
  {
    key: 'pk',
    label: 'N°',
    style: {
      width: '50px'
    }
  }, {
    key: 'title',
    label: 'Title',
  }, {
    key: 'release',
    label: 'Year of release'
  }
];

class MoviesTable extends ContentTable {
  
  render() {
    this.params = {
      ...this.params,
      columns: TABLE_COLUMNS,
      data: this.props.movies,
      tableStyle: {}
    };
    return super.render();
  }
  
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies.moviesTable.movies
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesTable);