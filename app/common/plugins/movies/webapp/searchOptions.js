import { SelectField } from 'redux-form-material-ui'

import OptionalToggle from '../../../../webapp/src/components/form/OptionalToggle/index'
import { SelectLanguageField } from '../../../../webapp/src/components/form/SelectLanguage/index'
import Element from './elementClass'

export const search = [
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

export const sort = [
  {
    label: 'Random',
    arguments: [],
  },
  {
    label: 'Alphabetical order',
    arguments: ['title', 'asc'],
  },
  {
    label: 'Reversed alphabetical order',
    arguments: ['title', 'desc'],
  },
  {
    label: 'Highest not first',
    arguments: ['note', 'asc'],
  },
  {
    label: 'Lowest not first',
    arguments: ['note', 'desc'],
  },
  {
    label: 'Most recent first',
    arguments: ['release', 'desc'],
  },
  {
    label: 'Oldest first',
    arguments: ['release', 'asc'],
  },
]
