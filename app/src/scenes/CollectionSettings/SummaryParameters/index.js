import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever'
import SocialShare from 'material-ui/svg-icons/social/share'

import DeleteAlert from './DeleteAlert/index'
import ShowPublicLinkAlert from './ShowPublicLinkAlert/index'
import Section from '../../../components/appStructure/Settings/Section'
import TextField from '../../../components/form/TextField/index'
import Toggle from '../../../components/form/Toggle/index'

import { getCollectionTypeTitle } from '../../../services/utils'


const selectStyle = {
  position: 'absolute',
  top: -5,
  right: 50,
}

class SummaryParameters extends PureComponent {
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
    hasBeenDeleted: false,
  }

  componentWillMount() {
    const { collection: { title } } = this.props
    if (title) {
      this.setState(() => ({ title }))
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState(() => ({ title: newProps.collection.title }))
  }

  deleteCollection = () => {
    const { deleteCollection } = this.props
    deleteCollection().then(() => {
      this.setState(() => ({
        hasBeenDeleted: true,
      }))
    })
  }

  render() {
    const {
      collection,
      type,
      update,
    } = this.props
    const {
      title,
      showDeleteAlert,
      showGetPublicLinkAlert,
      hasBeenDeleted,
    } = this.state
    return (
      <Fragment>
        <Section>
          <Section.Title>Summary</Section.Title>
          <Section.Content>
            <Section.Item primaryText="Collection title">
              <TextField
                id="collection_title"
                value={title}
                onChange={(proxy, newTitle) => this.setState(() => ({ title: newTitle }))}
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
              onClick={() => this.setState(() => ({ showGetPublicLinkAlert: true }))}
            />
            <Section.Item
              rightIcon={<ActionDeleteForever />}
              primaryText="Destroy this collection"
              onClick={() => this.setState(() => ({ showDeleteAlert: true }))}
            />
          </Section.Content>
        </Section>
        <DeleteAlert
          open={showDeleteAlert}
          onClose={() => this.setState(() => ({ showDeleteAlert: false }))}
          onDelete={this.deleteCollection}
        />
        <ShowPublicLinkAlert
          open={showGetPublicLinkAlert}
          collection={collection}
          type={type}
          onClose={() => this.setState(() => ({ showGetPublicLinkAlert: false }))}
        />
        { hasBeenDeleted && <Redirect to="/" /> }
      </Fragment>
    )
  }
}

export default SummaryParameters
