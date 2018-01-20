import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { ListItem } from 'material-ui/List';
import ActionDone from 'material-ui/svg-icons/action/done'

class Line extends Component {
  static propTypes = {
    done: PropTypes.bool,
    data: PropTypes.object,
  }

  renderIcon = () => {
    if (this.props.done) {
      return <ActionDone />;
    }
    return (null);
  };

  render() {
    const { data } = this.props;
    return (
      <ListItem
        primaryText={data.title}
        rightIcon={this.renderIcon()}
      />
    );
  }
}

const mapStateToProps = ({ settings: { dataImporter } }, state, { data }) => ({
  done: !!dataImporter.created[data.tmdbId],
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Line);
