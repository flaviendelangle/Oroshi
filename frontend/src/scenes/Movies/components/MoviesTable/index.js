import { connect } from 'react-redux'

import ContentTable from '../../../../components/ContentTable/index'

const TABLE_COLUMNS = [
  {
    key: 'pk',
    label: 'N°'
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
      columns: TABLE_COLUMNS,
      data: this.props.movies
    };
    return super.render(this.params);
  }
  
}

const mapStateToProps = state => {
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