import React, { Component } from 'react'

import SeenCheckbox from '../../../../../../../../../../components/ContentTable/components/SeenCheckbox'

import './style.css'

class Actions extends Component {
  
  render() {
    return (
      <div className="actions">
        <div>
          <div>Seen :</div>
          <div>
            <SeenCheckbox
              data={this.props.data}
              type={this.props.type}
            />
          </div>
        </div>
      </div>
    );
  }
  
}

export default Actions;