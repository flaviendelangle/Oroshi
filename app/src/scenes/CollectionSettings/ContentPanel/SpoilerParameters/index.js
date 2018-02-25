import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Toggle from 'material-ui/Toggle'

import ParametersSection, { Line } from '../Section'
import { update as _update } from '../../actions'


const SpoilerParameters = ({ data, update }) => (
  <ParametersSection>
    <div className="title">Spoilers</div>
    <div className="content">
      <Line
        primaryText="Hide the titles of the unseen episodes"
        rightToggle={
          <Toggle
            toggled={data.hide_unseen_titles}
            onToggle={(proxy, active) => {
              update(data.pk, 'hide_unseen_titles', active)
            }}
          />
        }
      />
    </div>
  </ParametersSection>
)

SpoilerParameters.propTypes = {
  data: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch, { type }) => ({
  update: (pk, field, value) => dispatch(_update(type, pk, field, value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SpoilerParameters)
