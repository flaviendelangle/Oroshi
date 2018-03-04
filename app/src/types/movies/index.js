import AVMovie from 'material-ui/svg-icons/av/movie'

import elementComponent from './component'
import elementClass from './elementClass'
import listGenerator from './listGenerator'
import streamGenerator from './streamGenerator'
import sortOptions from './sortOptions'
import * as searchOptions from './searchOptions'
import * as actions from './actions'
import * as publicActions from './publicActions'


export default {
  name: 'movies',
  label: 'Movies',
  elementComponent,
  elementClass,
  listGenerator,
  streamGenerator,
  actions,
  publicActions,
  searchOptions,
  sortOptions,
  icon: AVMovie,
}
