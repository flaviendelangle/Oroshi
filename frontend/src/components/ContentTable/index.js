import React, { Component } from 'react'
import DataTables from 'material-ui-datatables'

const tableStyle = {
  width: '80%',
  margin: '20px auto',
  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
};

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
      <div style={tableStyle}>
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
          count={params.data.length}
        />
      </div>
    )
  }
  
}

export default ContentTable;