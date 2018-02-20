import React, { Component } from 'react'
import PropTypes from 'prop-types'

import muiThemeable from 'material-ui/styles/muiThemeable'
import { List } from 'material-ui/List'


const sectionStyle = {
  width: '100%',
  maxWidth: 500,
  marginBottom: 50,
}

class ParametersSection extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    muiTheme: PropTypes.object.isRequired,
  }

  get title() {
    return this.props.children.filter(el => el.props.className === 'title')[0]
  }

  get content() {
    const { children } = this.props
    let lines = children
      .filter(el => el.props.className === 'content')[0].props.children
    if (lines === undefined) {
      return null
    }
    if (!Array.isArray(lines)) {
      lines = [lines]
    }
    return lines.map((el, i) => {
      const index = i
      return <Line params={el.props || {}} key={index} />
    })
  }

  get titleStyle() {
    const { muiTheme: { baseTheme } } = this.props
    return {
      fontSize: '1.5em',
      paddingLeft: 20,
      paddingBottom: 20,
      color: baseTheme.palette.titleColor,
    }
  }

  render() {
    return (
      <div style={sectionStyle} >
        <div style={this.titleStyle} >{this.title}</div>
        <List>
          {this.content}
        </List>
      </div>
    )
  }
}

export const Line = ({ params }) => (
  <List {...params} />
)

Line.propTypes = {
  params: PropTypes.object,
}

export default muiThemeable()(ParametersSection)
