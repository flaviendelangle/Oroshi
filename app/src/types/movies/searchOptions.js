import { TextField } from 'redux-form-material-ui'

import OptionalToggle from '../../components/form/OptionalToggle'


const CURRENT_YEAR = new Date().getFullYear()
const START_YEAR = 1900

export default [
  {
    name: 'seen',
    label: 'Seen',
    component: OptionalToggle,
  },
  {
    name: 'director',
    hintText: 'Director',
    component: TextField,
  },
  {
    name: 'year',
    hintText: 'Year',
    component: TextField,
    autoComplete: Array.from({
      length: (CURRENT_YEAR - START_YEAR) + 3,
    }, (_, i) => START_YEAR + i),
  },
]
