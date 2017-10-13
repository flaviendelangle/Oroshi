import React, { Component } from 'react'
import DataTables from 'material-ui-datatables'

class ContentTable extends Component {
  
  handleCellClick = (key, order) => {
  };
  
  handleCellDoubleClick = (key, order) => {
  };
  
  handleFilterValueChange = (value) => {
  };
  
  handleSortOrderChange = (key, order) => {
  };
  
  render(params) {
    return (
      <DataTables
        height={'auto'}
        selectable={false}
        showRowHover={true}
        columns={params.columns}
        data={params.data}
        showCheckboxes={false}
        onCellClick={this.handleCellClick}
        onCellDoubleClick={this.handleCellDoubleClick}
        onFilterValueChange={this.handleFilterValueChange}
        onSortOrderChange={this.handleSortOrderChange}
        page={1}
        count={100}
      />
    )
  }
  
}

export default ContentTable;