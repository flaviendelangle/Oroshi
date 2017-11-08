import React, { Component } from 'react'
import ScrollArea from 'react-scrollbar'
import DataTables from 'material-ui-datatables'

import SeenCheckbox from './components/SeenCheckbox'

const tableStyle = {
  width: '80%',
  margin: 'auto',
  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  maxHeight: 'calc(100% - 20px)',
  height: 'auto'
};

const containerStyle = {
  height: 'calc(100% - 20px)',
  paddingTop: 20
};

class ContentTable extends Component {
  
  GENERIC_COLUMNS = {
    seen: {
      key: 'seen',
      label: 'Seen ?',
      style: {
        width: '50px' // 98px
      },
      sortable: true,
      render: (name, all) => {
        return (
          <SeenCheckbox
            data={all}
            type={this.params.type}
          />
        )
      }
    }
  };
  
  sort = (field, direction) => {
    this.props.sort.bind(this, this.params.type)('default', field, direction);
  };
  
  complete = columns => {
    return [].concat(columns).concat([this.GENERIC_COLUMNS.seen]);
  };
  
  render() {
    return (
        <div style={containerStyle}>
          <ScrollArea
            speed={0.8}
            horizontal={false}
            style={tableStyle}
          >
            <DataTables
              height={'auto'}
              selectable={false}
              showRowHover={true}
              columns={this.complete(this.params.columns)}
              data={this.props.data}
              showCheckboxes={false}
              page={1}
              count={this.props.data.length}
              onSortOrderChange={this.sort}
              rowSize={20}
            />
          </ScrollArea>
        </div>
    )
  }
  
}

export default ContentTable;