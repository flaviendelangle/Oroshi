import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import muiThemeable from 'material-ui/styles/muiThemeable'

import CollectionType from './CollectionType/index'
import CollectionConfiguration from './CollectionConfiguration/index'
import { create as createCollection } from '../../../services/actions/collections/index'
import { showDialogCreateCollection } from './actions'


class DialogCreateCollection extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    create: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    muiTheme: PropTypes.object.isRequired,
  }

  state = {
    stepIndex: 0,
    type: null,
    title: '',
  }

  componentWillReceiveProps(newProps) {
    const { isOpen } = this.props
    if (
      isOpen &&
      !newProps.isOpen
    ) {
      this.setState({ stepIndex: 0 })
    }
  }

  get title() {
    if (this.state.stepIndex === 0) {
      return 'What to you want to put in your collection ?'
    }
    return 'How should I name it ?'
  }

  create = () => {
    const { title, type } = this.state
    const { profile, create } = this.props
    if (title) {
      const data = {
        title,
        user: profile.pk,
      }
      create(type, data)
    }
  }

  close = () => {
    const { close } = this.props
    this.setState({
      stepIndex: 0,
    })
    close()
  }

  pickCollectionType = (type) => {
    this.setState({ type, stepIndex: 1 })
  }

  renderActions = () => {
    const { muiTheme: { palette } } = this.props
    if (this.state.stepIndex > 0) {
      return (
        <FlatButton
          label="Create"
          primary
          onClick={this.create}
          style={{ color: palette.alternateTextColor }}
        />
      )
    }
    return null
  }

  renderContent = () => {
    if (this.state.stepIndex === 0) {
      return (
        <CollectionType onClick={this.pickCollectionType} />
      )
    }
    return (
      <CollectionConfiguration
        onTitleChange={(proxy, title) => this.setState({ title })}
      />
    )
  }

  render() {
    const actions = this.renderActions()
    return (
      <Dialog
        title={this.title}
        actions={actions}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.close}
        autoScrollBodyContent
      >
        {this.renderContent()}
      </Dialog>

    )
  }
}

const mapStateToProps = (state) => {
  const root = state.home.dialogCreateCollection.main
  const homeRoot = state.home.main
  const appRoot = state.app
  return {
    isOpen: root.show,
    update: root.update,
    isImportingContent: root.isImportingContent,
    collections: homeRoot.collections,
    profile: appRoot.profile,
  }
}

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(showDialogCreateCollection(false)),
  create: (...args) => dispatch(createCollection(...args)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(muiThemeable()(DialogCreateCollection))
