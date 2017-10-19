import React, { Component } from 'react'
import ScrollArea from 'react-scrollbar'
import DataTables from 'material-ui-datatables'
import SearchBar from 'material-ui-search-bar'

import { filter as filterUtils } from './services/search'
import SeenCheckbox from './components/SeenCheckbox'

const parentStyle = {
  paddingTop: 20
};

const searchStyle = {
  margin: '0 auto 20px auto',
  maxWidth: 800
};

const tableStyle = {
  width: '80%',
  margin: 'auto',
  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  maxHeight: 'calc(100vh - 172px)',
};


class ContentTable extends Component {
  
  GENERIC_COLUMNS = {
    seen: {
      label: 'Seen ?',
      render: (name, all) => {
        return (
          <SeenCheckbox
            data={all}
            type={this.params.type}
            onCheck={() => {
              console.log(all);
              this.props.updateMovieFieldSeen();
            }}
          />
        )
      }
    }
  };
  
  state = {
    query: ''
  };
  
  filter = () => {
    this.params.toShow = filterUtils(this.params.data, this.state.query);
  };
  
  search = query => {
    this.setState({ query });
    this.filter();
  };
  
  complete = columns => {
    return [].concat(columns).concat([this.GENERIC_COLUMNS.seen]);
  };
  
  render() {
    this.filter();
    return (
        <div style={parentStyle}>
          <SearchBar
            onChange={this.search}
            onRequestSearch={this.filter}
            style={searchStyle}
          />
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
              data={this.params.toShow}
              showCheckboxes={false}
              page={1}
              count={this.params.data.length}
            />
          </ScrollArea>
        </div>
    )
  }
  
}

export default ContentTable;