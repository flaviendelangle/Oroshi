import { SelectField } from 'redux-form-material-ui'

import OptionalToggle from '../../components/form/OptionalToggle'
import { SelectLanguageField } from '../../components/form/SelectLanguage'
import Element from './elementClass'

export default [
  {
    name: 'seen',
    label: 'Seen',
    component: OptionalToggle,
  },
  {
    name: 'directors',
    hintText: 'Director',
    component: SelectField,
    choices: Element.createFieldListGenerator('directors'),
    multiple: true,
  },
  {
    name: 'years',
    hintText: 'Year',
    component: SelectField,
    choices: Element.createFieldListGenerator('release_year', 'desc'),
    multiple: true,
  },
  {
    name: 'language',
    hintText: 'Language',
    component: SelectLanguageField,
    type: 'movies',
    hasNullLine: true,
  },
  {
    name: 'genres',
    hintText: 'Genre',
    component: SelectField,
    choices: Element.createFieldListGenerator('genres'),
    multiple: true,
  },
]
