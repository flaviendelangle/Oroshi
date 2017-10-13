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

const TABLE_DATA = [];


class MoviesTable extends ContentTable {

  constructor() {
    super();
    this.params = {
      columns: TABLE_COLUMNS,
      data: TABLE_DATA
    };
  }
  
  render() {
    return super.render(this.params);
  }
  
}

const mapStateToProps = state => {
  return {
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