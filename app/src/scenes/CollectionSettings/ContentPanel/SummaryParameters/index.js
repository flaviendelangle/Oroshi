import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever'
import SocialShare from 'material-ui/svg-icons/social/share'

import DeleteAlert from './DeleteAlert/index'
import ShowPublicLinkAlert from './ShowPublicLinkAlert/index'
import Section from '../Section'
import TextField from '../../../../components/form/TextField/index'
import Toggle from '../../../../components/form/Toggle/index'

import { update as _update } from '../../actions'
import { getCollectionTypeTitle } from '../../../../services/utils'
import { destroy } from '../../../../services/actions/collections/index'


const selectStyle = {
  position: 'absolute',
  top: -5,
  right: 50,
}

class SummaryParameters extends Component {
  static propTypes = {
    collection: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    deleteCollection: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
  }

  state = {
    title: '',
    showDeleteAlert: false,
    showGetPublicLinkAlert: false,
  }

  componentWillMount() {
    const { collection: { title } } = this.props
    if (title) {
      this.setState({ title })
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ title: newProps.collection.title })
  }

  render() {
    const {
      collection,
      type,
      update,
      deleteCollection,
    } = this.props
    const { title, showDeleteAlert, showGetPublicLinkAlert } = this.state
    return (
      <Fragment>
        <Section>
          <Section.Title>Summary</Section.Title>
          <Section.Content>
            <Section.Item primaryText="Collection title">
              <TextField
                id="collection_title"
                value={title}
                onChange={(proxy, newTitle) => this.setState({ title: newTitle })}
                onSave={() => update('title', title)}
              />
            </Section.Item>
            <Section.Item primaryText="Collection type">
              <SelectField
                value="0"
                disabled
                style={selectStyle}
              >
                <MenuItem
                  value="0"
                  primaryText={getCollectionTypeTitle(type)}
                />
              </SelectField>
            </Section.Item>
            <Section.Item
              primaryText="Include adult content"
              rightToggle={
                <Toggle
                  toggled={collection.adult_content}
                  onToggle={(proxy, active) => {
                    update('adult_content', active)
                  }}
                />
              }
            />
            <Section.Item
              primaryText="Public access to your collection"
              rightToggle={
                <Toggle
                  toggled={collection.public}
                  onToggle={(proxy, active) => {
                    update('public', active)
                  }}
                />
              }
            />
            <Section.Item
              rightIcon={<SocialShare />}
              primaryText="Get your public link"
              onClick={() => this.setState({ showGetPublicLinkAlert: true })}
            />
            <Section.Item
              rightIcon={<ActionDeleteForever />}
              primaryText="Destroy this collection"
              onClick={() => this.setState({ showDeleteAlert: true })}
            />
          </Section.Content>
        </Section>
        <DeleteAlert
          open={showDeleteAlert}
          onClose={() => this.setState({ showDeleteAlert: false })}
          onDelete={deleteCollection}
        />
        <ShowPublicLinkAlert
          open={showGetPublicLinkAlert}
          collection={collection}
          type={type}
          onClose={() => this.setState({ showGetPublicLinkAlert: false })}
          onDelete={() => {}} // this.props.deleteCollection(this.props.data.pk)}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch, { type, collection }) => ({
  update: (field, value) => dispatch(_update(type, collection, field, value)),
  deleteCollection: () => dispatch(destroy(type, collection)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SummaryParameters)
