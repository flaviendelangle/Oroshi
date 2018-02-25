import { AutoComplete, SelectField } from 'redux-form-material-ui'
import AutoCompleteOptions from 'material-ui/AutoComplete'

import OptionalToggle from '../../components/form/OptionalToggle'
import { SelectLanguageField } from '../../components/form/SelectLanguage'
import Element from './elementClass'


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
    component: SelectField,
    choices: Element.createFieldListGenerator('directors'),
    multiple: true,
  },
  {
    name: 'year',
    hintText: 'Year',
    component: AutoComplete,
    dataSource: Array.from({
      length: (CURRENT_YEAR - START_YEAR) + 3,
    }, (_, i) => String((CURRENT_YEAR - i) + 2)),
    filter: AutoCompleteOptions.caseInsensitiveFilter,
    maxSearchResults: 5,
  },
  {
    name: 'language',
    hintText: 'Language',
    component: SelectLanguageField,
    type: 'movies',
  },
  {
    name: 'genre',
    hintText: 'Genre',
    component: SelectField,
    choices: Element.createFieldListGenerator('genres'),
    multiple: true,
  },
]
